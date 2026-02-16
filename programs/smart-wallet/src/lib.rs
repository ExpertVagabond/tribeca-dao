//! Stub of the Goki Smart Wallet program.
//!
//! This is a minimal stub that provides the types and CPI interfaces
//! needed by the Tribeca `govern` and `simple-voter` programs. It is
//! NOT a functional smart-wallet implementation.

use anchor_lang::prelude::*;

declare_id!("GokivDYuQXPZCWRkwMhdH2h91KpDQXBEmpgBgs55bnpH");

/// Stub smart_wallet program.
#[program]
pub mod smart_wallet {
    use super::*;

    /// Create a new transaction (stub -- never called on-chain).
    pub fn create_transaction(
        _ctx: Context<CreateTransaction>,
        _bump: u8,
        _instructions: Vec<TXInstruction>,
    ) -> Result<()> {
        Ok(())
    }

    /// Create a new transaction with a timelock (stub -- never called on-chain).
    pub fn create_transaction_with_timelock(
        _ctx: Context<CreateTransaction>,
        _bump: u8,
        _instructions: Vec<TXInstruction>,
        _eta: i64,
    ) -> Result<()> {
        Ok(())
    }
}

// ---------------------------------------------------------------------------
// Account structs
// ---------------------------------------------------------------------------

/// A [SmartWallet] is a multisig wallet with Timelock capabilities.
#[account]
#[derive(Debug, Default)]
pub struct SmartWallet {
    /// Base key used to generate the PDA.
    pub base: Pubkey,
    /// Bump seed for PDA derivation.
    pub bump: u8,
    /// Minimum number of owner approvals needed to sign a [Transaction].
    pub threshold: u64,
    /// Minimum delay between approval and execution, in seconds.
    pub minimum_delay: i64,
    /// Time after the ETA until a [Transaction] expires.
    pub grace_period: i64,
    /// Sequence number for tracking owner set changes.
    pub owner_set_seqno: u32,
    /// Auto-incrementing transaction index.
    pub num_transactions: u64,
    /// Owners of the [SmartWallet].
    pub owners: Vec<Pubkey>,
    /// Reserved for future use.
    pub reserved: [u64; 16],
}

/// A single instruction that is part of a [Transaction].
#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug, Default, PartialEq)]
pub struct TXInstruction {
    /// Pubkey of the instruction processor that executes this instruction.
    pub program_id: Pubkey,
    /// Metadata for what accounts should be passed to the instruction processor.
    pub keys: Vec<TXAccountMeta>,
    /// Opaque data passed to the instruction processor.
    pub data: Vec<u8>,
}

/// Account metadata used to define [TXInstruction]s.
#[derive(AnchorSerialize, AnchorDeserialize, Debug, PartialEq, Copy, Clone, Default)]
pub struct TXAccountMeta {
    /// An account's public key.
    pub pubkey: Pubkey,
    /// True if an Instruction requires a Transaction signature matching `pubkey`.
    pub is_signer: bool,
    /// True if the `pubkey` can be loaded as a read-write account.
    pub is_writable: bool,
}

// ---------------------------------------------------------------------------
// CPI accounts
// ---------------------------------------------------------------------------

/// Accounts for [smart_wallet::create_transaction] and
/// [smart_wallet::create_transaction_with_timelock].
#[derive(Accounts)]
pub struct CreateTransaction<'info> {
    /// The [SmartWallet].
    #[account(mut)]
    pub smart_wallet: Account<'info, SmartWallet>,
    /// The [Transaction] to create. `UncheckedAccount` in the stub because
    /// we do not define a full `Transaction` account type here.
    /// CHECK: validated by the real smart-wallet program.
    #[account(mut)]
    pub transaction: UncheckedAccount<'info>,
    /// One of the owners. Validated by the real program.
    pub proposer: Signer<'info>,
    /// Payer of the [Transaction] account creation.
    #[account(mut)]
    pub payer: Signer<'info>,
    /// The System program.
    pub system_program: Program<'info, System>,
}
