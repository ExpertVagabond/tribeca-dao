import type { TransactionEnvelope } from "@saberhq/solana-contrib";
import type { TokenAmount } from "@saberhq/token-utils";
import {
  getATAAddress,
  getOrCreateATA,
  TOKEN_PROGRAM_ID,
} from "@saberhq/token-utils";
import type { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { SystemProgram } from "@solana/web3.js";
import BN from "bn.js";

import { TRIBECA_ADDRESSES } from "../../constants";
import type { EscrowData, LockerData } from "../../programs/lockedVoter";
import type { TribecaSDK } from "../../sdk";
import { findVoteAddress } from "../govern/pda";
import type { VoteSide } from "../govern/types";

export class VoteEscrow {
  private _lockerData: LockerData | null = null;
  private _escrowData: EscrowData | null = null;

  constructor(
    readonly sdk: TribecaSDK,
    readonly locker: PublicKey,
    readonly governorKey: PublicKey,
    readonly escrowKey: PublicKey,
    readonly owner: PublicKey
  ) {}

  get provider() {
    return this.sdk.provider;
  }

  get lockerProgram() {
    return this.sdk.programs.LockedVoter;
  }

  /**
   * Locker data.
   */
  async lockerData() {
    if (!this._lockerData) {
      this._lockerData = await this.lockerProgram.account.Locker.fetch(
        this.locker
      );
    }
    return this._lockerData;
  }

  /**
   * Escrow data.
   */
  async data() {
    if (!this._escrowData) {
      this._escrowData = await this.lockerProgram.account.Escrow.fetch(
        this.escrowKey
      );
    }
    return this._escrowData;
  }

  /**
   * Creates a function to calculate the voting power of this escrow.
   * @returns
   */
  async makeCalculateVotingPower(): Promise<(timestampSeconds: number) => BN> {
    const escrowData = await this.data();
    const lockerData = await this.lockerData();
    return (timestampSeconds: number) => {
      if (escrowData.escrow_started_at.eq(new BN(0))) {
        return new BN(0);
      }
      if (
        timestampSeconds < escrowData.escrow_started_at.toNumber() ||
        timestampSeconds >= escrowData.escrow_ends_at.toNumber()
      ) {
        return new BN(0);
      }
      const secondsUntilLockupExpiry = escrowData.escrow_ends_at
        .sub(new BN(timestampSeconds))
        .toNumber();
      const relevantSecondsUntilLockupExpiry = Math.min(
        secondsUntilLockupExpiry,
        lockerData.params.max_stake_duration.toNumber()
      );
      const powerIfMaxLockup = escrowData.amount.mul(
        new BN(lockerData.params.max_stake_vote_multiplier)
      );
      return powerIfMaxLockup
        .mul(new BN(relevantSecondsUntilLockupExpiry))
        .div(lockerData.params.max_stake_duration);
    };
  }

  /**
   * Calculates the voting power of this escrow.
   * @param time Optional time to calculate power for.
   * @returns
   */
  async calculateVotingPower(time: Date = new Date()): Promise<BN> {
    return (await this.makeCalculateVotingPower())(
      Math.floor(time.getTime() / 1_000)
    );
  }

  /**
   * Activates a proposal.
   * @returns
   */
  activateProposal(proposal: PublicKey): TransactionEnvelope {
    return this.provider.newTX([
      this.lockerProgram.instruction.activate_proposal({
        accounts: {
          locker: this.locker,
          governor: this.governorKey,
          proposal,
          escrow: this.escrowKey,
          escrow_owner: this.owner,
          govern_program: TRIBECA_ADDRESSES.Govern,
        },
      }),
    ]);
  }

  /**
   * Casts a vote on a proposal.
   * @returns
   */
  async castVote({
    proposal,
    side,
  }: {
    proposal: PublicKey;
    side: VoteSide;
  }): Promise<TransactionEnvelope> {
    const [voteKey, voteBump] = await findVoteAddress(proposal, this.owner);
    const vote = await this.provider.getAccountInfo(voteKey);
    let createVoteIX: TransactionInstruction | null = null;
    if (!vote) {
      createVoteIX = this.sdk.programs.Govern.instruction.new_vote(
        voteBump,
        this.owner,
        {
          accounts: {
            proposal,
            vote: voteKey,
            payer: this.provider.wallet.publicKey,
            system_program: SystemProgram.programId,
          },
        }
      );
    }
    return this.provider.newTX([
      createVoteIX,
      this.lockerProgram.instruction.cast_vote(side, {
        accounts: {
          locker: this.locker,
          escrow: this.escrowKey,
          vote_delegate: this.owner,
          proposal,
          vote: voteKey,
          governor: this.governorKey,
          govern_program: TRIBECA_ADDRESSES.Govern,
        },
      }),
    ]);
  }

  /**
   * Locks tokens into the escrow.
   * @param amount
   * @param durationSeconds The duration of the lock, in seconds
   * @param authority
   * @returns
   */
  async lock(
    amount: TokenAmount,
    durationSeconds: number
  ): Promise<TransactionEnvelope> {
    const escrowData = await this.data();
    const sourceTokens = await getATAAddress({
      mint: amount.token.mintAccount,
      owner: escrowData.owner,
    });
    return this.provider.newTX([
      this.lockerProgram.instruction.lock(
        amount.toU64(),
        new BN(durationSeconds),
        {
          accounts: {
            locker: this.locker,
            escrow: this.escrowKey,
            escrow_tokens: escrowData.tokens,
            escrow_owner: escrowData.owner,
            source_tokens: sourceTokens,
            token_program: TOKEN_PROGRAM_ID,
          },
        }
      ),
    ]);
  }

  /**
   * Exits the escrow.
   * @returns
   */
  async exit(): Promise<TransactionEnvelope> {
    const lockerData = await this.lockerData();
    const escrowData = await this.data();
    const destinationTokens = await getOrCreateATA({
      provider: this.provider,
      mint: lockerData.token_mint,
      owner: escrowData.owner,
    });
    return this.provider.newTX([
      destinationTokens.instruction,
      this.lockerProgram.instruction.exit({
        accounts: {
          locker: this.locker,
          escrow: this.escrowKey,
          escrow_owner: escrowData.owner,
          escrow_tokens: escrowData.tokens,
          destination_tokens: destinationTokens.address,
          payer: this.provider.wallet.publicKey,
          token_program: TOKEN_PROGRAM_ID,
        },
      }),
    ]);
  }
}
