use crate::*;

impl<'info> InitializeElectorate<'info> {
    pub fn validate(&self) -> Result<()> {
        Ok(())
    }
}

impl<'info> InitializeTokenRecord<'info> {
    pub fn validate(&self) -> Result<()> {
        Ok(())
    }
}

impl<'info> ActivateProposal<'info> {
    pub fn validate(&self) -> Result<()> {
        Ok(())
    }
}

impl<'info> TokenContext<'info> {
    pub fn validate(&self) -> Result<()> {
        Ok(())
    }
}

impl<'info> VoterContext<'info> {
    pub fn validate(&self) -> Result<()> {
        Ok(())
    }
}
