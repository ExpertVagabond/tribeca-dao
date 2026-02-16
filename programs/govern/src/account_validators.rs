//! Validates accounts structs.

use crate::*;

impl<'info> CreateGovernor<'info> {
    pub fn validate(&self) -> Result<()> {
        require!(
            self.smart_wallet.owners.contains(&self.governor.key()),
            ErrorCode::GovernorNotFound
        );

        Ok(())
    }
}

impl<'info> CreateProposal<'info> {
    pub fn validate(&self) -> Result<()> {
        Ok(())
    }
}

impl<'info> ActivateProposal<'info> {
    pub fn validate(&self) -> Result<()> {
        require!(
            self.governor.key() == self.proposal.governor,
            ErrorCode::KeyMismatch
        );
        require!(
            self.electorate.key() == self.governor.electorate,
            ErrorCode::KeyMismatch
        );
        require!(
            self.proposal.get_state()? == ProposalState::Draft,
            ErrorCode::ProposalNotDraft
        );

        let earliest_activation_time = self
            .governor
            .params
            .voting_delay
            .checked_add(self.proposal.created_at as u64)
            .ok_or_else(|| error!(ErrorCode::MathOverflow))?;
        let now = Clock::get()?.unix_timestamp as u64;
        if earliest_activation_time > now {
            msg!(
                "Earliest activation time {}; now: {}",
                earliest_activation_time,
                now
            );
            require!(now >= earliest_activation_time, ErrorCode::VotingDelayNotMet);
        }

        Ok(())
    }
}

impl<'info> CancelProposal<'info> {
    pub fn validate(&self) -> Result<()> {
        require!(
            self.proposer.key() == self.proposal.proposer,
            ErrorCode::KeyMismatch
        );
        require!(
            self.governor.key() == self.proposal.governor,
            ErrorCode::KeyMismatch
        );
        require!(
            self.proposal.get_state()? == ProposalState::Draft,
            ErrorCode::ProposalNotDraft
        );
        Ok(())
    }
}

impl<'info> QueueProposal<'info> {
    pub fn validate(&self) -> Result<()> {
        require!(
            self.governor.key() == self.proposal.governor,
            ErrorCode::KeyMismatch
        );
        require!(
            self.smart_wallet.key() == self.governor.smart_wallet,
            ErrorCode::KeyMismatch
        );
        let now = Clock::get()?.unix_timestamp;
        let proposal_state = self.proposal.state(now).ok_or_else(|| error!(ErrorCode::UnexpectedNone))?;
        if proposal_state != ProposalState::Succeeded {
            msg!(
                "now: {}, voting_ends_at: {}",
                now,
                self.proposal.voting_ends_at
            );
            msg!(
                "for votes: {}, against votes: {}",
                self.proposal.for_votes,
                self.proposal.against_votes,
            );
            msg!(
                "quorum req: {}, abstain votes: {}",
                self.governor.params.quorum_votes,
                self.proposal.abstain_votes,
            );
            require!(
                proposal_state == ProposalState::Succeeded,
                ErrorCode::InvariantFailed
            );
        }
        Ok(())
    }
}

impl<'info> NewVote<'info> {
    pub fn validate(&self) -> Result<()> {
        Ok(())
    }
}

impl<'info> SetVote<'info> {
    pub fn validate(&self) -> Result<()> {
        require!(
            self.governor.electorate == self.electorate.key(),
            ErrorCode::KeyMismatch
        );
        require!(
            self.governor.key() == self.proposal.governor,
            ErrorCode::KeyMismatch
        );
        require!(
            self.vote.proposal == self.proposal.key(),
            ErrorCode::KeyMismatch
        );
        require!(
            self.proposal.get_state()? == ProposalState::Active,
            ErrorCode::ProposalNotActive
        );
        Ok(())
    }
}

impl<'info> CreateProposalMeta<'info> {
    pub fn validate(&self) -> Result<()> {
        require!(
            self.proposer.key() == self.proposal.proposer,
            ErrorCode::KeyMismatch
        );
        Ok(())
    }
}

impl<'info> SetGovernanceParams<'info> {
    pub fn validate(&self) -> Result<()> {
        require!(
            self.smart_wallet.key() == self.governor.smart_wallet,
            ErrorCode::KeyMismatch
        );
        Ok(())
    }
}
