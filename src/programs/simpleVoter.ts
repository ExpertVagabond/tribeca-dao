import type { IdlAccounts, Program } from "@coral-xyz/anchor";

import type { SimpleVoterIDL } from "../idls/simple_voter";

export * from "../idls/simple_voter";

/**
 * Account data types extracted from the SimpleVoter IDL.
 */
export type ElectorateData = IdlAccounts<SimpleVoterIDL>["Electorate"];
export type TokenRecordData = IdlAccounts<SimpleVoterIDL>["TokenRecord"];

/**
 * The SimpleVoter program type.
 */
export type SimpleVoterProgram = Program<SimpleVoterIDL>;
