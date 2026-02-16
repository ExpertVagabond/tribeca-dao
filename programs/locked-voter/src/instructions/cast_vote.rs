use crate::*;
use govern::ProposalState;

/// Accounts for [locked_voter::cast_vote].
#[derive(Accounts)]
pub struct CastVote<'info> {
    /// The [Locker].
    pub locker: Account<'info, Locker>,
    /// The [Escrow] that is voting.
    pub escrow: Account<'info, Escrow>,
    /// Vote delegate of the [Escrow].
    pub vote_delegate: Signer<'info>,

    /// The [Proposal] being voted on.
    #[account(mut)]
    pub proposal: Account<'info, Proposal>,
    /// The [Vote].
    #[account(mut)]
    pub vote: Account<'info, Vote>,

    /// The [Governor].
    pub governor: Account<'info, Governor>,
    /// The [govern] program.
    pub govern_program: Program<'info, govern::program::Govern>,
}

impl<'info> CastVote<'info> {
    pub fn cast_vote(&mut self, side: u8) -> Result<()> {
        let voting_power = self.future_voting_power()?;

        // zero votes should short circuit.
        if voting_power == 0 {
            return Ok(());
        }

        let seeds: &[&[&[u8]]] = locker_seeds!(self.locker);
        let cpi_ctx = CpiContext::new(
            self.govern_program.to_account_info(),
            govern::cpi::accounts::SetVote {
                governor: self.governor.to_account_info(),
                proposal: self.proposal.to_account_info(),
                vote: self.vote.to_account_info(),
                electorate: self.locker.to_account_info(),
            },
        )
        .with_signer(seeds);

        govern::cpi::set_vote(cpi_ctx, side, voting_power)?;
        Ok(())
    }

    /// The voting power of the escrow at the time the proposal's voting ends.
    fn future_voting_power(&self) -> Result<u64> {
        Ok(self.escrow.voting_power_at_time(
            &self.locker.params,
            self.proposal.voting_ends_at
        ).ok_or_else(|| error!(ErrorCode::MathOverflow))?)
    }

    pub fn validate(&self) -> Result<()> {
        require!(
            self.escrow.locker == self.locker.key(),
            ErrorCode::KeyMismatch
        );
        require!(
            self.escrow.vote_delegate == self.vote_delegate.key(),
            ErrorCode::KeyMismatch
        );
        require!(
            self.locker.governor == self.governor.key(),
            ErrorCode::KeyMismatch
        );
        require!(
            self.proposal.governor == self.governor.key(),
            ErrorCode::KeyMismatch
        );
        require!(
            self.vote.proposal == self.proposal.key(),
            ErrorCode::KeyMismatch
        );
        require!(
            self.vote.voter == self.escrow.owner,
            ErrorCode::KeyMismatch
        );
        require!(
            self.proposal.get_state()? == ProposalState::Active,
            ErrorCode::InvariantFailed
        );
        Ok(())
    }
}
