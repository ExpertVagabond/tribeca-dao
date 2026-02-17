import type { IdlAccounts, IdlTypes, Program } from "@coral-xyz/anchor";

import type { LockedVoterIDL } from "../idls/locked_voter";

export * from "../idls/locked_voter";

/**
 * Account data types extracted from the LockedVoter IDL.
 */
export type LockerData = IdlAccounts<LockedVoterIDL>["Locker"];
export type EscrowData = IdlAccounts<LockedVoterIDL>["Escrow"];
export type LockerWhitelistEntryData =
  IdlAccounts<LockedVoterIDL>["LockerWhitelistEntry"];

/**
 * Defined types from the LockedVoter IDL.
 */
export type LockerParams = IdlTypes<LockedVoterIDL>["LockerParams"];

/**
 * The LockedVoter program type.
 */
export type LockedVoterProgram = Program<LockedVoterIDL>;
