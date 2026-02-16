use crate::*;
use anchor_lang::solana_program::{system_program, sysvar::instructions::get_instruction_relative};
use anchor_spl::token;
use num_traits::ToPrimitive;

/// Accounts for [locked_voter::lock].
#[derive(Accounts)]
pub struct Lock<'info> {
    /// [Locker].
    #[account(mut)]
    pub locker: Account<'info, Locker>,

    /// [Escrow].
    #[account(mut)]
    pub escrow: Account<'info, Escrow>,

    /// Token account held by the [Escrow].
    #[account(mut)]
    pub escrow_tokens: Account<'info, TokenAccount>,

    /// Authority of the [Escrow] and [Self::source_tokens].
    pub escrow_owner: Signer<'info>,

    /// The source of deposited tokens.
    #[account(mut)]
    pub source_tokens: Account<'info, TokenAccount>,

    /// Token program.
    pub token_program: Program<'info, Token>,
}

/// Accounts for [locked_voter::set_locker_params].
#[derive(Accounts)]
pub struct SetLockerParams<'info> {
    /// The [Locker].
    #[account(mut)]
    pub locker: Account<'info, Locker>,
    /// The [Governor].
    pub governor: Account<'info, Governor>,
    /// The smart wallet on the [Governor].
    pub smart_wallet: Signer<'info>,
}

impl<'info> SetLockerParams<'info> {
    pub fn set_locker_params(&mut self, params: LockerParams) -> Result<()> {
        let prev_params = self.locker.params;
        self.locker.params = params;

        emit!(LockerSetParamsEvent {
            locker: self.locker.key(),
            prev_params,
            params,
        });

        Ok(())
    }

    pub fn validate(&self) -> Result<()> {
        require!(
            self.governor.key() == self.locker.governor,
            ErrorCode::KeyMismatch
        );
        require!(
            self.smart_wallet.key() == self.governor.smart_wallet,
            ErrorCode::KeyMismatch
        );
        Ok(())
    }
}

impl<'info> Lock<'info> {
    pub fn lock(&mut self, amount: u64, duration: i64) -> Result<()> {
        require!(
            duration.to_u64().ok_or_else(|| error!(ErrorCode::MathOverflow))? >= self.locker.params.min_stake_duration,
            ErrorCode::LockupDurationTooShort
        );
        require!(
            duration.to_u64().ok_or_else(|| error!(ErrorCode::MathOverflow))? <= self.locker.params.max_stake_duration,
            ErrorCode::LockupDurationTooLong
        );

        // check that the escrow refresh is valid
        let escrow = &self.escrow;
        let prev_escrow_ends_at = escrow.escrow_ends_at;
        let next_escrow_started_at = Clock::get()?.unix_timestamp;
        let next_escrow_ends_at = next_escrow_started_at.checked_add(duration)
            .ok_or_else(|| error!(ErrorCode::MathOverflow))?;
        if prev_escrow_ends_at > next_escrow_ends_at {
            msg!(
                "next_escrow_ends_at: {}; prev_escrow_ends_at: {}",
                next_escrow_ends_at,
                prev_escrow_ends_at
            );
            require!(
                next_escrow_ends_at >= prev_escrow_ends_at,
                ErrorCode::RefreshCannotShorten
            );
        }

        // transfer tokens to the escrow
        // if amount is 0, we can skip this call.
        // One would lock 0 tokens at a duration to be able to refresh their existing lockup.
        if amount > 0 {
            token::transfer(
                CpiContext::new(
                    self.token_program.to_account_info(),
                    token::Transfer {
                        from: self.source_tokens.to_account_info(),
                        to: self.escrow_tokens.to_account_info(),
                        authority: self.escrow_owner.to_account_info(),
                    },
                ),
                amount,
            )?;
        }

        // update the escrow and locker

        let locker = &mut self.locker;
        let escrow = &mut self.escrow;
        escrow.record_lock_event(locker, amount, next_escrow_started_at, next_escrow_ends_at)?;

        emit!(LockEvent {
            locker: locker.key(),
            locker_supply: locker.locked_supply,
            escrow_owner: escrow.owner,
            token_mint: locker.token_mint,
            amount,
            duration,
            prev_escrow_ends_at,
            next_escrow_ends_at,
            next_escrow_started_at,
        });

        Ok(())
    }

    pub fn check_whitelisted(&self, ra: &[AccountInfo]) -> Result<()> {
        require!(ra.len() == 2, ErrorCode::MustProvideWhitelist);
        let accounts_iter = &mut ra.iter();
        let ix_sysvar_account_info = next_account_info(accounts_iter)?;
        let program_id = get_instruction_relative(0, ix_sysvar_account_info)?.program_id;
        if program_id == crate::ID {
            return Ok(());
        }

        let whitelist_entry_account_info = next_account_info(accounts_iter)?;
        require!(
            !whitelist_entry_account_info.data_is_empty(),
            ErrorCode::ProgramNotWhitelisted
        );
        let whitelist_entry =
            Account::<LockerWhitelistEntry>::try_from(whitelist_entry_account_info)?;
        require!(
            whitelist_entry.locker == self.locker.key(),
            ErrorCode::KeyMismatch
        );
        require!(
            whitelist_entry.program_id == program_id,
            ErrorCode::KeyMismatch
        );
        if whitelist_entry.owner != system_program::ID {
            require!(
                whitelist_entry.owner == self.escrow_owner.key(),
                ErrorCode::EscrowOwnerNotWhitelisted
            );
        }

        Ok(())
    }

    pub fn validate(&self) -> Result<()> {
        require!(
            self.locker.key() == self.escrow.locker,
            ErrorCode::KeyMismatch
        );
        require!(
            self.escrow.tokens == self.escrow_tokens.key(),
            ErrorCode::KeyMismatch
        );
        require!(
            self.escrow.owner == self.escrow_owner.key(),
            ErrorCode::KeyMismatch
        );
        require!(
            self.escrow_owner.key() == self.source_tokens.owner,
            ErrorCode::KeyMismatch
        );

        Ok(())
    }
}

#[event]
/// Event called in [locked_voter::lock].
pub struct LockEvent {
    /// The locker of the [Escrow]
    #[index]
    pub locker: Pubkey,
    /// The owner of the [Escrow].
    #[index]
    pub escrow_owner: Pubkey,
    /// Mint of the token that for the [Locker].
    pub token_mint: Pubkey,
    /// Amount of tokens locked.
    pub amount: u64,
    /// Amount of tokens locked inside the [Locker].
    pub locker_supply: u64,
    /// Duration of lock time.
    pub duration: i64,
    /// The previous timestamp that the [Escrow] ended at.
    pub prev_escrow_ends_at: i64,
    /// The new [Escrow] end time.
    pub next_escrow_ends_at: i64,
    /// The new [Escrow] start time.
    pub next_escrow_started_at: i64,
}

/// Event called in [locked_voter::set_locker_params].
#[event]
pub struct LockerSetParamsEvent {
    /// The [Locker].
    #[index]
    pub locker: Pubkey,
    /// Previous [LockerParams].
    pub prev_params: LockerParams,
    /// New [LockerParams].
    pub params: LockerParams,
}
