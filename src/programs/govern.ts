import type { IdlAccounts, IdlTypes, Program } from "@coral-xyz/anchor";
import type { AccountMeta } from "@solana/web3.js";

import type { GovernIDL } from "../idls/govern";

export * from "../idls/govern";

/**
 * Account data types extracted from the Govern IDL.
 */
export type GovernorData = IdlAccounts<GovernIDL>["governor"];
export type ProposalData = IdlAccounts<GovernIDL>["proposal"];
export type VoteData = IdlAccounts<GovernIDL>["vote"];
export type ProposalMetaData = IdlAccounts<GovernIDL>["proposalMeta"] & {
  title: string;
  descriptionLink: string;
};

/**
 * Defined types from the Govern IDL.
 */
export type GovernanceParameters =
  IdlTypes<GovernIDL>["governanceParameters"];
export type ProposalInstruction =
  IdlTypes<GovernIDL>["proposalInstruction"] & {
    keys: AccountMeta[];
  };

/**
 * The Govern program type.
 */
export type GovernProgram = Program<GovernIDL>;
