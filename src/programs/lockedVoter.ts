import type { IdlAccounts, IdlTypes, Program } from "@coral-xyz/anchor";

import type { LockedVoterIDL } from "../idls/locked_voter";

export * from "../idls/locked_voter";

/**
 * Account data types extracted from the LockedVoter IDL.
 */
export type LockerData = IdlAccounts<LockedVoterIDL>["locker"];
export type EscrowData = IdlAccounts<LockedVoterIDL>["escrow"];
export type LockerWhitelistEntryData =
  IdlAccounts<LockedVoterIDL>["lockerWhitelistEntry"];

/**
 * Defined types from the LockedVoter IDL.
 */
export type LockerParams = IdlTypes<LockedVoterIDL>["lockerParams"];

/**
 * The LockedVoter program type.
 */
export type LockedVoterProgram = Program<LockedVoterIDL>;
