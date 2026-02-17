import type { IdlAccounts, IdlTypes, Program } from "@coral-xyz/anchor";
import type { AccountMeta } from "@solana/web3.js";

import type { GovernIDL } from "../idls/govern";

export * from "../idls/govern";

/**
 * Account data types extracted from the Govern IDL.
 */
export type GovernorData = IdlAccounts<GovernIDL>["Governor"];
export type ProposalData = IdlAccounts<GovernIDL>["Proposal"];
export type VoteData = IdlAccounts<GovernIDL>["Vote"];
export type ProposalMetaData = IdlAccounts<GovernIDL>["ProposalMeta"] & {
  title: string;
  description_link: string;
};

/**
 * Defined types from the Govern IDL.
 */
export type GovernanceParameters = IdlTypes<GovernIDL>["GovernanceParameters"];
export type ProposalInstruction = IdlTypes<GovernIDL>["ProposalInstruction"] & {
  keys: AccountMeta[];
};

/**
 * The Govern program type.
 */
export type GovernProgram = Program<GovernIDL>;
