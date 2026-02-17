import type { BN } from "@coral-xyz/anchor";
import {
  createMemoInstruction,
  TransactionEnvelope,
} from "@saberhq/solana-contrib";
import { getOrCreateATA, TOKEN_PROGRAM_ID } from "@saberhq/token-utils";
import type { TransactionInstruction } from "@solana/web3.js";
import {
  PublicKey,
  SystemProgram,
  SYSVAR_INSTRUCTIONS_PUBKEY,
} from "@solana/web3.js";
import invariant from "tiny-invariant";

import { TRIBECA_ADDRESSES } from "../../constants";
import type {
  EscrowData,
  LockedVoterProgram,
  LockerData,
  LockerParams,
  ProposalData,
} from "../../programs";
import type { TribecaSDK } from "../../sdk";
import type { VoteSide } from "../../wrappers/govern/types";
import { GovernorWrapper } from "../govern/governor";
import { findWhitelistAddress } from ".";
import { findEscrowAddress } from "./pda";

/**
 * Helper methods around a Locked Voter electorate.
 */
export class LockerWrapper {
  readonly program: LockedVoterProgram;
  readonly governor: GovernorWrapper;

  private _lockerData: LockerData | null = null;

  constructor(
    readonly sdk: TribecaSDK,
    readonly locker: PublicKey,
    readonly governorKey: PublicKey
  ) {
    this.program = sdk.programs.LockedVoter;
    this.governor = new GovernorWrapper(sdk, governorKey);
  }

  static async load(
    sdk: TribecaSDK,
    lockerKey: PublicKey,
    governorKey: PublicKey
  ): Promise<LockerWrapper> {
    const wrapper = new LockerWrapper(sdk, lockerKey, governorKey);
    await wrapper.data();
    return wrapper;
  }

  /**
   * Fetches the data of the locker.
   * @returns
   */
  async reload(): Promise<LockerData> {
    return this.program.account.Locker.fetch(this.locker);
  }

  async fetchProposalData(proposalKey: PublicKey): Promise<ProposalData> {
    return await this.sdk.govern.program.account.Proposal.fetch(proposalKey);
  }

  async fetchEscrow(escrowKey: PublicKey): Promise<EscrowData> {
    return await this.program.account.Escrow.fetch(escrowKey);
  }

  async fetchEscrowByAuthority(
    authority: PublicKey = this.sdk.provider.wallet.publicKey
  ): Promise<EscrowData> {
    const [escrowKey] = await findEscrowAddress(this.locker, authority);
    return this.fetchEscrow(escrowKey);
  }

  /**
   * Fetches the data of the locker.
   * @returns
   */
  async data(): Promise<LockerData> {
    if (!this._lockerData) {
      this._lockerData = await this.reload();
    }
    return this._lockerData;
  }

  async getOrCreateEscrow(
    authority: PublicKey = this.sdk.provider.wallet.publicKey
  ): Promise<{
    escrow: PublicKey;
    instruction: TransactionInstruction | null;
  }> {
    const [escrow] = await findEscrowAddress(this.locker, authority);
    const escrowData = await this.program.account.Escrow.fetchNullable(escrow);
    if (escrowData) {
      return { escrow: escrow, instruction: null };
    } else {
      return {
        escrow: escrow,
        instruction: await this.newEscrowIX(authority),
      };
    }
  }

  /**
   * Creates the instruction to build a new Escrow.
   * @param authority
   * @returns
   */
  async newEscrowIX(
    authority: PublicKey = this.sdk.provider.wallet.publicKey
  ): Promise<TransactionInstruction> {
    const [escrow, bump] = await findEscrowAddress(this.locker, authority);
    return this.program.instruction.new_escrow(bump, {
      accounts: {
        locker: this.locker,
        escrow,
        escrow_owner: authority,
        payer: this.sdk.provider.wallet.publicKey,
        system_program: SystemProgram.programId,
      },
    });
  }

  async activateProposal({
    proposal,
    authority = this.sdk.provider.wallet.publicKey,
  }: {
    proposal: PublicKey;
    authority?: PublicKey;
  }): Promise<TransactionEnvelope> {
    const [escrow] = await findEscrowAddress(this.locker, authority);
    const ix = this.program.instruction.activate_proposal({
      accounts: {
        locker: this.locker,
        governor: this.governorKey,
        proposal,
        escrow,
        escrow_owner: authority,
        govern_program: TRIBECA_ADDRESSES.Govern,
      },
    });
    return new TransactionEnvelope(this.sdk.provider, [ix]);
  }

  async lockTokens({
    amount,
    duration,
    authority = this.sdk.provider.wallet.publicKey,
  }: {
    amount: BN;
    duration: BN;
    authority?: PublicKey;
  }): Promise<TransactionEnvelope> {
    invariant(this.locker, "locker not set");

    const { escrow, instruction: initEscrowIx } = await this.getOrCreateEscrow(
      authority
    );
    const { govTokenAccount, govTokenVault, instructions } =
      await this._getOrCreateGovTokenATAsInternal(authority, escrow);
    if (initEscrowIx) {
      instructions.push(initEscrowIx);
    }

    const lockerData = await this.reload();
    instructions.push(
      this.program.instruction.lock(amount, duration, {
        accounts: {
          locker: this.locker,
          escrow: escrow,
          escrow_owner: authority,
          escrow_tokens: govTokenVault,
          source_tokens: govTokenAccount,
          token_program: TOKEN_PROGRAM_ID,
        },
        remainingAccounts: lockerData.params.whitelist_enabled
          ? [
              {
                pubkey: SYSVAR_INSTRUCTIONS_PUBKEY,
                isSigner: false,
                isWritable: false,
              },
              {
                pubkey: PublicKey.default,
                isSigner: false,
                isWritable: false,
              },
            ]
          : [],
      })
    );

    return new TransactionEnvelope(this.sdk.provider, instructions);
  }

  async exit({
    authority = this.sdk.provider.wallet.publicKey,
  }: {
    authority?: PublicKey;
  }): Promise<TransactionEnvelope> {
    invariant(this.locker, "locker not set");

    const [escrow] = await findEscrowAddress(this.locker, authority);
    const escrowData = await this.fetchEscrow(escrow);
    const { govTokenAccount, instructions } =
      await this._getOrCreateGovTokenATAsInternal(authority, escrow);
    instructions.push(
      this.program.instruction.exit({
        accounts: {
          locker: this.locker,
          escrow,
          escrow_owner: authority,
          escrow_tokens: escrowData.tokens,
          destination_tokens: govTokenAccount,
          payer: this.sdk.provider.wallet.publicKey,
          token_program: TOKEN_PROGRAM_ID,
        },
      })
    );

    return new TransactionEnvelope(this.sdk.provider, instructions);
  }

  async castVotes({
    voteSide,
    proposal,
    authority = this.sdk.provider.wallet.publicKey,
    reason,
  }: {
    voteSide: VoteSide;
    proposal: PublicKey;
    authority?: PublicKey;
    reason?: string;
  }): Promise<TransactionEnvelope> {
    const ixs: TransactionInstruction[] = [];

    const { escrow, instruction: escrowIx } = await this.getOrCreateEscrow(
      authority
    );
    if (escrowIx) {
      ixs.push(escrowIx);
    }

    const { voteKey, instruction: createVoteIX } =
      await this.governor.getOrCreateVote({
        proposal,
        voter: authority,
      });
    if (createVoteIX) {
      ixs.push(createVoteIX);
    }

    ixs.push(
      this.program.instruction.cast_vote(voteSide, {
        accounts: {
          locker: this.locker,
          escrow: escrow,
          vote_delegate: authority ?? this.sdk.provider.wallet.publicKey,
          proposal,
          vote: voteKey,
          governor: this.governorKey,
          govern_program: TRIBECA_ADDRESSES.Govern,
        },
      })
    );

    if (reason?.length) {
      ixs.push(createMemoInstruction(reason, [authority]));
    }

    return new TransactionEnvelope(this.sdk.provider, ixs);
  }

  async setVoteDelegate(
    newDelegate: PublicKey,
    authority: PublicKey = this.sdk.provider.wallet.publicKey
  ): Promise<TransactionEnvelope> {
    const [escrow] = await findEscrowAddress(this.locker, authority);

    return new TransactionEnvelope(this.sdk.provider, [
      this.program.instruction.set_vote_delegate(newDelegate, {
        accounts: {
          escrow,
          escrow_owner: authority,
        },
      }),
    ]);
  }

  async createApproveProgramLockPrivilegeIx(
    programId: PublicKey,
    owner: PublicKey | null
  ): Promise<TransactionInstruction> {
    const [whitelistEntry, bump] = await findWhitelistAddress(
      this.locker,
      programId,
      owner
    );
    const lockerData = await this.reload();
    const governorData = await this.sdk.programs.Govern.account.Governor.fetch(
      lockerData.governor
    );
    return this.program.instruction.approve_program_lock_privilege(bump, {
      accounts: {
        locker: this.locker,
        whitelist_entry: whitelistEntry,
        governor: lockerData.governor,
        smart_wallet: governorData.smart_wallet,
        executable_id: programId,
        whitelisted_owner: owner ?? SystemProgram.programId,
        payer: this.sdk.provider.wallet.publicKey,
        system_program: SystemProgram.programId,
      },
    });
  }

  async setLockerParamsIx(args: LockerParams): Promise<TransactionInstruction> {
    const lockerData = await this.reload();
    const governorData = await this.sdk.programs.Govern.account.Governor.fetch(
      lockerData.governor
    );

    return this.program.instruction.set_locker_params(args, {
      accounts: {
        locker: this.locker,
        governor: lockerData.governor,
        smart_wallet: governorData.smart_wallet,
      },
    });
  }

  private async _getOrCreateGovTokenATAsInternal(
    authority: PublicKey,
    escrow: PublicKey
  ): Promise<{
    govTokenAccount: PublicKey;
    govTokenVault: PublicKey;
    instructions: TransactionInstruction[];
  }> {
    const { provider } = this.sdk;
    const lockerData = await this.data();

    const { address: govTokenAccount, instruction: ix1 } = await getOrCreateATA(
      {
        provider,
        mint: lockerData.token_mint,
        owner: authority,
        payer: authority,
      }
    );
    const { address: govTokenVault, instruction: ix2 } = await getOrCreateATA({
      provider,
      mint: lockerData.token_mint,
      owner: escrow,
      payer: authority,
    });

    return {
      govTokenAccount,
      govTokenVault,
      instructions: [ix1, ix2].filter(
        (ix): ix is TransactionInstruction => !!ix
      ),
    };
  }
}
