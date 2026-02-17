import type { BN } from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { GokiSDK } from "@gokiprotocol/client";
import type { AugmentedProvider, Provider } from "@saberhq/solana-contrib";
import {
  SolanaAugmentedProvider,
  TransactionEnvelope,
} from "@saberhq/solana-contrib";
import type { PublicKey, Signer } from "@solana/web3.js";
import { Keypair, SystemProgram } from "@solana/web3.js";

import type { TribecaPrograms } from "./constants";
import {
  DEFAULT_LOCKER_PARAMS,
  TRIBECA_ADDRESSES,
  TRIBECA_IDLS,
} from "./constants";
import type { LockerParams } from "./programs/lockedVoter";
import type { CreateLockerParams } from "./wrappers";
import { createLocker, GovernWrapper } from "./wrappers";
import { findLockerAddress } from "./wrappers/lockedVoter/pda";
import { findSimpleElectorateAddress } from "./wrappers/simpleVoter/pda";
import type { PendingElectorate } from "./wrappers/simpleVoter/types";

/**
 * Helper to construct program instances from IDLs and addresses.
 *
 * The `any` casts are necessary because @coral-xyz/anchor 0.30+ changed
 * the Program constructor signature and we bridge legacy IDL types.
 */
/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any */
function makeProgramMap(provider: Provider): TribecaPrograms {
  const mkProgram = (idl: unknown, address: unknown) =>
    new Program(idl as any, address as any, provider as any) as any;
  return {
    SimpleVoter: mkProgram(
      TRIBECA_IDLS.SimpleVoter,
      TRIBECA_ADDRESSES.SimpleVoter
    ),
    Govern: mkProgram(TRIBECA_IDLS.Govern, TRIBECA_ADDRESSES.Govern),
    LockedVoter: mkProgram(
      TRIBECA_IDLS.LockedVoter,
      TRIBECA_ADDRESSES.LockedVoter
    ),
  };
}
/* eslint-enable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any */

/**
 * Tribeca protocol SDK.
 */
export class TribecaSDK {
  /**
   * The Goki SDK.
   */
  readonly goki: GokiSDK;

  constructor(
    /**
     * Provider.
     */
    readonly provider: AugmentedProvider,
    /**
     * Programs.
     */
    readonly programs: TribecaPrograms
  ) {
    this.goki = GokiSDK.load({ provider });
  }

  /**
   * Creates a new instance of the SDK with the given keypair.
   */
  withSigner(signer: Signer): TribecaSDK {
    return TribecaSDK.load({
      provider: this.provider.withSigner(signer),
    });
  }

  /**
   * Loads the SDK.
   * @returns
   */
  static load({ provider }: { provider: Provider }): TribecaSDK {
    const programs = makeProgramMap(provider);
    return new TribecaSDK(new SolanaAugmentedProvider(provider), programs);
  }

  /**
   * Govern program helpers.
   */
  get govern(): GovernWrapper {
    return new GovernWrapper(this);
  }

  /**
   * Creates a new simple electorate.
   * @returns
   */
  async createSimpleElectorate({
    proposalThreshold,
    governor,
    govTokenMint,
    baseKP = Keypair.generate(),
  }: {
    proposalThreshold: BN;
    baseKP?: Signer;
    governor: PublicKey;
    govTokenMint: PublicKey;
  }): Promise<PendingElectorate> {
    const [electorate, bump] = await findSimpleElectorateAddress(
      baseKP.publicKey
    );
    return {
      electorate,
      tx: new TransactionEnvelope(
        this.provider,
        [
          this.programs.SimpleVoter.instruction.initialize_electorate(
            bump,
            proposalThreshold,
            {
              accounts: {
                base: baseKP.publicKey,
                governor,
                electorate,
                gov_token_mint: govTokenMint,
                payer: this.provider.wallet.publicKey,
                system_program: SystemProgram.programId,
              },
            }
          ),
        ],
        [baseKP]
      ),
    };
  }

  /**
   * Creates a new Locker and Governor.
   * @param params
   * @returns
   */
  async createLockerAndGovernor(params: Omit<CreateLockerParams, "sdk">) {
    return await createLocker({ ...params, sdk: this });
  }

  /**
   * Creates a Locker, which is an Electorate that supports vote locking.
   * @returns
   */
  async createLocker({
    governor,
    govTokenMint,
    baseKP = Keypair.generate(),
    ...providedLockerParams
  }: {
    baseKP?: Signer;
    governor: PublicKey;
    govTokenMint: PublicKey;
  } & Partial<LockerParams>): Promise<{
    locker: PublicKey;
    tx: TransactionEnvelope;
  }> {
    const [locker, bump] = await findLockerAddress(baseKP.publicKey);
    const lockerParams = {
      ...DEFAULT_LOCKER_PARAMS,
      ...providedLockerParams,
    };
    return {
      locker,
      tx: new TransactionEnvelope(
        this.provider,
        [
          this.programs.LockedVoter.instruction.new_locker(bump, lockerParams, {
            accounts: {
              base: baseKP.publicKey,
              governor,
              locker,
              token_mint: govTokenMint,
              payer: this.provider.wallet.publicKey,
              system_program: SystemProgram.programId,
            },
          }),
        ],
        [baseKP]
      ),
    };
  }
}
