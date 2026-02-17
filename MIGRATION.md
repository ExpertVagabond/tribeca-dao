# Tribeca DAO — Revival Migration Guide

> **Solana Graveyard Hackathon** | Track: DAOs ($5K)
> Original: [TribecaHQ/tribeca](https://github.com/TribecaHQ/tribeca) (210 stars)
> Revival: [ExpertVagabond/tribeca-dao](https://github.com/ExpertVagabond/tribeca-dao)
> Date: 2026-02-16

## TL;DR

Tribeca is an open-standard governance toolkit for Solana DAOs, heavily inspired by
Compound and Curve governance. It was abandoned in early 2022 with pinned dependencies
on yanked crates (Anchor 0.22), abandoned ecosystems (Saber/vipers, Goki/smart-wallet),
and toolchain incompatibilities that prevented compilation on any Rust version after 1.60.
This revival brings all **4 on-chain programs** to **Anchor 0.30.1 / Solana SDK 1.18+**
with BPF builds succeeding, IDLs regenerated, and the TypeScript SDK migrated.

## Migration Status

| Story | Description                                            | Status | Commit                |
| ----- | ------------------------------------------------------ | ------ | --------------------- |
| S01   | Dependency audit and migration plan                    | Done   | `63e92e9`             |
| S02   | Replace vipers macros with inline equivalents          | Done   | `7ca20ea`             |
| S03   | Create smart-wallet stub crate (Goki replacement)      | Done   | `c913cc1`             |
| S04   | Upgrade Anchor to 0.30+ and Solana SDK                 | Done   | `4d74c4d`             |
| S05   | Pin BPF toolchain deps (blake3, proc-macro-crate)      | Done   | `f0ab951` + `b01a5ed` |
| S06   | Regenerate Anchor 0.30 IDLs and TypeScript types       | Done   | `8f9ef0c`             |
| S07   | Migrate TypeScript SDK (@saberhq -> @coral-xyz/anchor) | Done   | `803df71`             |
| S08   | TypeScript SDK compilation fix + 9 smoke tests         | Done   | `991ea17`             |
| S09   | Demo: create governor + proposal lifecycle             | Done   | `7488da1`             |

## What Changed

### Abandoned Dependencies Replaced

| Dependency                    | What It Was                               | Replacement                                                        |
| ----------------------------- | ----------------------------------------- | ------------------------------------------------------------------ |
| **vipers** (Saber)            | Anchor convenience macros                 | Inline `require!`, `require_keys_eq!`, error variants              |
| **smart-wallet** (Goki)       | Multisig execution for governance         | Local stub crate with matching account layout + CPI                |
| **@project-serum/anchor**     | Old Anchor TS SDK                         | `@coral-xyz/anchor` 0.30.1                                         |
| **@saberhq/anchor-contrib**   | AnchorTypes, buildCoderMap, newProgramMap | Native `IdlAccounts`, `IdlTypes`, `Program` from @coral-xyz/anchor |
| **anchor-lang 0.22** (yanked) | On-chain framework                        | `anchor-lang` 0.30.1                                               |

### Rust Program Changes

**All 4 programs** (govern, locked-voter, simple-voter, whitelist-tester) were migrated:

1. **Anchor 0.22 -> 0.30 API changes:**

   - `ctx.bumps.get("name")` -> `ctx.bumps.name` (8 instances)
   - Removed `_bump: u8` from instruction signatures (9 instructions)
   - Removed `#[instruction(bump: u8)]` from account structs
   - Updated SPL token import paths for anchor-spl 0.30

2. **Vipers macro replacement** (~75 callsites across 3 programs):

   - `assert_keys_eq!(a, b)` -> `require_keys_eq!(a.key(), b.key(), ErrorCode::KeyMismatch)`
   - `invariant!(cond, msg)` -> `require!(cond, ErrorCode::InvariantFailed)`
   - `unwrap_int!(expr)` -> `expr.ok_or_else(|| error!(ErrorCode::MathOverflow))?`
   - `unwrap_opt!(expr, msg)` -> `expr.ok_or_else(|| error!(ErrorCode::UnexpectedNone))?`
   - `Validate` trait -> standalone `validate()` methods with `#[access_control]`

3. **Smart-wallet stub crate:**

   - Created `programs/smart-wallet-stub/` matching Goki's account layout
   - Implements `SmartWallet` account, `TXInstruction`, `TXAccountMeta` types
   - CPI stubs for `create_transaction` and `create_transaction_with_timelock`
   - Same program ID (`GokivDYuQXPZCWRkwMhdH2h91KpDQXBEmpgBgs55bnpH`)

4. **BPF toolchain pins:**
   - `borsh = "=1.5.3"`, `proc-macro-crate = "=3.2.0"`, `indexmap = "=2.7.1"`, `blake3 = "=1.5.5"`
   - Cargo.lock version downgraded to v3 for BPF compatibility

### TypeScript SDK Changes

- Replaced `AnchorTypes<IDL>` pattern with `IdlAccounts<IDL>` / `IdlTypes<IDL>` / `Program<IDL>`
- Removed `buildCoderMap` and `newProgramMap` (replaced with direct `Program` construction)
- Added backward-compatible type aliases (GovernIDL, LockedVoterIDL, SimpleVoterIDL)
- Updated all PDA helpers from @project-serum/anchor to @coral-xyz/anchor utils
- Preserved all exported type names (GovernorData, ProposalData, GovernProgram, etc.)

## Architecture

```
programs/
  govern/                   -- Core governance: proposals, voting, execution
  locked-voter/             -- veToken locked voting (time-weighted)
  simple-voter/             -- 1 token = 1 vote
  whitelist-tester/         -- Test helper for locked-voter whitelist
  smart-wallet-stub/        -- Local replacement for abandoned Goki crate
src/
  sdk.ts                    -- Main SDK entry (TribecaSDK class)
  constants.ts              -- Program IDs and addresses
  programs/
    govern.ts               -- Govern program types
    lockedVoter.ts          -- Locked voter program types
    simpleVoter.ts          -- Simple voter program types
  idls/
    govern.ts               -- Generated IDL types
    locked_voter.ts         -- Generated IDL types
    simple_voter.ts         -- Generated IDL types
  wrappers/
    govern/                 -- Governor, proposal lifecycle helpers
    lockedVoter/            -- Locker, escrow, PDA helpers
    simpleVoter/            -- Electorate PDA helpers
```

## Build Instructions

### Prerequisites

```bash
rustc --version     # 1.80+ required
solana --version    # 1.18+ required
anchor --version    # 0.30.1 required
```

### Build Programs

```bash
anchor build                                    # Build all 4 programs
cargo build-sbf -- -p govern                    # Build govern only
cargo build-sbf -- -p locked-voter              # Build locked-voter only
```

### Run Tests

```bash
cargo test -p govern                            # Govern unit tests (proptest)
cargo test -p locked-voter                      # Locked-voter unit tests
```

### TypeScript SDK

```bash
npm install
npx tsc --noEmit                                # Type check
```

## Key Technical Decisions

1. **Smart-wallet stub over removal**: Rather than removing governance execution entirely,
   we created a local stub crate matching Goki's account layout. This preserves the full
   proposal lifecycle (create -> vote -> queue -> execute) without depending on abandoned code.

2. **Vipers inline replacement**: Every vipers macro call (~75 total) was replaced with
   Anchor 0.30 native equivalents. New error variants (KeyMismatch, MathOverflow, etc.)
   were added to each program's ErrorCode enum. This is a complete removal, not a shim.

3. **IDL regeneration**: Anchor 0.30 generates different IDL format than 0.22. All 4 IDLs
   were regenerated and TypeScript wrappers created with backward-compatible type aliases
   so the SDK API surface remains unchanged.

4. **@saberhq/solana-contrib and @gokiprotocol/client retained in SDK wrappers**: While
   the core type system was migrated, the wrapper layer still references these for
   TransactionEnvelope and SmartWalletWrapper. Full removal is a future story (S08+).

## What Was Dead, What's Alive

| Component               | Before (2022)                    | After (2026)                                  |
| ----------------------- | -------------------------------- | --------------------------------------------- |
| `anchor build`          | Fails (yanked crate, 50+ errors) | All 4 programs build                          |
| Rust toolchain          | Requires Rust ~1.60 (EOL)        | Works on Rust 1.80+                           |
| Vipers dependency       | Abandoned (Saber shutdown)       | Removed, inlined                              |
| Smart-wallet dependency | Abandoned (Goki shutdown)        | Local stub crate                              |
| Anchor version          | 0.22 (yanked from crates.io)     | 0.30.1                                        |
| IDL generation          | Old format, broken               | Regenerated for 0.30                          |
| TypeScript SDK          | @saberhq/\* (all abandoned)      | @coral-xyz/anchor                             |
| Unit tests              | Cannot run                       | Govern proptests pass, 9 SDK smoke tests pass |
| Demo                    | None                             | Full governor + proposal lifecycle script     |

## References

- [Original Tribeca Repo](https://github.com/TribecaHQ/tribeca)
- [Anchor 0.30 Migration Guide](https://www.anchor-lang.com/docs/migration-guide)
- [Goki Smart Wallet Source](https://github.com/GokiProtocol/goki) (archived)
- [Vipers Source](https://github.com/saber-hq/vipers) (archived)
- [Solana Graveyard Hackathon](https://solana.com/graveyard-hack)
