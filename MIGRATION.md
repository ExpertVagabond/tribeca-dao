# Tribeca DAO Migration Plan

> Graveyard Hackathon - Revival of Tribeca governance programs
> Story S01: Dependency audit and migration plan
> Date: 2026-02-16

## Overview

Tribeca is an open-standard governance toolkit for Solana DAOs. It was originally built
on Anchor 0.22 with heavy dependencies on the Saber (@saberhq) and Goki (@gokiprotocol)
ecosystems -- both of which are now abandoned. The programs have not been updated since
early 2022 and cannot compile on modern Rust (1.80+) or deploy with current Solana
platform-tools (v1.41+).

This document covers every dependency change required to bring the four on-chain programs
and TypeScript SDK to a compilable, testable state on Anchor 0.30+ / Solana 1.18+.

### Programs in Workspace

| Program | Description | Key Dependencies |
|---------|-------------|-----------------|
| `govern` | Core governance: proposal creation, lifecycle, voting, execution | anchor, smart-wallet, vipers |
| `locked-voter` | Token-locked voting (veToken model) | anchor, govern (CPI), vipers |
| `simple-voter` | Simple 1-token-1-vote electorate | anchor, govern (CPI), vipers |
| `whitelist-tester` | Test helper for locked-voter whitelist | anchor, locked-voter (CPI) |

### Current Toolchain

| Component | Current | Target |
|-----------|---------|--------|
| Anchor CLI | 0.22.0 | 0.30.1+ |
| Solana CLI | 1.8.16 | 1.18+ |
| Rust (SBF) | 2021 edition, ~1.60 | 2021 edition, 1.80+ |
| platform-tools | (old, pre-SBF) | v1.41+ |

---

## Rust Dependency Changes

### Per-Crate Dependency Matrix

| Crate | Current | Target | Programs Using | Notes |
|-------|---------|--------|----------------|-------|
| `anchor-lang` | `>=0.22` (resolves 0.22.0) | `0.30.1` | all 4 | Major breaking changes, see Anchor migration section |
| `anchor-spl` | `>=0.22` (resolves 0.22.0) | `0.30.1` | all 4 | Must match anchor-lang version |
| `vipers` | `^2.0` | **REMOVE** | govern, locked-voter, simple-voter | Abandoned (Saber). Vendor replacement macros locally |
| `smart-wallet` | `^0.7` (features=["cpi"]) | **REMOVE** | govern, simple-voter | Abandoned (Goki). Create local stub crate |
| `num-traits` | `0.2` | `0.2` (keep) | govern, locked-voter | No change needed |
| `proptest` | `1.0` (dev) | `1.0` (keep) | govern, locked-voter | No change needed |
| `solana-program` | ~1.9.6 (transitive) | 1.18+ (transitive via anchor) | all | Comes from anchor-lang, no direct dep |
| `spl-token` | ~3.3.0 (transitive) | latest (transitive via anchor-spl) | all | Comes from anchor-spl |

### Transitive Dependencies Causing Build Failures

| Crate | Pinned Version | Issue | Fix |
|-------|---------------|-------|-----|
| `proc-macro2` | 1.0.36 | `LineColumn` removed from `proc_macro` in Rust 1.80+ | Delete Cargo.lock, let resolver pick 1.0.70+ |
| `wasm-bindgen` | 0.2.79 | Requires >=0.2.88 for Rust 1.80+ | Delete Cargo.lock |
| `getrandom` | 0.1.16 | Unsupported on SBF target with platform-tools v1.41 | Resolves to 0.2.x with new anchor |
| `anchor-lang` | 0.22.0 | Yanked from crates.io; lock file pins it but fresh resolve fails | Upgrade to 0.30.1 |

---

## TypeScript Dependency Changes

### package.json Changes

| Package | Current | Target | Action |
|---------|---------|--------|--------|
| `@project-serum/anchor` | `^0.22.0` | -- | **REMOVE** |
| `@coral-xyz/anchor` | -- | `^0.30.1` | **ADD** (replacement for @project-serum/anchor) |
| `@saberhq/anchor-contrib` | `^1.12.45` | -- | **REMOVE** (abandoned) |
| `@saberhq/chai-solana` | `^1.12.45` | -- | **REMOVE** (abandoned) |
| `@saberhq/eslint-config` | `^1.12.45` | -- | **REMOVE** (abandoned) |
| `@saberhq/solana-contrib` | `^1.12.45` | -- | **REMOVE** (abandoned) |
| `@saberhq/token-utils` | `^1.12.45` | -- | **REMOVE** (abandoned) |
| `@gokiprotocol/client` | `^0.7.0` | -- | **REMOVE** (abandoned) |
| `@solana/web3.js` | `^1.34.0` | `^1.95.0` | **UPDATE** |
| `@solana/spl-token` | -- | `^0.4.0` | **ADD** (replaces @saberhq/token-utils for token ops) |
| `chai` | `=4.3.4` | `^4.5.0` | **UPDATE** (replaces @saberhq/chai-solana) |
| `mocha` | `^9.2.0` | `^10.0.0` | **UPDATE** |
| `typescript` | `^4.5.5` | `^5.0.0` | **UPDATE** |
| `ts-node` | `^10.5.0` | `^10.9.0` | **UPDATE** |
| `bn.js` | `^5.2.0` | `^5.2.0` | Keep |
| `tiny-invariant` | `^1.2.0` | `^1.3.0` | Keep / minor update |

### TypeScript Import Replacements

| Old Import | Replacement | Files Affected |
|-----------|-------------|----------------|
| `@project-serum/anchor` | `@coral-xyz/anchor` | sdk.ts, pda.ts (x3), locker.ts, workspace.ts, specs |
| `@saberhq/anchor-contrib` (AnchorTypes, buildCoderMap, newProgramMap, newProgram) | `@coral-xyz/anchor` native types | constants.ts, sdk.ts, programs/*.ts, whitelist-tester.ts, specs |
| `@saberhq/solana-contrib` (TransactionEnvelope, Provider, AugmentedProvider) | `@coral-xyz/anchor` Provider + `@solana/web3.js` Transaction | sdk.ts, govern.ts, governor.ts, types.ts, setup.ts (x3), locker.ts, escrow.ts, electorate.ts, workspace.ts, specs |
| `@saberhq/chai-solana` (assertTXSuccess, expectTX, chaiSolana) | Custom chai helpers or bankrun assertions | govern.spec.ts, simple-voter.spec.ts, execute-proposal.spec.ts, locked-voter.spec.ts, workspace.ts |
| `@saberhq/token-utils` (u64, Token, getOrCreateATA, createMint, TOKEN_PROGRAM_ID, etc.) | `@solana/spl-token` + `BN` | governor.ts, pda.ts, locker.ts, escrow.ts, electorate.ts, workspace.ts, specs |
| `@gokiprotocol/client` (GokiSDK, SmartWalletWrapper, findTransactionAddress) | Local smart-wallet TS helpers | sdk.ts, governor.ts, setup.ts (x3), workspace.ts, execute-proposal.spec.ts, simple-voter.spec.ts, locked-voter.spec.ts |

### peerDependencies to Update

Remove all `@saberhq/*`, `@gokiprotocol/client`, and `@project-serum/anchor` entries.
Replace with:
```json
{
  "@coral-xyz/anchor": "^0.30.1",
  "@solana/web3.js": "^1.95.0",
  "bn.js": "^5.2.0"
}
```

---

## Vipers Migration Guide

The `vipers` crate (from Saber/SaberDAO) provides convenience macros and traits for Anchor
programs. It is abandoned and incompatible with Anchor 0.30. All usage must be replaced
with inline equivalents.

### Macro/Trait Replacement Table

| Vipers Macro/Trait | Usage Count | Replacement |
|-------------------|-------------|-------------|
| `assert_keys_eq!(a, b)` | ~30 | `require_keys_eq!(a.key(), b.key(), ErrorCode::KeyMismatch)` (Anchor 0.30 built-in) |
| `assert_keys_eq!(a, b, "msg")` | ~3 | `require_keys_eq!(a.key(), b.key(), ErrorCode::KeyMismatch)` with custom error |
| `invariant!(condition, msg)` | ~15 | `require!(condition, ErrorCode::InvariantFailed)` or specific error variant |
| `invariant!(condition)` | ~2 | `require!(condition, ErrorCode::InvariantFailed)` |
| `unwrap_int!(expr)` | ~25 | `expr.ok_or_else(\|\| error!(ErrorCode::MathOverflow))?` for Option, or just `.unwrap()` in const contexts |
| `unwrap_opt!(expr, msg)` | ~3 | `expr.ok_or_else(\|\| error!(ErrorCode::UnexpectedNone))?` |
| `program_err!(Variant)` | 1 | `Err(error!(ErrorCode::Variant))` |
| `Validate` trait | ~20 impls | Move validation into Anchor `#[account(...)]` constraints or `handler()` function body |
| `vipers::prelude::*` | 2 | Remove, use individual replacements above |

### New Error Variants to Add

Each program's `ErrorCode` enum needs these new variants to replace vipers error types:

```rust
#[error_code]
pub enum ErrorCode {
    // ... existing variants ...
    #[msg("Key mismatch.")]
    KeyMismatch,
    #[msg("Invariant failed.")]
    InvariantFailed,
    #[msg("Math overflow.")]
    MathOverflow,
    #[msg("Unexpected None value.")]
    UnexpectedNone,
}
```

### Validate Trait Migration

Vipers' `Validate` trait is called via `#[access_control(ctx.accounts.validate())]` on
every instruction handler (27 instances across all 3 programs). Two migration options:

**Option A (Minimal change):** Keep `#[access_control]` but replace trait impls with a
standalone `validate()` method on each accounts struct. `#[access_control]` still works
in Anchor 0.30.

**Option B (Idiomatic Anchor 0.30):** Move all validation logic into `#[account(...)]`
constraint attributes where possible, and remaining checks into handler bodies. This is
more work but produces cleaner code.

**Recommendation:** Option A for initial migration, refactor to Option B later.

### ctx.bumps Changes (Anchor 0.22 -> 0.30)

In Anchor 0.22, `ctx.bumps` is a `BTreeMap<String, u8>` accessed via `.get("name")`.
In Anchor 0.30, `ctx.bumps` is a struct with named fields.

```rust
// Anchor 0.22 (current)
governor.bump = *unwrap_int!(ctx.bumps.get("governor"));

// Anchor 0.30 (target)
governor.bump = ctx.bumps.governor;
```

There are **8 instances** of `ctx.bumps.get()` across the codebase that need this change.

---

## Smart-Wallet Stub Plan

The `smart-wallet` crate is from the Goki protocol (abandoned). The `govern` program uses
it for CPI calls to queue governance transactions into a Smart Wallet. The `simple-voter`
program only depends on it transitively via `govern`.

### Usage Analysis

The govern program uses these types/functions from smart-wallet:

1. **Account type:** `SmartWallet` -- used in `CreateGovernor` and `QueueProposal` as an account field
2. **CPI module:** `smart_wallet::cpi::accounts::CreateTransaction` -- CPI accounts struct
3. **CPI functions:** `smart_wallet::cpi::create_transaction()` and `create_transaction_with_timelock()`
4. **Data types:** `smart_wallet::TXInstruction`, `smart_wallet::TXAccountMeta`
5. **Program type:** `smart_wallet::program::SmartWallet` -- used in `Program<'info, ...>`

### Stub Crate Design

Create `programs/smart-wallet-stub/` as a local workspace member:

```
programs/smart-wallet-stub/
  Cargo.toml
  src/
    lib.rs        # declare_id!, #[account] SmartWallet, TXInstruction, TXAccountMeta
    cpi.rs        # CPI helper functions + accounts struct
```

**Cargo.toml:**
```toml
[package]
name = "smart-wallet"
version = "0.11.0"
edition = "2021"

[lib]
crate-type = ["cdylib", "lib"]
name = "smart_wallet"

[features]
no-entrypoint = []
cpi = ["no-entrypoint"]
default = []

[dependencies]
anchor-lang = "0.30.1"
```

**Key types to define:**
```rust
// SmartWallet account -- only the fields govern reads from it
#[account]
pub struct SmartWallet {
    pub base: Pubkey,
    pub bump: u8,
    pub threshold: u64,
    pub minimum_delay: i64,
    pub grace_period: i64,
    pub owner_set_seqno: u32,
    pub num_transactions: u64,
    pub owners: Vec<Pubkey>,
}

// Transaction instruction (mirrors Solana's Instruction)
#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug)]
pub struct TXInstruction {
    pub program_id: Pubkey,
    pub keys: Vec<TXAccountMeta>,
    pub data: Vec<u8>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug)]
pub struct TXAccountMeta {
    pub pubkey: Pubkey,
    pub is_signer: bool,
    pub is_writable: bool,
}
```

**CPI methods to stub:**
```rust
pub mod cpi {
    pub mod accounts {
        #[derive(Accounts)]
        pub struct CreateTransaction<'info> { ... }
    }
    pub fn create_transaction(...) -> Result<()> { ... }
    pub fn create_transaction_with_timelock(...) -> Result<()> { ... }
}
```

### Anchor.toml Update

The test genesis already references `./artifacts/deploy/smart_wallet.so`. The stub must
produce a compatible .so with the same program ID (`GokivDYuQXPZCWRkwMhdH2h91KpDQXBEmpgBgs55bnpH`).

---

## Anchor 0.22 to 0.30 Breaking Changes

### Critical Changes Affecting This Codebase

| Change | Impact | Files Affected |
|--------|--------|---------------|
| `ctx.bumps` is now a struct, not `BTreeMap` | All `ctx.bumps.get("name")` calls must become `ctx.bumps.name` | 8 callsites in govern, locked-voter, simple-voter |
| `#[instruction(bump: u8, ...)]` bump param removed | Remove manual bump args from instructions; Anchor auto-derives | account_structs.rs, lib.rs for all programs |
| `space` calculation changes | `8 +` discriminator is implicit in some contexts | account_structs.rs (CreateProposal, CreateProposalMeta) |
| `declare_id!` macro unchanged | No change needed | -- |
| `#[error_code]` replaces `#[error]` | Already using `#[error_code]` in 0.22 | No change |
| `#[account(init, ...)]` syntax changes | `bump` in init changed: no longer `bump = expr` in some forms | account_structs.rs |
| Account discriminator is 8 bytes | Was already 8 bytes in 0.22 | No change |
| `Program<'info, T>` requires `T: Id` | smart-wallet stub must implement `Id` | smart-wallet-stub |
| `error!()` macro replaces `ProgramError::from(...)` | vipers macros already abstracted this | Handled in vipers replacement |
| SPL token account types in anchor-spl | Import paths changed | locked-voter, simple-voter |
| `Result<()>` default error type | `Result<()>` now defaults to `anchor_lang::Result<()>` | Already compatible |

### Instruction Argument Changes

Anchor 0.30 no longer requires passing bump seeds as instruction arguments. The following
instruction signatures must be updated:

```rust
// Current (0.22) -- bump is an explicit argument
pub fn create_governor(ctx: Context<CreateGovernor>, _bump: u8, ...) -> Result<()>
pub fn create_proposal(ctx: Context<CreateProposal>, _bump: u8, ...) -> Result<()>
pub fn new_vote(ctx: Context<NewVote>, _bump: u8, voter: Pubkey) -> Result<()>
pub fn create_proposal_meta(ctx: Context<CreateProposalMeta>, _bump: u8, ...) -> Result<()>
pub fn new_locker(ctx: Context<NewLocker>, _bump: u8, params: LockerParams) -> Result<()>
pub fn new_escrow(ctx: Context<NewEscrow>, _bump: u8) -> Result<()>
pub fn approve_program_lock_privilege(ctx: Context<...>, _bump: u8) -> Result<()>
pub fn initialize_electorate(ctx: Context<...>, _bump: u8, ...) -> Result<()>
pub fn initialize_token_record(ctx: Context<...>, _bump: u8) -> Result<()>

// Target (0.30) -- remove _bump parameter
pub fn create_governor(ctx: Context<CreateGovernor>, ...) -> Result<()>
```

This also means `#[instruction(bump: u8, ...)]` attributes on account structs need the
bump removed. `QueueProposal.queue_transaction(tx_bump)` will need special handling since
it passes the bump to the smart-wallet CPI.

---

## Build Baseline Errors (Current State)

These are the errors produced when attempting `anchor build` on the current codebase with
modern tooling (Rust 1.92, Solana CLI 1.18+, platform-tools v1.41):

### Error 1: proc-macro2 v1.0.36 incompatible
```
error[E0432]: unresolved import `proc_macro::LineColumn`
```
**Cause:** `LineColumn` was removed from `proc_macro` in Rust 1.80. The lockfile pins
proc-macro2 to 1.0.36, which uses this removed API.
**Fix:** Delete `Cargo.lock` so the resolver picks proc-macro2 >= 1.0.70.

### Error 2: wasm-bindgen v0.2.79
```
error: expected a version >= 0.2.88
```
**Cause:** Old lockfile pin. wasm-bindgen 0.2.79 is incompatible with Rust >= 1.78.
**Fix:** Resolved by deleting Cargo.lock.

### Error 3: getrandom v0.1.16 on SBF
```
error: target is not supported, for more information see: https://docs.rs/getrandom/#unsupported-targets
```
**Cause:** getrandom 0.1.x doesn't support the SBF target. This was a transitive dep
from old solana-program versions.
**Fix:** Anchor 0.30 transitively pulls getrandom 0.2.x which supports SBF with the
`custom` feature.

### Error 4: anchor-lang 0.22.0 yanked
```
error: failed to select a version for the requirement `anchor-lang = ">=0.22"`
```
**Cause:** anchor-lang 0.22.0 has been yanked from crates.io. While the current lockfile
pins it, any fresh `cargo update` or lockfile deletion triggers this.
**Fix:** Upgrade to anchor-lang 0.30.1.

---

## Migration Order

The migration must proceed in a specific order due to inter-crate dependencies.

### Phase 1: Infrastructure (S02)
1. Delete `Cargo.lock` (stale pins cause all build errors)
2. Create `programs/smart-wallet-stub/` crate with account types + CPI stubs
3. Add smart-wallet-stub to workspace members in root `Cargo.toml`
4. Update `Anchor.toml`: set `anchor_version = "0.30.1"`, `solana_version = "1.18.22"`

### Phase 2: Rust Dependencies (S03)
5. Create `vipers-shim/` module or inline macros in each program:
   - `require_keys_eq!` replacing `assert_keys_eq!`
   - `require!` replacing `invariant!`
   - Error-returning expressions replacing `unwrap_int!` / `unwrap_opt!` / `program_err!`
6. Update all four `programs/*/Cargo.toml`:
   - `anchor-lang = "0.30.1"`
   - `anchor-spl = "0.30.1"`
   - Remove `vipers` dependency
   - Change `smart-wallet` to point to local stub: `{ path = "../smart-wallet-stub", features = ["cpi"] }`
7. Add new error variants (`KeyMismatch`, `MathOverflow`, etc.) to each program's ErrorCode

### Phase 3: Anchor 0.30 API Changes (S04)
8. Fix `ctx.bumps.get("name")` -> `ctx.bumps.name` (8 instances)
9. Remove `_bump: u8` from instruction signatures (9 instructions)
10. Remove `#[instruction(bump: u8, ...)]` from account structs
11. Replace `Validate` trait impls with standalone `validate()` methods
12. Verify `#[access_control]` still works (it does in 0.30, just deprecated)

### Phase 4: Build Verification (S05)
13. Run `anchor build` -- iterate on any remaining compilation errors
14. Run `cargo test` for the proptest unit tests in govern/proposal.rs

### Phase 5: TypeScript SDK (S06+)
15. Replace all `@project-serum/anchor` imports with `@coral-xyz/anchor`
16. Remove all `@saberhq/*` imports, replace with `@coral-xyz/anchor` + `@solana/spl-token`
17. Remove `@gokiprotocol/client`, create local smart-wallet TS helpers
18. Update test infrastructure (replace `@saberhq/chai-solana` with standard chai/bankrun)
19. Regenerate IDL types from new Anchor 0.30 IDL format
20. Run test suite

### Dependency Graph (build order)

```
smart-wallet-stub (new, standalone)
    |
    v
govern (depends on: anchor 0.30, smart-wallet-stub, vipers-replacement)
    |
    v
locked-voter (depends on: govern CPI, anchor 0.30, vipers-replacement)
    |          \
    v           v
simple-voter    whitelist-tester
(depends on:    (depends on: locked-voter CPI, anchor 0.30)
 govern CPI,
 smart-wallet-stub,
 anchor 0.30,
 vipers-replacement)
```

---

## Risk Assessment

| Risk | Severity | Mitigation |
|------|----------|------------|
| Smart-wallet stub account layout mismatch | HIGH | Must match original SmartWallet discriminator + field layout exactly; verify against deployed program IDL |
| Anchor 0.30 IDL format breaks TS SDK | MEDIUM | Regenerate all IDL types; may need manual fixups for custom types |
| Program ID reuse after code changes | LOW | Programs use `declare_id!` with original keys; upgrade authority needed for mainnet |
| Test flakiness from Saber test infra removal | MEDIUM | Rewrite tests incrementally; use bankrun for speed |
| anchor-spl token types changed | LOW | Straightforward import path updates |

---

## References

- [Anchor 0.30 Migration Guide](https://www.anchor-lang.com/docs/migration-guide)
- [Original Tribeca Repo](https://github.com/TribecaHQ/tribeca)
- [Goki Smart Wallet Source](https://github.com/GokiProtocol/goki) (archived)
- [Vipers Source](https://github.com/saber-hq/vipers) (archived)
- [Solana Program Library](https://github.com/solana-labs/solana-program-library)
