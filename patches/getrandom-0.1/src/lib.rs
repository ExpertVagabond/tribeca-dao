//! Minimal getrandom 0.1 shim for SBF/BPF targets.
//! Provides the same public API as getrandom 0.1.16 but returns zeros
//! on unsupported targets instead of failing to compile.

#![cfg_attr(not(feature = "std"), no_std)]

#[cfg(not(feature = "std"))]
extern crate core;

use core::fmt;
use core::num::NonZeroU32;

/// Error type compatible with getrandom 0.1 API
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
pub struct Error(NonZeroU32);

impl Error {
    pub const UNKNOWN: u32 = 1;
    pub const UNAVAILABLE: u32 = 2;
    pub const INTERNAL_START: u32 = (1 << 31) + (1 << 30);
    pub const CUSTOM_START: u32 = (1 << 31) + (1 << 30) + (1 << 29);

    pub fn new_custom(n: u32) -> Error {
        Error(NonZeroU32::new(n).unwrap())
    }

    pub fn code(&self) -> NonZeroU32 {
        self.0
    }

    pub fn raw_os_error(&self) -> Option<i32> {
        None
    }
}

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "getrandom: unavailable on this platform (code {})", self.0)
    }
}

impl From<NonZeroU32> for Error {
    fn from(code: NonZeroU32) -> Self {
        Error(code)
    }
}

#[cfg(feature = "std")]
extern crate std;

#[cfg(feature = "std")]
impl std::error::Error for Error {}

/// Fill `dest` with random bytes.
/// On SBF/BPF targets this fills with zeros (deterministic).
pub fn getrandom(dest: &mut [u8]) -> Result<(), Error> {
    for b in dest.iter_mut() {
        *b = 0;
    }
    Ok(())
}
