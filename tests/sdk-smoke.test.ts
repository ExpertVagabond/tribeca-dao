/**
 * Tribeca SDK Smoke Test (S08)
 *
 * Verifies that the TypeScript SDK compiles, imports correctly,
 * and that pure functions (PDA derivation, constants) work without
 * requiring a network connection.
 */
import { PublicKey } from "@solana/web3.js";
import { strict as assert } from "assert";
import { BN } from "bn.js";

import {
  DEFAULT_DECIMALS,
  DEFAULT_GOVERNANCE_PARAMETERS,
  DEFAULT_GOVERNOR_SMART_WALLET_PARAMS,
  DEFAULT_LOCKER_PARAMS,
  DEFAULT_PROPOSAL_THRESHOLD,
  DEFAULT_QUORUM_VOTES,
  DEFAULT_VOTE_DELAY,
  DEFAULT_VOTE_PERIOD,
  ONE_DAY,
  ONE_YEAR,
  TRIBECA_ADDRESSES,
  TRIBECA_IDLS,
} from "../src/constants";
// Re-export test: verify the barrel index re-exports everything
import * as TribecaSDK from "../src/index";
import {
  findGovernorAddress,
  findProposalAddress,
  findProposalMetaAddress,
  findVoteAddress,
} from "../src/wrappers/govern/pda";
import { getProposalState } from "../src/wrappers/govern/proposal";
import { ProposalState, VoteSide } from "../src/wrappers/govern/types";
import {
  findEscrowAddress,
  findLockerAddress,
  findWhitelistAddress,
} from "../src/wrappers/lockedVoter/pda";
import {
  findSimpleElectorateAddress,
  findTokenRecordAddress,
} from "../src/wrappers/simpleVoter/pda";

// ============================================================
// Test: Program IDs are well-known PublicKeys
// ============================================================

function testProgramAddresses(): void {
  console.log("  [1] Program addresses are valid PublicKeys");

  assert.ok(TRIBECA_ADDRESSES.Govern instanceof PublicKey);
  assert.ok(TRIBECA_ADDRESSES.LockedVoter instanceof PublicKey);
  assert.ok(TRIBECA_ADDRESSES.SimpleVoter instanceof PublicKey);

  assert.equal(
    TRIBECA_ADDRESSES.Govern.toBase58(),
    "Govz1VyoyLD5BL6CSCxUJLVLsQHRwjfFj1prNsdNg5Jw"
  );
  assert.equal(
    TRIBECA_ADDRESSES.LockedVoter.toBase58(),
    "LocktDzaV1W2Bm9DeZeiyz4J9zs4fRqNiYqQyracRXw"
  );
  assert.equal(
    TRIBECA_ADDRESSES.SimpleVoter.toBase58(),
    "Tok6iuA69RLN1QrpXgQKnDgE1YYbLzQsZGSoz75fQdz"
  );

  console.log("    PASS");
}

// ============================================================
// Test: IDLs are defined and have correct structure
// ============================================================

function testIDLs(): void {
  console.log("  [2] IDLs are defined with correct metadata");

  assert.ok(TRIBECA_IDLS.Govern);
  assert.ok(TRIBECA_IDLS.LockedVoter);
  assert.ok(TRIBECA_IDLS.SimpleVoter);

  assert.equal(TRIBECA_IDLS.Govern.metadata.name, "govern");
  assert.equal(TRIBECA_IDLS.LockedVoter.metadata.name, "locked_voter");
  assert.equal(TRIBECA_IDLS.SimpleVoter.metadata.name, "simple_voter");

  // Verify IDLs have instructions
  assert.ok(TRIBECA_IDLS.Govern.instructions.length > 0);
  assert.ok(TRIBECA_IDLS.LockedVoter.instructions.length > 0);
  assert.ok(TRIBECA_IDLS.SimpleVoter.instructions.length > 0);

  // Verify IDLs have accounts
  assert.ok(TRIBECA_IDLS.Govern.accounts.length > 0);
  assert.ok(TRIBECA_IDLS.LockedVoter.accounts.length > 0);
  assert.ok(TRIBECA_IDLS.SimpleVoter.accounts.length > 0);

  console.log("    PASS");
}

// ============================================================
// Test: Constants are properly defined
// ============================================================

function testConstants(): void {
  console.log("  [3] Constants are properly defined");

  assert.equal(DEFAULT_DECIMALS, 6);
  assert.ok(ONE_DAY instanceof BN);
  assert.equal(ONE_DAY.toNumber(), 86400);
  assert.ok(ONE_YEAR instanceof BN);
  assert.equal(ONE_YEAR.toNumber(), 365 * 86400);

  assert.ok(DEFAULT_VOTE_DELAY instanceof BN);
  assert.ok(DEFAULT_VOTE_PERIOD instanceof BN);
  assert.ok(DEFAULT_QUORUM_VOTES instanceof BN);
  assert.ok(DEFAULT_PROPOSAL_THRESHOLD instanceof BN);

  // Governance parameters use snake_case (Anchor 0.30+ IDL convention)
  assert.ok(DEFAULT_GOVERNANCE_PARAMETERS.voting_delay instanceof BN);
  assert.ok(DEFAULT_GOVERNANCE_PARAMETERS.voting_period instanceof BN);
  assert.ok(DEFAULT_GOVERNANCE_PARAMETERS.quorum_votes instanceof BN);
  assert.ok(DEFAULT_GOVERNANCE_PARAMETERS.timelock_delay_seconds instanceof BN);

  // Locker parameters use snake_case
  assert.ok(DEFAULT_LOCKER_PARAMS.proposal_activation_min_votes instanceof BN);
  assert.ok(DEFAULT_LOCKER_PARAMS.min_stake_duration instanceof BN);
  assert.ok(DEFAULT_LOCKER_PARAMS.max_stake_duration instanceof BN);
  assert.equal(DEFAULT_LOCKER_PARAMS.max_stake_vote_multiplier, 10);
  assert.equal(DEFAULT_LOCKER_PARAMS.whitelist_enabled, false);

  // Smart wallet parameters
  assert.equal(DEFAULT_GOVERNOR_SMART_WALLET_PARAMS.threshold, 2);
  assert.equal(DEFAULT_GOVERNOR_SMART_WALLET_PARAMS.maxOwners, 3);
  assert.equal(DEFAULT_GOVERNOR_SMART_WALLET_PARAMS.delay, 0);

  console.log("    PASS");
}

// ============================================================
// Test: PDA derivation (Governor)
// ============================================================

async function testGovernPDAs(): Promise<void> {
  console.log("  [4] Govern PDA derivation");

  const base = new PublicKey("11111111111111111111111111111112");

  // findGovernorAddress
  const [governor, govBump] = await findGovernorAddress(base);
  assert.ok(governor instanceof PublicKey);
  assert.ok(typeof govBump === "number");
  assert.ok(govBump >= 0 && govBump <= 255);

  // Deterministic: same input -> same output
  const [governor2, govBump2] = await findGovernorAddress(base);
  assert.ok(governor.equals(governor2));
  assert.equal(govBump, govBump2);

  // Different base -> different governor
  const otherBase = new PublicKey("11111111111111111111111111111113");
  const [otherGovernor] = await findGovernorAddress(otherBase);
  assert.ok(!governor.equals(otherGovernor));

  // findProposalAddress
  const [proposal, proposalBump] = await findProposalAddress(
    governor,
    new BN(0)
  );
  assert.ok(proposal instanceof PublicKey);
  assert.ok(typeof proposalBump === "number");

  // Different index -> different proposal
  const [proposal1] = await findProposalAddress(governor, new BN(1));
  assert.ok(!proposal.equals(proposal1));

  // findVoteAddress
  const voter = new PublicKey("11111111111111111111111111111114");
  const [vote, voteBump] = await findVoteAddress(proposal, voter);
  assert.ok(vote instanceof PublicKey);
  assert.ok(typeof voteBump === "number");

  // findProposalMetaAddress
  const [meta, metaBump] = await findProposalMetaAddress(proposal);
  assert.ok(meta instanceof PublicKey);
  assert.ok(typeof metaBump === "number");

  console.log("    PASS");
}

// ============================================================
// Test: PDA derivation (LockedVoter)
// ============================================================

async function testLockedVoterPDAs(): Promise<void> {
  console.log("  [5] LockedVoter PDA derivation");

  const base = new PublicKey("11111111111111111111111111111112");
  const authority = new PublicKey("11111111111111111111111111111114");

  // findLockerAddress
  const [locker, lockerBump] = await findLockerAddress(base);
  assert.ok(locker instanceof PublicKey);
  assert.ok(typeof lockerBump === "number");

  // findEscrowAddress
  const [escrow, escrowBump] = await findEscrowAddress(locker, authority);
  assert.ok(escrow instanceof PublicKey);
  assert.ok(typeof escrowBump === "number");

  // findWhitelistAddress (with owner)
  const programId = new PublicKey("11111111111111111111111111111115");
  const [wl1, wlBump1] = await findWhitelistAddress(
    locker,
    programId,
    authority
  );
  assert.ok(wl1 instanceof PublicKey);
  assert.ok(typeof wlBump1 === "number");

  // findWhitelistAddress (without owner)
  const [wl2] = await findWhitelistAddress(locker, programId, null);
  assert.ok(wl2 instanceof PublicKey);
  assert.ok(!wl1.equals(wl2)); // Different because owner vs SystemProgram

  console.log("    PASS");
}

// ============================================================
// Test: PDA derivation (SimpleVoter)
// ============================================================

async function testSimpleVoterPDAs(): Promise<void> {
  console.log("  [6] SimpleVoter PDA derivation");

  const base = new PublicKey("11111111111111111111111111111112");
  const authority = new PublicKey("11111111111111111111111111111114");

  // findSimpleElectorateAddress
  const [electorate, electBump] = await findSimpleElectorateAddress(base);
  assert.ok(electorate instanceof PublicKey);
  assert.ok(typeof electBump === "number");

  // findTokenRecordAddress
  const [tokenRecord, trBump] = await findTokenRecordAddress(
    authority,
    electorate
  );
  assert.ok(tokenRecord instanceof PublicKey);
  assert.ok(typeof trBump === "number");

  console.log("    PASS");
}

// ============================================================
// Test: Proposal state machine
// ============================================================

function testProposalState(): void {
  console.log("  [7] Proposal state machine logic");

  const baseData = {
    governor: PublicKey.default,
    index: new BN(0),
    bump: 255,
    proposer: PublicKey.default,
    quorum_votes: new BN(100),
    for_votes: new BN(0),
    against_votes: new BN(0),
    abstain_votes: new BN(0),
    canceled_at: new BN(0),
    created_at: new BN(1000),
    activated_at: new BN(0),
    voting_ends_at: new BN(0),
    queued_at: new BN(0),
    queued_transaction: PublicKey.default,
    instructions: [],
  };

  // Draft state (not activated)
  assert.equal(
    getProposalState({ proposalData: baseData }),
    ProposalState.Draft
  );

  // Canceled state
  assert.equal(
    getProposalState({
      proposalData: { ...baseData, canceled_at: new BN(2000) },
    }),
    ProposalState.Canceled
  );

  // Active state (activated, voting not ended)
  assert.equal(
    getProposalState({
      proposalData: {
        ...baseData,
        activated_at: new BN(1000),
        voting_ends_at: new BN(999999999999),
      },
    }),
    ProposalState.Active
  );

  // Defeated state (voting ended, against >= for)
  assert.equal(
    getProposalState({
      proposalData: {
        ...baseData,
        activated_at: new BN(1000),
        voting_ends_at: new BN(1),
        for_votes: new BN(50),
        against_votes: new BN(60),
      },
      currentTimeSeconds: 2000,
    }),
    ProposalState.Defeated
  );

  // Succeeded state
  assert.equal(
    getProposalState({
      proposalData: {
        ...baseData,
        activated_at: new BN(1000),
        voting_ends_at: new BN(1),
        for_votes: new BN(200),
        against_votes: new BN(50),
      },
      currentTimeSeconds: 2000,
    }),
    ProposalState.Succeeded
  );

  // Queued state
  assert.equal(
    getProposalState({
      proposalData: {
        ...baseData,
        activated_at: new BN(1000),
        voting_ends_at: new BN(1),
        for_votes: new BN(200),
        against_votes: new BN(50),
        queued_at: new BN(3000),
      },
      currentTimeSeconds: 4000,
    }),
    ProposalState.Queued
  );

  console.log("    PASS");
}

// ============================================================
// Test: Enums
// ============================================================

function testEnums(): void {
  console.log("  [8] Enum values");

  assert.equal(ProposalState.Draft, 0);
  assert.equal(ProposalState.Active, 1);
  assert.equal(ProposalState.Canceled, 2);
  assert.equal(ProposalState.Defeated, 3);
  assert.equal(ProposalState.Succeeded, 4);
  assert.equal(ProposalState.Queued, 5);

  assert.equal(VoteSide.Pending, 0);
  assert.equal(VoteSide.Against, 1);
  assert.equal(VoteSide.For, 2);
  assert.equal(VoteSide.Abstain, 3);

  console.log("    PASS");
}

// ============================================================
// Test: Barrel exports
// ============================================================

function testBarrelExports(): void {
  console.log("  [9] Barrel index re-exports");

  // Verify key items are re-exported from the barrel index
  assert.ok(TribecaSDK.TRIBECA_ADDRESSES);
  assert.ok(TribecaSDK.TRIBECA_IDLS);
  assert.ok(TribecaSDK.DEFAULT_GOVERNANCE_PARAMETERS);
  assert.ok(TribecaSDK.DEFAULT_LOCKER_PARAMS);
  assert.ok(TribecaSDK.TribecaSDK);
  assert.ok(TribecaSDK.GovernWrapper);
  assert.ok(TribecaSDK.GovernorWrapper);
  assert.ok(TribecaSDK.LockerWrapper);
  assert.ok(TribecaSDK.SimpleVoterWrapper);
  assert.ok(TribecaSDK.VoteEscrow);
  assert.ok(TribecaSDK.findGovernorAddress);
  assert.ok(TribecaSDK.findLockerAddress);
  assert.ok(TribecaSDK.findSimpleElectorateAddress);

  console.log("    PASS");
}

// ============================================================
// Runner
// ============================================================

async function main(): Promise<void> {
  console.log("\nTribeca SDK Smoke Tests (S08)\n");
  console.log("=".repeat(50));

  testProgramAddresses();
  testIDLs();
  testConstants();
  await testGovernPDAs();
  await testLockedVoterPDAs();
  await testSimpleVoterPDAs();
  testProposalState();
  testEnums();
  testBarrelExports();

  console.log("=".repeat(50));
  console.log("\nAll 9 smoke tests PASSED.\n");
}

main().catch((err) => {
  console.error("SMOKE TEST FAILED:", err);
  process.exit(1);
});
