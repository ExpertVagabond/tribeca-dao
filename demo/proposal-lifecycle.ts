/**
 * Tribeca DAO — Full Governor & Proposal Lifecycle Demo (S09)
 *
 * This script demonstrates the complete governance flow using the
 * revived Tribeca SDK (Anchor 0.30.1 / @coral-xyz/anchor):
 *
 *   1. Create a Governor (with a SimpleVoter electorate + Goki Smart Wallet)
 *   2. Create a Proposal with dummy instructions
 *   3. Activate the Proposal (so voting can begin)
 *   4. Deposit governance tokens & Cast votes (For/Against)
 *   5. Evaluate the proposal outcome (Succeeded / Defeated)
 *   6. Queue the Proposal (into the Smart Wallet for execution)
 *   7. Execute the queued transaction via the Smart Wallet
 *
 * Prerequisites
 * -------------
 * 1. A running `solana-test-validator` with the Tribeca programs deployed:
 *
 *      solana-test-validator \
 *        --bpf-program Govz1VyoyLD5BL6CSCxUJLVLsQHRwjfFj1prNsdNg5Jw  artifacts/deploy/govern.so \
 *        --bpf-program LocktDzaV1W2Bm9DeZeiyz4J9zs4fRqNiYqQyracRXw  artifacts/deploy/locked_voter.so \
 *        --bpf-program Tok6iuA69RLN1QrpXgQKnDgE1YYbLzQsZGSoz75fQdz  artifacts/deploy/simple_voter.so \
 *        --bpf-program GokivDYuQXPZCWRkwMhdH2h91KpDQXBEmpgBgs55bnpH  artifacts/deploy/smart_wallet.so \
 *        --reset
 *
 * 2. A funded wallet keypair at `./tests/test-key.json` (used by Anchor).
 *    If you start the validator with `--reset`, airdrop SOL first:
 *
 *      solana airdrop 100 <wallet-pubkey> --url localhost
 *
 * 3. Dependencies installed:
 *
 *      yarn install   # or npm install
 *
 * Running
 * -------
 *      npx ts-node demo/proposal-lifecycle.ts
 *
 *    or, to just type-check without executing:
 *
 *      npx tsc --noEmit
 */

import type { Provider } from "@saberhq/solana-contrib";
import {
  SignerWallet,
  SolanaAugmentedProvider,
  SolanaProvider,
  TransactionEnvelope,
} from "@saberhq/solana-contrib";
import {
  createMint,
  getOrCreateATA,
  SPLToken,
  TOKEN_PROGRAM_ID,
  u64,
} from "@saberhq/token-utils";
import type { TransactionInstruction } from "@solana/web3.js";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  SystemProgram,
} from "@solana/web3.js";
import { BN } from "bn.js";
import * as fs from "fs";
import * as path from "path";

import {
  DEFAULT_GOVERNANCE_PARAMETERS,
  TRIBECA_ADDRESSES,
  TribecaSDK,
} from "../src";
import type { ProposalInstruction } from "../src/programs/govern";
import type { GovernorWrapper } from "../src/wrappers/govern/governor";
import { getProposalState } from "../src/wrappers/govern/proposal";
import {
  PROPOSAL_STATE_LABELS,
  ProposalState,
  VOTE_SIDE_LABELS,
  VoteSide,
} from "../src/wrappers/govern/types";
import { SimpleVoterWrapper } from "../src/wrappers/simpleVoter/electorate";
import { createSimpleElectorate } from "../src/wrappers/simpleVoter/setup";

// ---------------------------------------------------------------------------
// Configuration — tune these for the demo
// ---------------------------------------------------------------------------

/** Localhost RPC endpoint (solana-test-validator default). */
const RPC_URL = "http://127.0.0.1:8899";

/** Voting delay in seconds (time before voting begins after activation). */
const VOTING_DELAY = new BN(1);

/** Voting period in seconds (how long voting lasts). */
const VOTING_PERIOD = new BN(10);

/** Minimum quorum: total votes required for a valid outcome. */
const QUORUM_VOTES = new BN(100);

/** Timelock delay: seconds to wait after queueing before execution. */
const TIMELOCK_DELAY = new BN(0);

/** Minimum tokens to hold in order to create a proposal. */
const PROPOSAL_THRESHOLD = new BN(50);

/** Amount of governance tokens minted to each voter. */
const VOTER_TOKEN_AMOUNT = new u64(1_000);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const SEPARATOR = "=".repeat(60);

function header(step: number, title: string): void {
  console.log(`\n${SEPARATOR}`);
  console.log(`  Step ${step}: ${title}`);
  console.log(SEPARATOR);
}

function info(msg: string): void {
  console.log(`  -> ${msg}`);
}

/**
 * Sleep for the given number of seconds.
 */
function sleep(seconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1_000);
  });
}

/**
 * Create and fund a new user keypair with SOL and governance tokens.
 */
async function createFundedUser(
  provider: Provider,
  govTokenMint: Keypair["publicKey"],
  mintAuthority: Keypair["publicKey"],
  amount: u64
): Promise<Keypair> {
  const user = Keypair.generate();

  // Airdrop SOL
  const augmented = new SolanaAugmentedProvider(provider);
  const airdropReceipt = await augmented.requestAirdrop(
    LAMPORTS_PER_SOL,
    user.publicKey
  );
  await airdropReceipt.wait();

  // Create ATA and mint governance tokens
  const { address: ata, instruction: createAtaIx } = await getOrCreateATA({
    provider,
    mint: govTokenMint,
    owner: user.publicKey,
    payer: provider.wallet.publicKey,
  });

  const mintIx = SPLToken.createMintToInstruction(
    TOKEN_PROGRAM_ID,
    govTokenMint,
    ata,
    mintAuthority,
    [],
    amount
  );

  const ixs: TransactionInstruction[] = [];
  if (createAtaIx) {
    ixs.push(createAtaIx);
  }
  ixs.push(mintIx);

  const tx = new TransactionEnvelope(provider, ixs);
  await tx.confirm();

  return user;
}

/**
 * Build a set of dummy ProposalInstructions.
 *
 * In a real governance scenario these would be the on-chain instructions
 * that the Smart Wallet executes when the proposal passes (e.g. parameter
 * changes, treasury transfers, program upgrades).
 *
 * For this demo we use simple no-op instructions.
 *
 * Note: ProposalInstruction is an intersection of the IDL type (snake_case
 * fields: program_id, is_signer, is_writable) and AccountMeta (camelCase
 * fields: pubkey, isSigner, isWritable). Both must be satisfied.
 */
function buildDummyProposalInstructions(): ProposalInstruction[] {
  const memoProgram = Keypair.generate().publicKey; // stand-in

  const ix1: ProposalInstruction = {
    program_id: memoProgram,
    keys: [],
    data: Buffer.from("Hello from Tribeca governance!"),
  };

  const ix2: ProposalInstruction = {
    program_id: SystemProgram.programId,
    keys: [
      {
        pubkey: SystemProgram.programId,
        isSigner: false,
        isWritable: false,
        // IDL (snake_case) fields required by the intersection type
        is_signer: false,
        is_writable: false,
      },
    ],
    data: Buffer.alloc(0),
  };

  return [ix1, ix2];
}

// ---------------------------------------------------------------------------
// Main lifecycle
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  console.log("\n");
  console.log(SEPARATOR);
  console.log("  Tribeca DAO  —  Proposal Lifecycle Demo  (S09)");
  console.log(SEPARATOR);
  console.log(`  RPC:             ${RPC_URL}`);
  console.log(`  Voting delay:    ${VOTING_DELAY.toString()}s`);
  console.log(`  Voting period:   ${VOTING_PERIOD.toString()}s`);
  console.log(`  Quorum:          ${QUORUM_VOTES.toString()} votes`);
  console.log(`  Timelock delay:  ${TIMELOCK_DELAY.toString()}s`);

  // -----------------------------------------------------------------------
  // 0. Bootstrap: provider, SDK, governance token
  // -----------------------------------------------------------------------
  header(0, "Bootstrap — Provider, SDK & Governance Token");

  const connection = new Connection(RPC_URL, "confirmed");
  const keyPath = path.resolve(__dirname, "..", "tests", "test-key.json");
  const keyData = JSON.parse(fs.readFileSync(keyPath, "utf-8")) as number[];
  const walletKP = Keypair.fromSecretKey(Uint8Array.from(keyData));
  const wallet = new SignerWallet(walletKP);
  const provider = SolanaProvider.load({
    connection,
    sendConnection: connection,
    wallet,
    opts: { commitment: "confirmed" },
  });
  const sdk = TribecaSDK.load({ provider });

  info(`Wallet: ${wallet.publicKey.toBase58()}`);
  info("SDK loaded successfully.");

  // Create governance token mint
  const govTokenMint = await createMint(provider, wallet.publicKey, 6);
  info(`Gov token mint: ${govTokenMint.toBase58()}`);

  // -----------------------------------------------------------------------
  // 1. Create a Governor with a Simple Electorate
  // -----------------------------------------------------------------------
  header(1, "Create Governor + Simple Electorate + Smart Wallet");

  const governanceParameters = {
    ...DEFAULT_GOVERNANCE_PARAMETERS,
    voting_delay: VOTING_DELAY,
    voting_period: VOTING_PERIOD,
    quorum_votes: QUORUM_VOTES,
    timelock_delay_seconds: TIMELOCK_DELAY,
  };

  const { governorWrapper, smartWalletWrapper, simpleVoterWrapper, createTXs } =
    await createSimpleElectorate({
      sdk,
      govTokenMint,
      proposalThreshold: PROPOSAL_THRESHOLD,
      governanceParameters,
      smartWalletParameters: {
        threshold: 1, // single-signer for demo simplicity
        maxOwners: 3,
        delay: 0,
      },
    });

  for (const { title, tx } of createTXs) {
    info(`Sending: ${title} ...`);
    await tx.confirm();
    info(`  Done.`);
  }

  const governorKey = governorWrapper.governorKey;
  info(`Governor:      ${governorKey.toBase58()}`);
  info(`Smart Wallet:  ${smartWalletWrapper.key.toBase58()}`);
  info(`Electorate:    ${simpleVoterWrapper.electorate.toBase58()}`);

  // Verify governor on-chain
  const govData = await governorWrapper.reload();
  info(`Proposal count: ${govData.proposal_count.toString()}`);
  info(
    `Voting period:  ${govData.params.voting_period.toString()}s (expected ${VOTING_PERIOD.toString()}s)`
  );

  // -----------------------------------------------------------------------
  // 2. Fund voters with governance tokens
  // -----------------------------------------------------------------------
  header(2, "Fund Voters with Governance Tokens");

  const voterA = await createFundedUser(
    provider,
    govTokenMint,
    wallet.publicKey,
    VOTER_TOKEN_AMOUNT
  );
  info(
    `Voter A: ${voterA.publicKey.toBase58()} (${VOTER_TOKEN_AMOUNT.toString()} tokens)`
  );

  const voterB = await createFundedUser(
    provider,
    govTokenMint,
    wallet.publicKey,
    VOTER_TOKEN_AMOUNT
  );
  info(
    `Voter B: ${voterB.publicKey.toBase58()} (${VOTER_TOKEN_AMOUNT.toString()} tokens)`
  );

  // -----------------------------------------------------------------------
  // 3. Create a Proposal
  // -----------------------------------------------------------------------
  header(3, "Create a Proposal");

  const proposalInstructions = buildDummyProposalInstructions();
  info(`Proposal contains ${proposalInstructions.length} instruction(s).`);

  const {
    proposal,
    index,
    tx: createProposalTx,
  } = await governorWrapper.createProposal({
    instructions: proposalInstructions,
  });
  await createProposalTx.confirm();

  info(`Proposal key:   ${proposal.toBase58()}`);
  info(`Proposal index:  ${index.toString()}`);

  // Add metadata
  const metaTx = await governorWrapper.createProposalMeta({
    proposal,
    title: "Demo Proposal: Update treasury parameters",
    descriptionLink: "https://tribeca.so/proposals/demo",
  });
  await metaTx.confirm();
  info("Proposal metadata attached.");

  // Check initial state
  const proposalData0 = await governorWrapper.fetchProposalByKey(proposal);
  const state0 = getProposalState({ proposalData: proposalData0 });
  info(`Initial state:   ${PROPOSAL_STATE_LABELS[state0]} (expected: Draft)`);

  // -----------------------------------------------------------------------
  // 4. Activate the Proposal (begins voting period)
  // -----------------------------------------------------------------------
  header(4, "Activate the Proposal");

  // Load electorate data so the wrapper can construct CPI
  await simpleVoterWrapper.fetchVoterMetadata();

  const activateTx = simpleVoterWrapper.activateProposal(proposal);
  await activateTx.confirm();
  info("Proposal activated. Voting is now open.");

  const proposalData1 = await governorWrapper.fetchProposalByKey(proposal);
  const state1 = getProposalState({ proposalData: proposalData1 });
  info(
    `State after activation: ${PROPOSAL_STATE_LABELS[state1]} (expected: Active)`
  );
  info(`Voting ends at: slot-time ${proposalData1.voting_ends_at.toString()}`);

  // Wait for voting delay
  const votingDelaySeconds = VOTING_DELAY.toNumber();
  if (votingDelaySeconds > 0) {
    info(`Waiting ${votingDelaySeconds}s for voting delay...`);
    await sleep(votingDelaySeconds + 1);
  }

  // -----------------------------------------------------------------------
  // 5. Cast Votes
  // -----------------------------------------------------------------------
  header(5, "Cast Votes (For & Against)");

  // Voter A: deposit tokens and vote FOR
  const sdkVoterA = sdk.withSigner(voterA);
  const wrapperA = new SimpleVoterWrapper(
    sdkVoterA,
    simpleVoterWrapper.electorate,
    governorKey
  );
  wrapperA.electorateData = await wrapperA.fetchVoterMetadata();

  const depositA = await wrapperA.depositTokens(new u64(200), voterA.publicKey);
  depositA.addSigners(voterA);
  await depositA.confirm();
  info(`Voter A deposited 200 tokens.`);

  const voteATx = await wrapperA.castVotes({
    proposal,
    voteSide: VoteSide.For,
    authority: voterA.publicKey,
  });
  voteATx.addSigners(voterA);
  await voteATx.confirm();
  info(`Voter A cast vote: ${VOTE_SIDE_LABELS[VoteSide.For]}`);

  // Voter B: deposit tokens and vote AGAINST
  const sdkVoterB = sdk.withSigner(voterB);
  const wrapperB = new SimpleVoterWrapper(
    sdkVoterB,
    simpleVoterWrapper.electorate,
    governorKey
  );
  wrapperB.electorateData = await wrapperB.fetchVoterMetadata();

  const depositB = await wrapperB.depositTokens(new u64(50), voterB.publicKey);
  depositB.addSigners(voterB);
  await depositB.confirm();
  info(`Voter B deposited 50 tokens.`);

  const voteBTx = await wrapperB.castVotes({
    proposal,
    voteSide: VoteSide.Against,
    authority: voterB.publicKey,
  });
  voteBTx.addSigners(voterB);
  await voteBTx.confirm();
  info(`Voter B cast vote: ${VOTE_SIDE_LABELS[VoteSide.Against]}`);

  // Show tally
  const proposalData2 = await governorWrapper.fetchProposalByKey(proposal);
  info(`\n  Vote tally:`);
  info(`    For:     ${proposalData2.for_votes.toString()}`);
  info(`    Against: ${proposalData2.against_votes.toString()}`);
  info(`    Abstain: ${proposalData2.abstain_votes.toString()}`);
  info(`    Quorum:  ${proposalData2.quorum_votes.toString()} required`);

  // -----------------------------------------------------------------------
  // 6. Wait for voting period to end, evaluate outcome
  // -----------------------------------------------------------------------
  header(6, "Wait for Voting Period & Evaluate Outcome");

  const votingPeriodSeconds = VOTING_PERIOD.toNumber();
  info(`Waiting ${votingPeriodSeconds}s for voting period to end...`);
  await sleep(votingPeriodSeconds + 2);

  const proposalData3 = await governorWrapper.fetchProposalByKey(proposal);
  const currentTime = Math.floor(Date.now() / 1_000);
  const state3 = getProposalState({
    proposalData: proposalData3,
    currentTimeSeconds: currentTime,
  });
  info(`Final state: ${PROPOSAL_STATE_LABELS[state3]}`);

  if (state3 === ProposalState.Succeeded) {
    info("The proposal PASSED. Proceeding to queue...");
  } else if (state3 === ProposalState.Defeated) {
    info(
      "The proposal was DEFEATED (insufficient quorum or more against votes)."
    );
    info("Skipping queue/execute steps. Demo complete.");
    printSummary(governorWrapper, simpleVoterWrapper, smartWalletWrapper.key);
    return;
  } else {
    info(`Unexpected state: ${PROPOSAL_STATE_LABELS[state3]}. Stopping.`);
    return;
  }

  // -----------------------------------------------------------------------
  // 7. Queue the Proposal (into Smart Wallet)
  // -----------------------------------------------------------------------
  header(7, "Queue Proposal into Smart Wallet");

  const queueTx = await governorWrapper.queueProposal({ index });
  await queueTx.confirm();
  info("Proposal queued successfully.");

  const proposalData4 = await governorWrapper.fetchProposalByKey(proposal);
  const state4 = getProposalState({ proposalData: proposalData4 });
  info(
    `State after queue: ${PROPOSAL_STATE_LABELS[state4]} (expected: Queued)`
  );
  info(`Queued transaction: ${proposalData4.queued_transaction.toBase58()}`);

  // -----------------------------------------------------------------------
  // 8. Execute the queued transaction
  // -----------------------------------------------------------------------
  header(8, "Execute Queued Transaction via Smart Wallet");

  const timelockSeconds = TIMELOCK_DELAY.toNumber();
  if (timelockSeconds > 0) {
    info(`Waiting ${timelockSeconds}s for timelock delay...`);
    await sleep(timelockSeconds + 1);
  }

  // Execute via Smart Wallet
  const executeTx = await smartWalletWrapper.executeTransaction({
    transactionKey: proposalData4.queued_transaction,
  });
  await executeTx.confirm();
  info("Transaction executed via Smart Wallet!");

  // -----------------------------------------------------------------------
  // Summary
  // -----------------------------------------------------------------------
  printSummary(governorWrapper, simpleVoterWrapper, smartWalletWrapper.key);
}

function printSummary(
  govWrapper: GovernorWrapper,
  voterWrapper: SimpleVoterWrapper,
  smartWallet: Keypair["publicKey"]
): void {
  console.log(`\n${SEPARATOR}`);
  console.log("  DEMO COMPLETE");
  console.log(SEPARATOR);
  console.log(`\n  Accounts created during this demo:`);
  console.log(`    Governor:      ${govWrapper.governorKey.toBase58()}`);
  console.log(`    Electorate:    ${voterWrapper.electorate.toBase58()}`);
  console.log(`    Smart Wallet:  ${smartWallet.toBase58()}`);
  console.log(`    Govern prog:   ${TRIBECA_ADDRESSES.Govern.toBase58()}`);
  console.log(`    Voter prog:    ${TRIBECA_ADDRESSES.SimpleVoter.toBase58()}`);
  console.log(`\n  Governance flow demonstrated:`);
  console.log(`    1. Created Governor with configurable parameters`);
  console.log(`    2. Created a Proposal with dummy instructions`);
  console.log(`    3. Activated the Proposal (Draft -> Active)`);
  console.log(`    4. Cast votes (For and Against)`);
  console.log(`    5. Evaluated outcome after voting period`);
  console.log(`    6. Queued into Smart Wallet (if passed)`);
  console.log(`    7. Executed via Smart Wallet (if passed)`);
  console.log("");
}

// ---------------------------------------------------------------------------
// Entrypoint
// ---------------------------------------------------------------------------

main().catch((err: unknown) => {
  console.error("\nDemo failed with error:");
  console.error(err);
  process.exit(1);
});
