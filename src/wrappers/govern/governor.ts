import {
  findTransactionAddress,
  GOKI_ADDRESSES,
  GOKI_CODERS,
} from "@gokiprotocol/client";
import { TransactionEnvelope } from "@saberhq/solana-contrib";
import { u64 } from "@saberhq/token-utils";
import type { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { SystemProgram } from "@solana/web3.js";
import type BN from "bn.js";

import type {
  GovernanceParameters,
  GovernorData,
  ProposalData,
  ProposalInstruction,
  ProposalMetaData,
} from "../../programs/govern";
import type { TribecaSDK } from "../../sdk";
import type { PendingProposal } from "../simpleVoter/types";
import {
  findProposalAddress,
  findProposalMetaAddress,
  findVoteAddress,
} from "./pda";

/**
 * Wrapper around a Governor.
 */
export class GovernorWrapper {
  private _governor: GovernorData | null = null;

  constructor(readonly sdk: TribecaSDK, readonly governorKey: PublicKey) {}

  get provider() {
    return this.sdk.provider;
  }

  get program() {
    return this.sdk.programs.Govern;
  }

  async reload(): Promise<GovernorData> {
    return await this.program.account.Governor.fetch(this.governorKey);
  }

  async data(): Promise<GovernorData> {
    if (!this._governor) {
      this._governor = await this.reload();
    }
    return this._governor;
  }

  async findProposalAddress(index: BN): Promise<PublicKey> {
    const [key] = await findProposalAddress(this.governorKey, index);
    return key;
  }

  async fetchProposalByKey(key: PublicKey): Promise<ProposalData> {
    return await this.program.account.Proposal.fetch(key);
  }

  async fetchProposal(index: BN): Promise<ProposalData> {
    const key = await this.findProposalAddress(index);
    return await this.fetchProposalByKey(key);
  }

  async fetchProposalMeta(proposalKey: PublicKey): Promise<ProposalMetaData> {
    const [key] = await findProposalMetaAddress(proposalKey);
    return await this.program.account.ProposalMeta.fetch(key);
  }

  /**
   * Creates a ProposalMeta for a proposal.
   * Only the Proposer may call this.
   *
   * @returns
   */
  async createProposalMeta({
    proposal,
    proposer = this.sdk.provider.wallet.publicKey,
    title,
    descriptionLink,
  }: {
    proposal: PublicKey;
    proposer?: PublicKey;
    title: string;
    descriptionLink: string;
  }): Promise<TransactionEnvelope> {
    const [proposalMetaKey, bump] = await findProposalMetaAddress(proposal);
    const ix = this.sdk.programs.Govern.instruction.create_proposal_meta(
      bump,
      title,
      descriptionLink,
      {
        accounts: {
          proposal,
          proposer,
          proposal_meta: proposalMetaKey,
          payer: this.provider.wallet.publicKey,
          system_program: SystemProgram.programId,
        },
      }
    );
    return this.provider.newTX([ix]);
  }

  /**
   * Creates a new Proposal.
   * @returns
   */
  async createProposal({
    proposer = this.sdk.provider.wallet.publicKey,
    instructions,
  }: {
    proposer?: PublicKey;
    instructions: ProposalInstruction[];
  }): Promise<PendingProposal> {
    const { provider } = this.sdk;

    const governorData = await this.reload();
    const index = new u64(governorData.proposal_count);
    const [proposal, bump] = await findProposalAddress(this.governorKey, index);

    const ixs: TransactionInstruction[] = [];

    ixs.push(
      this.sdk.programs.Govern.instruction.create_proposal(bump, instructions, {
        accounts: {
          governor: this.governorKey,
          proposal,
          proposer,
          payer: provider.wallet.publicKey,
          system_program: SystemProgram.programId,
        },
      })
    );

    return {
      proposal,
      index,
      tx: this.provider.newTX(ixs),
    };
  }

  /**
   * Queues a Proposal for execution by the Smart Wallet.
   * @returns
   */
  async queueProposal({
    index,
    smartWalletProgram = GOKI_ADDRESSES.SmartWallet,
    payer = this.provider.wallet.publicKey,
  }: {
    index: BN;
    smartWalletProgram?: PublicKey;
    payer?: PublicKey;
  }): Promise<TransactionEnvelope> {
    const governorData = await this.data();

    const [proposal] = await findProposalAddress(this.governorKey, index);
    const smartWalletDataRaw =
      await this.program.provider.connection.getAccountInfo(
        governorData.smart_wallet
      );
    if (!smartWalletDataRaw) {
      throw new Error("smart wallet not found");
    }
    const smartWalletData = GOKI_CODERS.SmartWallet.accountParsers.smartWallet(
      smartWalletDataRaw.data
    );
    const [txKey, txBump] = await findTransactionAddress(
      governorData.smart_wallet,
      smartWalletData.numTransactions.toNumber()
    );
    return new TransactionEnvelope(this.sdk.provider, [
      this.program.instruction.queue_proposal(txBump, {
        accounts: {
          governor: this.governorKey,
          proposal,
          smart_wallet: governorData.smart_wallet,
          smart_wallet_program: smartWalletProgram,
          transaction: txKey,
          payer,
          system_program: SystemProgram.programId,
        },
      }),
    ]);
  }

  /**
   * Cancel a new Proposal.
   * @returns
   */
  cancelProposal({
    proposal,
    proposer = this.sdk.provider.wallet.publicKey,
  }: {
    proposal: PublicKey;
    proposer?: PublicKey;
  }): TransactionEnvelope {
    return new TransactionEnvelope(this.sdk.provider, [
      this.sdk.programs.Govern.instruction.cancel_proposal({
        accounts: {
          governor: this.governorKey,
          proposal,
          proposer,
        },
      }),
    ]);
  }

  async getOrCreateVote({
    proposal,
    voter = this.sdk.provider.wallet.publicKey,
    payer = this.sdk.provider.wallet.publicKey,
  }: {
    proposal: PublicKey;
    voter?: PublicKey;
    payer?: PublicKey;
  }): Promise<{
    voteKey: PublicKey;
    instruction: TransactionInstruction | null;
  }> {
    const [voteKey, bump] = await findVoteAddress(proposal, voter);

    try {
      await this.program.account.Vote.fetch(voteKey);
      return { voteKey, instruction: null };
    } catch {
      return {
        voteKey,
        instruction: await this.createVoteIx({
          proposal,
          voteKeyAndBump: [voteKey, bump],
          voter,
          payer,
        }),
      };
    }
  }

  async createVoteIx({
    proposal,
    voteKeyAndBump,
    voter = this.sdk.provider.wallet.publicKey,
    payer = this.sdk.provider.wallet.publicKey,
  }: {
    proposal: PublicKey;
    voteKeyAndBump?: [PublicKey, number];
    voter?: PublicKey;
    payer?: PublicKey;
  }): Promise<TransactionInstruction> {
    if (!voteKeyAndBump) {
      voteKeyAndBump = await findVoteAddress(proposal, voter);
    }

    const [voteKey, bump] = voteKeyAndBump;
    return this.program.instruction.new_vote(bump, voter, {
      accounts: {
        vote: voteKey,
        proposal,
        payer,
        system_program: SystemProgram.programId,
      },
    });
  }

  async setGovernanceParamsIx(
    newParams: GovernanceParameters
  ): Promise<TransactionInstruction> {
    const data = await this.data();
    return this.program.instruction.set_governance_params(newParams, {
      accounts: {
        governor: this.governorKey,
        smart_wallet: data.smart_wallet,
      },
    });
  }
}
