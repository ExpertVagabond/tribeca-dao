export type UlockedUvoterIDL =
{
  "address": "LocktDzaV1W2Bm9DeZeiyz4J9zs4fRqNiYqQyracRXw",
  "metadata": {
    "name": "locked_voter",
    "version": "0.5.1",
    "spec": "0.1.0",
    "description": "Voter which locks up governance tokens for a user-provided duration in exchange for increased voting power.",
    "repository": "https://github.com/TribecaHQ/tribeca"
  },
  "docs": [
    "Locked voter program."
  ],
  "instructions": [
    {
      "name": "activate_proposal",
      "docs": [
        "Activates a proposal."
      ],
      "discriminator": [
        90,
        186,
        203,
        234,
        70,
        185,
        191,
        21
      ],
      "accounts": [
        {
          "name": "locker",
          "docs": [
            "The [Locker]."
          ]
        },
        {
          "name": "governor",
          "docs": [
            "The [Governor]."
          ]
        },
        {
          "name": "proposal",
          "docs": [
            "The [Proposal]."
          ],
          "writable": true
        },
        {
          "name": "escrow",
          "docs": [
            "The user's [Escrow]."
          ]
        },
        {
          "name": "escrow_owner",
          "docs": [
            "The [Escrow]'s owner."
          ],
          "signer": true
        },
        {
          "name": "govern_program",
          "docs": [
            "The [govern] program."
          ],
          "address": "Govz1VyoyLD5BL6CSCxUJLVLsQHRwjfFj1prNsdNg5Jw"
        }
      ],
      "args": []
    },
    {
      "name": "approve_program_lock_privilege",
      "docs": [
        "Creates a new [LockerWhitelistEntry] to whitelist program from CPI."
      ],
      "discriminator": [
        75,
        202,
        1,
        4,
        122,
        110,
        102,
        148
      ],
      "accounts": [
        {
          "name": "locker",
          "docs": [
            "The [Locker]."
          ]
        },
        {
          "name": "whitelist_entry",
          "docs": [
            "[LockerWhitelistEntry]."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  76,
                  111,
                  99,
                  107,
                  101,
                  114,
                  87,
                  104,
                  105,
                  116,
                  101,
                  108,
                  105,
                  115,
                  116,
                  69,
                  110,
                  116,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "locker"
              },
              {
                "kind": "account",
                "path": "executable_id"
              },
              {
                "kind": "account",
                "path": "whitelisted_owner"
              }
            ]
          }
        },
        {
          "name": "governor",
          "docs": [
            "Governor for the [Locker]."
          ]
        },
        {
          "name": "smart_wallet",
          "docs": [
            "Smart wallet on the [Governor]."
          ],
          "signer": true
        },
        {
          "name": "executable_id"
        },
        {
          "name": "whitelisted_owner"
        },
        {
          "name": "payer",
          "docs": [
            "Payer of the initialization."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "system_program",
          "docs": [
            "System program."
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "_bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "cast_vote",
      "docs": [
        "Casts a vote."
      ],
      "discriminator": [
        20,
        212,
        15,
        189,
        69,
        180,
        69,
        151
      ],
      "accounts": [
        {
          "name": "locker",
          "docs": [
            "The [Locker]."
          ]
        },
        {
          "name": "escrow",
          "docs": [
            "The [Escrow] that is voting."
          ]
        },
        {
          "name": "vote_delegate",
          "docs": [
            "Vote delegate of the [Escrow]."
          ],
          "signer": true
        },
        {
          "name": "proposal",
          "docs": [
            "The [Proposal] being voted on."
          ],
          "writable": true
        },
        {
          "name": "vote",
          "docs": [
            "The [Vote]."
          ],
          "writable": true
        },
        {
          "name": "governor",
          "docs": [
            "The [Governor]."
          ]
        },
        {
          "name": "govern_program",
          "docs": [
            "The [govern] program."
          ],
          "address": "Govz1VyoyLD5BL6CSCxUJLVLsQHRwjfFj1prNsdNg5Jw"
        }
      ],
      "args": [
        {
          "name": "side",
          "type": "u8"
        }
      ]
    },
    {
      "name": "exit",
      "docs": [
        "Exits the DAO; i.e., withdraws all staked tokens in an [Escrow] if the [Escrow] is unlocked."
      ],
      "discriminator": [
        234,
        32,
        12,
        71,
        126,
        5,
        219,
        160
      ],
      "accounts": [
        {
          "name": "locker",
          "docs": [
            "The [Locker] being exited from."
          ],
          "writable": true
        },
        {
          "name": "escrow",
          "docs": [
            "The [Escrow] that is being closed."
          ],
          "writable": true
        },
        {
          "name": "escrow_owner",
          "docs": [
            "Authority of the [Escrow]."
          ],
          "signer": true
        },
        {
          "name": "escrow_tokens",
          "docs": [
            "Tokens locked up in the [Escrow]."
          ],
          "writable": true
        },
        {
          "name": "destination_tokens",
          "docs": [
            "Destination for the tokens to unlock."
          ],
          "writable": true
        },
        {
          "name": "payer",
          "docs": [
            "The payer to receive the rent refund."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "token_program",
          "docs": [
            "Token program."
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": []
    },
    {
      "name": "lock",
      "docs": [
        "Stakes `amount` tokens into the [Escrow]."
      ],
      "discriminator": [
        21,
        19,
        208,
        43,
        237,
        62,
        255,
        87
      ],
      "accounts": [
        {
          "name": "locker",
          "docs": [
            "[Locker]."
          ],
          "writable": true
        },
        {
          "name": "escrow",
          "docs": [
            "[Escrow]."
          ],
          "writable": true
        },
        {
          "name": "escrow_tokens",
          "docs": [
            "Token account held by the [Escrow]."
          ],
          "writable": true
        },
        {
          "name": "escrow_owner",
          "docs": [
            "Authority of the [Escrow] and [Self::source_tokens]."
          ],
          "signer": true
        },
        {
          "name": "source_tokens",
          "docs": [
            "The source of deposited tokens."
          ],
          "writable": true
        },
        {
          "name": "token_program",
          "docs": [
            "Token program."
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "duration",
          "type": "i64"
        }
      ]
    },
    {
      "name": "new_escrow",
      "docs": [
        "Creates a new [Escrow] for an account.",
        "",
        "A Vote Escrow, or [Escrow] for short, is an agreement between an account (known as the `authority`) and the DAO to",
        "lock up tokens for a specific period of time, in exchange for voting rights",
        "linearly proportional to the amount of votes given."
      ],
      "discriminator": [
        216,
        182,
        143,
        11,
        220,
        38,
        86,
        185
      ],
      "accounts": [
        {
          "name": "locker",
          "docs": [
            "[Locker]."
          ]
        },
        {
          "name": "escrow",
          "docs": [
            "[Escrow]."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  69,
                  115,
                  99,
                  114,
                  111,
                  119
                ]
              },
              {
                "kind": "account",
                "path": "locker"
              },
              {
                "kind": "account",
                "path": "escrow_owner"
              }
            ]
          }
        },
        {
          "name": "escrow_owner"
        },
        {
          "name": "payer",
          "docs": [
            "Payer of the initialization."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "system_program",
          "docs": [
            "System program."
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "_bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "new_locker",
      "docs": [
        "Creates a new [Locker]."
      ],
      "discriminator": [
        177,
        133,
        32,
        90,
        229,
        216,
        131,
        47
      ],
      "accounts": [
        {
          "name": "base",
          "docs": [
            "Base."
          ],
          "signer": true
        },
        {
          "name": "locker",
          "docs": [
            "[Locker]."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  76,
                  111,
                  99,
                  107,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "base"
              }
            ]
          }
        },
        {
          "name": "token_mint",
          "docs": [
            "Mint of the token that can be used to join the [Locker]."
          ]
        },
        {
          "name": "governor",
          "docs": [
            "[Governor] associated with the [Locker]."
          ]
        },
        {
          "name": "payer",
          "docs": [
            "Payer of the initialization."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "system_program",
          "docs": [
            "System program."
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "_bump",
          "type": "u8"
        },
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "LockerParams"
            }
          }
        }
      ]
    },
    {
      "name": "revoke_program_lock_privilege",
      "docs": [
        "Close a [LockerWhitelistEntry] revoking program's CPI privilege."
      ],
      "discriminator": [
        170,
        151,
        7,
        88,
        194,
        86,
        245,
        112
      ],
      "accounts": [
        {
          "name": "locker",
          "docs": [
            "The [Locker]."
          ]
        },
        {
          "name": "whitelist_entry",
          "docs": [
            "[LockerWhitelistEntry]."
          ],
          "writable": true
        },
        {
          "name": "governor",
          "docs": [
            "Governor for the [Locker]."
          ]
        },
        {
          "name": "smart_wallet",
          "docs": [
            "Smart wallet on the [Governor]."
          ],
          "signer": true
        },
        {
          "name": "executable_id"
        },
        {
          "name": "payer",
          "docs": [
            "Payer of the initialization."
          ],
          "writable": true,
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "set_locker_params",
      "docs": [
        "Set locker params."
      ],
      "discriminator": [
        106,
        39,
        132,
        84,
        254,
        77,
        161,
        169
      ],
      "accounts": [
        {
          "name": "locker",
          "docs": [
            "The [Locker]."
          ],
          "writable": true
        },
        {
          "name": "governor",
          "docs": [
            "The [Governor]."
          ]
        },
        {
          "name": "smart_wallet",
          "docs": [
            "The smart wallet on the [Governor]."
          ],
          "signer": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "LockerParams"
            }
          }
        }
      ]
    },
    {
      "name": "set_vote_delegate",
      "docs": [
        "Delegate escrow vote."
      ],
      "discriminator": [
        46,
        236,
        241,
        243,
        251,
        108,
        156,
        12
      ],
      "accounts": [
        {
          "name": "escrow",
          "docs": [
            "The [Escrow]."
          ],
          "writable": true
        },
        {
          "name": "escrow_owner",
          "docs": [
            "The owner of the [Escrow]."
          ],
          "signer": true
        }
      ],
      "args": [
        {
          "name": "new_delegate",
          "type": "pubkey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "Escrow",
      "discriminator": [
        31,
        213,
        123,
        187,
        186,
        22,
        218,
        155
      ]
    },
    {
      "name": "Governor",
      "discriminator": [
        37,
        136,
        44,
        80,
        68,
        85,
        213,
        178
      ]
    },
    {
      "name": "Locker",
      "discriminator": [
        74,
        246,
        6,
        113,
        249,
        228,
        75,
        169
      ]
    },
    {
      "name": "LockerWhitelistEntry",
      "discriminator": [
        128,
        245,
        238,
        138,
        226,
        48,
        216,
        63
      ]
    },
    {
      "name": "Proposal",
      "discriminator": [
        26,
        94,
        189,
        187,
        116,
        136,
        53,
        33
      ]
    },
    {
      "name": "Vote",
      "discriminator": [
        96,
        91,
        104,
        57,
        145,
        35,
        172,
        155
      ]
    }
  ],
  "events": [
    {
      "name": "ApproveLockPrivilegeEvent",
      "discriminator": [
        240,
        224,
        137,
        61,
        143,
        200,
        225,
        110
      ]
    },
    {
      "name": "ExitEscrowEvent",
      "discriminator": [
        218,
        91,
        68,
        189,
        102,
        152,
        212,
        166
      ]
    },
    {
      "name": "LockEvent",
      "discriminator": [
        76,
        37,
        6,
        186,
        14,
        42,
        253,
        15
      ]
    },
    {
      "name": "LockerSetParamsEvent",
      "discriminator": [
        239,
        24,
        209,
        234,
        210,
        143,
        7,
        202
      ]
    },
    {
      "name": "NewEscrowEvent",
      "discriminator": [
        96,
        82,
        181,
        204,
        84,
        177,
        72,
        141
      ]
    },
    {
      "name": "NewLockerEvent",
      "discriminator": [
        149,
        31,
        207,
        106,
        172,
        155,
        65,
        110
      ]
    },
    {
      "name": "RevokeLockPrivilegeEvent",
      "discriminator": [
        53,
        15,
        178,
        80,
        153,
        198,
        65,
        145
      ]
    },
    {
      "name": "SetVoteDelegateEvent",
      "discriminator": [
        165,
        160,
        157,
        241,
        121,
        34,
        54,
        8
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "ProgramNotWhitelisted",
      "msg": "CPI caller not whitelisted to invoke lock instruction."
    },
    {
      "code": 6001,
      "name": "LockupDurationTooShort",
      "msg": "Lockup duration must at least be the min stake duration."
    },
    {
      "code": 6002,
      "name": "LockupDurationTooLong",
      "msg": "Lockup duration must at most be the max stake duration."
    },
    {
      "code": 6003,
      "name": "RefreshCannotShorten",
      "msg": "A voting escrow refresh cannot shorten the escrow time remaining."
    },
    {
      "code": 6004,
      "name": "EscrowNotEnded",
      "msg": "Escrow has not ended."
    },
    {
      "code": 6005,
      "name": "MustProvideWhitelist",
      "msg": "Program whitelist enabled; please provide whitelist entry and instructions sysvar"
    },
    {
      "code": 6006,
      "name": "EscrowOwnerNotWhitelisted",
      "msg": "CPI caller not whitelisted for escrow owner to invoke lock instruction."
    },
    {
      "code": 6007,
      "name": "KeyMismatch",
      "msg": "Key mismatch."
    },
    {
      "code": 6008,
      "name": "MathOverflow",
      "msg": "Math overflow."
    },
    {
      "code": 6009,
      "name": "InvariantFailed",
      "msg": "Invariant failed."
    },
    {
      "code": 6010,
      "name": "UnexpectedNone",
      "msg": "Unexpected None value."
    }
  ],
  "types": [
    {
      "name": "ApproveLockPrivilegeEvent",
      "docs": [
        "Event called in [locked_voter::approve_program_lock_privilege]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "locker",
            "docs": [
              "The [Locker]."
            ],
            "type": "pubkey"
          },
          {
            "name": "program_id",
            "docs": [
              "ProgramId approved to make CPI calls to [locked_voter::lock]."
            ],
            "type": "pubkey"
          },
          {
            "name": "owner",
            "docs": [
              "Owner of the [Escrow]."
            ],
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "docs": [
              "Timestamp of the event."
            ],
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "Escrow",
      "docs": [
        "Locks tokens on behalf of a user."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "locker",
            "docs": [
              "The [Locker] that this [Escrow] is part of."
            ],
            "type": "pubkey"
          },
          {
            "name": "owner",
            "docs": [
              "The key of the account that is authorized to stake into/withdraw from this [Escrow]."
            ],
            "type": "pubkey"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed."
            ],
            "type": "u8"
          },
          {
            "name": "tokens",
            "docs": [
              "The token account holding the escrow tokens."
            ],
            "type": "pubkey"
          },
          {
            "name": "amount",
            "docs": [
              "Amount of tokens staked."
            ],
            "type": "u64"
          },
          {
            "name": "escrow_started_at",
            "docs": [
              "When the [Escrow::owner] started their escrow."
            ],
            "type": "i64"
          },
          {
            "name": "escrow_ends_at",
            "docs": [
              "When the escrow unlocks; i.e. the [Escrow::owner] is scheduled to be allowed to withdraw their tokens."
            ],
            "type": "i64"
          },
          {
            "name": "vote_delegate",
            "docs": [
              "Account that is authorized to vote on behalf of this [Escrow].",
              "Defaults to the [Escrow::owner]."
            ],
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "ExitEscrowEvent",
      "docs": [
        "Event called in [locked_voter::exit]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "escrow_owner",
            "docs": [
              "The owner of the [Escrow]."
            ],
            "type": "pubkey"
          },
          {
            "name": "locker",
            "docs": [
              "The locker for the [Escrow]."
            ],
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "docs": [
              "Timestamp for the event."
            ],
            "type": "i64"
          },
          {
            "name": "locker_supply",
            "docs": [
              "The amount of tokens locked inside the [Locker]."
            ],
            "type": "u64"
          },
          {
            "name": "released_amount",
            "docs": [
              "The amount released from the [Escrow]."
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "GovernanceParameters",
      "docs": [
        "Governance parameters."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "voting_delay",
            "docs": [
              "The delay before voting on a proposal may take place, once proposed, in seconds"
            ],
            "type": "u64"
          },
          {
            "name": "voting_period",
            "docs": [
              "The duration of voting on a proposal, in seconds"
            ],
            "type": "u64"
          },
          {
            "name": "quorum_votes",
            "docs": [
              "The number of votes in support of a proposal required in order for a quorum to be reached and for a vote to succeed"
            ],
            "type": "u64"
          },
          {
            "name": "timelock_delay_seconds",
            "docs": [
              "The timelock delay of the DAO's created proposals."
            ],
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "Governor",
      "docs": [
        "A Governor is the \"DAO\": it is the account that holds control over important protocol functions,",
        "including treasury, protocol parameters, and more."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "base",
            "docs": [
              "Base."
            ],
            "type": "pubkey"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed"
            ],
            "type": "u8"
          },
          {
            "name": "proposal_count",
            "docs": [
              "The total number of [Proposal]s"
            ],
            "type": "u64"
          },
          {
            "name": "electorate",
            "docs": [
              "The voting body associated with the Governor.",
              "This account is responsible for handling vote proceedings, such as:",
              "- activating proposals",
              "- setting the number of votes per voter"
            ],
            "type": "pubkey"
          },
          {
            "name": "smart_wallet",
            "docs": [
              "The public key of the [smart_wallet::SmartWallet] account.",
              "This smart wallet executes proposals."
            ],
            "type": "pubkey"
          },
          {
            "name": "params",
            "docs": [
              "Governance parameters."
            ],
            "type": {
              "defined": {
                "name": "GovernanceParameters"
              }
            }
          }
        ]
      }
    },
    {
      "name": "LockEvent",
      "docs": [
        "Event called in [locked_voter::lock]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "locker",
            "docs": [
              "The locker of the [Escrow]"
            ],
            "type": "pubkey"
          },
          {
            "name": "escrow_owner",
            "docs": [
              "The owner of the [Escrow]."
            ],
            "type": "pubkey"
          },
          {
            "name": "token_mint",
            "docs": [
              "Mint of the token that for the [Locker]."
            ],
            "type": "pubkey"
          },
          {
            "name": "amount",
            "docs": [
              "Amount of tokens locked."
            ],
            "type": "u64"
          },
          {
            "name": "locker_supply",
            "docs": [
              "Amount of tokens locked inside the [Locker]."
            ],
            "type": "u64"
          },
          {
            "name": "duration",
            "docs": [
              "Duration of lock time."
            ],
            "type": "i64"
          },
          {
            "name": "prev_escrow_ends_at",
            "docs": [
              "The previous timestamp that the [Escrow] ended at."
            ],
            "type": "i64"
          },
          {
            "name": "next_escrow_ends_at",
            "docs": [
              "The new [Escrow] end time."
            ],
            "type": "i64"
          },
          {
            "name": "next_escrow_started_at",
            "docs": [
              "The new [Escrow] start time."
            ],
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "Locker",
      "docs": [
        "A group of [Escrow]s."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "base",
            "docs": [
              "Base account used to generate signer seeds."
            ],
            "type": "pubkey"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed."
            ],
            "type": "u8"
          },
          {
            "name": "token_mint",
            "docs": [
              "Mint of the token that must be locked in the [Locker]."
            ],
            "type": "pubkey"
          },
          {
            "name": "locked_supply",
            "docs": [
              "Total number of tokens locked in [Escrow]s."
            ],
            "type": "u64"
          },
          {
            "name": "governor",
            "docs": [
              "Governor associated with the [Locker]."
            ],
            "type": "pubkey"
          },
          {
            "name": "params",
            "docs": [
              "Mutable parameters of how a [Locker] should behave."
            ],
            "type": {
              "defined": {
                "name": "LockerParams"
              }
            }
          }
        ]
      }
    },
    {
      "name": "LockerParams",
      "docs": [
        "Contains parameters for the [Locker]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "whitelist_enabled",
            "docs": [
              "Whether or not the locking whitelist system is enabled."
            ],
            "type": "bool"
          },
          {
            "name": "max_stake_vote_multiplier",
            "docs": [
              "The weight of a maximum vote lock relative to the total number of tokens locked.",
              "For example, veCRV is 10 because 1 CRV locked for 4 years = 10 veCRV."
            ],
            "type": "u8"
          },
          {
            "name": "min_stake_duration",
            "docs": [
              "Minimum staking duration."
            ],
            "type": "u64"
          },
          {
            "name": "max_stake_duration",
            "docs": [
              "Maximum staking duration."
            ],
            "type": "u64"
          },
          {
            "name": "proposal_activation_min_votes",
            "docs": [
              "Minimum number of votes required to activate a proposal."
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "LockerSetParamsEvent",
      "docs": [
        "Event called in [locked_voter::set_locker_params]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "locker",
            "docs": [
              "The [Locker]."
            ],
            "type": "pubkey"
          },
          {
            "name": "prev_params",
            "docs": [
              "Previous [LockerParams]."
            ],
            "type": {
              "defined": {
                "name": "LockerParams"
              }
            }
          },
          {
            "name": "params",
            "docs": [
              "New [LockerParams]."
            ],
            "type": {
              "defined": {
                "name": "LockerParams"
              }
            }
          }
        ]
      }
    },
    {
      "name": "LockerWhitelistEntry",
      "docs": [
        "An entry in the [Locker]'s whitelist.",
        "",
        "The whitelist controls which programs are allowed to stake tokens into the system."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "docs": [
              "Bump seed."
            ],
            "type": "u8"
          },
          {
            "name": "locker",
            "docs": [
              "[Locker] this whitelist entry belongs to."
            ],
            "type": "pubkey"
          },
          {
            "name": "program_id",
            "docs": [
              "Key of the program_id allowed to call the `lock` CPI."
            ],
            "type": "pubkey"
          },
          {
            "name": "owner",
            "docs": [
              "The account authorized to be the [Escrow::owner] with this CPI.",
              "If set to [anchor_lang::solana_program::system_program::ID],",
              "all accounts are allowed to be the [Escrow::owner]."
            ],
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "NewEscrowEvent",
      "docs": [
        "Event called in [locked_voter::new_escrow]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "escrow",
            "docs": [
              "The [Escrow] being created."
            ],
            "type": "pubkey"
          },
          {
            "name": "escrow_owner",
            "docs": [
              "The owner of the [Escrow]."
            ],
            "type": "pubkey"
          },
          {
            "name": "locker",
            "docs": [
              "The locker for the [Escrow]."
            ],
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "docs": [
              "Timestamp for the event."
            ],
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "NewLockerEvent",
      "docs": [
        "Event called in [locked_voter::new_locker]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "governor",
            "docs": [
              "The governor for the [Locker]."
            ],
            "type": "pubkey"
          },
          {
            "name": "locker",
            "docs": [
              "The [Locker] being created."
            ],
            "type": "pubkey"
          },
          {
            "name": "token_mint",
            "docs": [
              "Mint of the token that can be used to join the [Locker]."
            ],
            "type": "pubkey"
          },
          {
            "name": "params",
            "docs": [
              "New [LockerParams]."
            ],
            "type": {
              "defined": {
                "name": "LockerParams"
              }
            }
          }
        ]
      }
    },
    {
      "name": "Proposal",
      "docs": [
        "A Proposal is a pending transaction that may or may not be executed by the DAO."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "governor",
            "docs": [
              "The public key of the governor."
            ],
            "type": "pubkey"
          },
          {
            "name": "index",
            "docs": [
              "The unique ID of the proposal, auto-incremented."
            ],
            "type": "u64"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed"
            ],
            "type": "u8"
          },
          {
            "name": "proposer",
            "docs": [
              "The public key of the proposer."
            ],
            "type": "pubkey"
          },
          {
            "name": "quorum_votes",
            "docs": [
              "The number of votes in support of a proposal required in order for a quorum to be reached and for a vote to succeed"
            ],
            "type": "u64"
          },
          {
            "name": "for_votes",
            "docs": [
              "Current number of votes in favor of this proposal"
            ],
            "type": "u64"
          },
          {
            "name": "against_votes",
            "docs": [
              "Current number of votes in opposition to this proposal"
            ],
            "type": "u64"
          },
          {
            "name": "abstain_votes",
            "docs": [
              "Current number of votes for abstaining for this proposal"
            ],
            "type": "u64"
          },
          {
            "name": "canceled_at",
            "docs": [
              "The timestamp when the proposal was canceled."
            ],
            "type": "i64"
          },
          {
            "name": "created_at",
            "docs": [
              "The timestamp when the proposal was created."
            ],
            "type": "i64"
          },
          {
            "name": "activated_at",
            "docs": [
              "The timestamp in which the proposal was activated.",
              "This is when voting begins."
            ],
            "type": "i64"
          },
          {
            "name": "voting_ends_at",
            "docs": [
              "The timestamp when voting ends.",
              "This only applies to active proposals."
            ],
            "type": "i64"
          },
          {
            "name": "queued_at",
            "docs": [
              "The timestamp in which the proposal was queued, i.e.",
              "approved for execution on the Smart Wallet."
            ],
            "type": "i64"
          },
          {
            "name": "queued_transaction",
            "docs": [
              "If the transaction was queued, this is the associated Goki Smart Wallet transaction."
            ],
            "type": "pubkey"
          },
          {
            "name": "instructions",
            "docs": [
              "The instructions associated with the proposal."
            ],
            "type": {
              "vec": {
                "defined": {
                  "name": "ProposalInstruction"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "ProposalAccountMeta",
      "docs": [
        "Account metadata used to define Instructions"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pubkey",
            "docs": [
              "An account's public key"
            ],
            "type": "pubkey"
          },
          {
            "name": "is_signer",
            "docs": [
              "True if an Instruction requires a Transaction signature matching `pubkey`."
            ],
            "type": "bool"
          },
          {
            "name": "is_writable",
            "docs": [
              "True if the `pubkey` can be loaded as a read-write account."
            ],
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "ProposalInstruction",
      "docs": [
        "Instruction."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "program_id",
            "docs": [
              "Pubkey of the instruction processor that executes this instruction"
            ],
            "type": "pubkey"
          },
          {
            "name": "keys",
            "docs": [
              "Metadata for what accounts should be passed to the instruction processor"
            ],
            "type": {
              "vec": {
                "defined": {
                  "name": "ProposalAccountMeta"
                }
              }
            }
          },
          {
            "name": "data",
            "docs": [
              "Opaque data passed to the instruction processor"
            ],
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "RevokeLockPrivilegeEvent",
      "docs": [
        "Event called in [locked_voter::revoke_program_lock_privilege]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "locker",
            "docs": [
              "The [Locker]."
            ],
            "type": "pubkey"
          },
          {
            "name": "program_id",
            "docs": [
              "ProgramId approved to make CPI calls to [locked_voter::lock]."
            ],
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "docs": [
              "Timestamp of the event."
            ],
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "SetVoteDelegateEvent",
      "docs": [
        "Event called in [locked_voter::set_vote_delegate]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "escrow_owner",
            "docs": [
              "The owner of the Escrow."
            ],
            "type": "pubkey"
          },
          {
            "name": "old_delegate",
            "docs": [
              "The old escrow delegate."
            ],
            "type": "pubkey"
          },
          {
            "name": "new_delegate",
            "docs": [
              "The new escrow delegate."
            ],
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "Vote",
      "docs": [
        "A [Vote] is a vote made by a `voter` by an `electorate`."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "proposal",
            "docs": [
              "The proposal being voted on."
            ],
            "type": "pubkey"
          },
          {
            "name": "voter",
            "docs": [
              "The voter."
            ],
            "type": "pubkey"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed"
            ],
            "type": "u8"
          },
          {
            "name": "side",
            "docs": [
              "The side of the vote taken."
            ],
            "type": "u8"
          },
          {
            "name": "weight",
            "docs": [
              "The number of votes this vote holds."
            ],
            "type": "u64"
          }
        ]
      }
    }
  ]
};

export const UlockedUvoterJSON: UlockedUvoterIDL =
{
  "address": "LocktDzaV1W2Bm9DeZeiyz4J9zs4fRqNiYqQyracRXw",
  "metadata": {
    "name": "locked_voter",
    "version": "0.5.1",
    "spec": "0.1.0",
    "description": "Voter which locks up governance tokens for a user-provided duration in exchange for increased voting power.",
    "repository": "https://github.com/TribecaHQ/tribeca"
  },
  "docs": [
    "Locked voter program."
  ],
  "instructions": [
    {
      "name": "activate_proposal",
      "docs": [
        "Activates a proposal."
      ],
      "discriminator": [
        90,
        186,
        203,
        234,
        70,
        185,
        191,
        21
      ],
      "accounts": [
        {
          "name": "locker",
          "docs": [
            "The [Locker]."
          ]
        },
        {
          "name": "governor",
          "docs": [
            "The [Governor]."
          ]
        },
        {
          "name": "proposal",
          "docs": [
            "The [Proposal]."
          ],
          "writable": true
        },
        {
          "name": "escrow",
          "docs": [
            "The user's [Escrow]."
          ]
        },
        {
          "name": "escrow_owner",
          "docs": [
            "The [Escrow]'s owner."
          ],
          "signer": true
        },
        {
          "name": "govern_program",
          "docs": [
            "The [govern] program."
          ],
          "address": "Govz1VyoyLD5BL6CSCxUJLVLsQHRwjfFj1prNsdNg5Jw"
        }
      ],
      "args": []
    },
    {
      "name": "approve_program_lock_privilege",
      "docs": [
        "Creates a new [LockerWhitelistEntry] to whitelist program from CPI."
      ],
      "discriminator": [
        75,
        202,
        1,
        4,
        122,
        110,
        102,
        148
      ],
      "accounts": [
        {
          "name": "locker",
          "docs": [
            "The [Locker]."
          ]
        },
        {
          "name": "whitelist_entry",
          "docs": [
            "[LockerWhitelistEntry]."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  76,
                  111,
                  99,
                  107,
                  101,
                  114,
                  87,
                  104,
                  105,
                  116,
                  101,
                  108,
                  105,
                  115,
                  116,
                  69,
                  110,
                  116,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "locker"
              },
              {
                "kind": "account",
                "path": "executable_id"
              },
              {
                "kind": "account",
                "path": "whitelisted_owner"
              }
            ]
          }
        },
        {
          "name": "governor",
          "docs": [
            "Governor for the [Locker]."
          ]
        },
        {
          "name": "smart_wallet",
          "docs": [
            "Smart wallet on the [Governor]."
          ],
          "signer": true
        },
        {
          "name": "executable_id"
        },
        {
          "name": "whitelisted_owner"
        },
        {
          "name": "payer",
          "docs": [
            "Payer of the initialization."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "system_program",
          "docs": [
            "System program."
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "_bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "cast_vote",
      "docs": [
        "Casts a vote."
      ],
      "discriminator": [
        20,
        212,
        15,
        189,
        69,
        180,
        69,
        151
      ],
      "accounts": [
        {
          "name": "locker",
          "docs": [
            "The [Locker]."
          ]
        },
        {
          "name": "escrow",
          "docs": [
            "The [Escrow] that is voting."
          ]
        },
        {
          "name": "vote_delegate",
          "docs": [
            "Vote delegate of the [Escrow]."
          ],
          "signer": true
        },
        {
          "name": "proposal",
          "docs": [
            "The [Proposal] being voted on."
          ],
          "writable": true
        },
        {
          "name": "vote",
          "docs": [
            "The [Vote]."
          ],
          "writable": true
        },
        {
          "name": "governor",
          "docs": [
            "The [Governor]."
          ]
        },
        {
          "name": "govern_program",
          "docs": [
            "The [govern] program."
          ],
          "address": "Govz1VyoyLD5BL6CSCxUJLVLsQHRwjfFj1prNsdNg5Jw"
        }
      ],
      "args": [
        {
          "name": "side",
          "type": "u8"
        }
      ]
    },
    {
      "name": "exit",
      "docs": [
        "Exits the DAO; i.e., withdraws all staked tokens in an [Escrow] if the [Escrow] is unlocked."
      ],
      "discriminator": [
        234,
        32,
        12,
        71,
        126,
        5,
        219,
        160
      ],
      "accounts": [
        {
          "name": "locker",
          "docs": [
            "The [Locker] being exited from."
          ],
          "writable": true
        },
        {
          "name": "escrow",
          "docs": [
            "The [Escrow] that is being closed."
          ],
          "writable": true
        },
        {
          "name": "escrow_owner",
          "docs": [
            "Authority of the [Escrow]."
          ],
          "signer": true
        },
        {
          "name": "escrow_tokens",
          "docs": [
            "Tokens locked up in the [Escrow]."
          ],
          "writable": true
        },
        {
          "name": "destination_tokens",
          "docs": [
            "Destination for the tokens to unlock."
          ],
          "writable": true
        },
        {
          "name": "payer",
          "docs": [
            "The payer to receive the rent refund."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "token_program",
          "docs": [
            "Token program."
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": []
    },
    {
      "name": "lock",
      "docs": [
        "Stakes `amount` tokens into the [Escrow]."
      ],
      "discriminator": [
        21,
        19,
        208,
        43,
        237,
        62,
        255,
        87
      ],
      "accounts": [
        {
          "name": "locker",
          "docs": [
            "[Locker]."
          ],
          "writable": true
        },
        {
          "name": "escrow",
          "docs": [
            "[Escrow]."
          ],
          "writable": true
        },
        {
          "name": "escrow_tokens",
          "docs": [
            "Token account held by the [Escrow]."
          ],
          "writable": true
        },
        {
          "name": "escrow_owner",
          "docs": [
            "Authority of the [Escrow] and [Self::source_tokens]."
          ],
          "signer": true
        },
        {
          "name": "source_tokens",
          "docs": [
            "The source of deposited tokens."
          ],
          "writable": true
        },
        {
          "name": "token_program",
          "docs": [
            "Token program."
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "duration",
          "type": "i64"
        }
      ]
    },
    {
      "name": "new_escrow",
      "docs": [
        "Creates a new [Escrow] for an account.",
        "",
        "A Vote Escrow, or [Escrow] for short, is an agreement between an account (known as the `authority`) and the DAO to",
        "lock up tokens for a specific period of time, in exchange for voting rights",
        "linearly proportional to the amount of votes given."
      ],
      "discriminator": [
        216,
        182,
        143,
        11,
        220,
        38,
        86,
        185
      ],
      "accounts": [
        {
          "name": "locker",
          "docs": [
            "[Locker]."
          ]
        },
        {
          "name": "escrow",
          "docs": [
            "[Escrow]."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  69,
                  115,
                  99,
                  114,
                  111,
                  119
                ]
              },
              {
                "kind": "account",
                "path": "locker"
              },
              {
                "kind": "account",
                "path": "escrow_owner"
              }
            ]
          }
        },
        {
          "name": "escrow_owner"
        },
        {
          "name": "payer",
          "docs": [
            "Payer of the initialization."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "system_program",
          "docs": [
            "System program."
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "_bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "new_locker",
      "docs": [
        "Creates a new [Locker]."
      ],
      "discriminator": [
        177,
        133,
        32,
        90,
        229,
        216,
        131,
        47
      ],
      "accounts": [
        {
          "name": "base",
          "docs": [
            "Base."
          ],
          "signer": true
        },
        {
          "name": "locker",
          "docs": [
            "[Locker]."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  76,
                  111,
                  99,
                  107,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "base"
              }
            ]
          }
        },
        {
          "name": "token_mint",
          "docs": [
            "Mint of the token that can be used to join the [Locker]."
          ]
        },
        {
          "name": "governor",
          "docs": [
            "[Governor] associated with the [Locker]."
          ]
        },
        {
          "name": "payer",
          "docs": [
            "Payer of the initialization."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "system_program",
          "docs": [
            "System program."
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "_bump",
          "type": "u8"
        },
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "LockerParams"
            }
          }
        }
      ]
    },
    {
      "name": "revoke_program_lock_privilege",
      "docs": [
        "Close a [LockerWhitelistEntry] revoking program's CPI privilege."
      ],
      "discriminator": [
        170,
        151,
        7,
        88,
        194,
        86,
        245,
        112
      ],
      "accounts": [
        {
          "name": "locker",
          "docs": [
            "The [Locker]."
          ]
        },
        {
          "name": "whitelist_entry",
          "docs": [
            "[LockerWhitelistEntry]."
          ],
          "writable": true
        },
        {
          "name": "governor",
          "docs": [
            "Governor for the [Locker]."
          ]
        },
        {
          "name": "smart_wallet",
          "docs": [
            "Smart wallet on the [Governor]."
          ],
          "signer": true
        },
        {
          "name": "executable_id"
        },
        {
          "name": "payer",
          "docs": [
            "Payer of the initialization."
          ],
          "writable": true,
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "set_locker_params",
      "docs": [
        "Set locker params."
      ],
      "discriminator": [
        106,
        39,
        132,
        84,
        254,
        77,
        161,
        169
      ],
      "accounts": [
        {
          "name": "locker",
          "docs": [
            "The [Locker]."
          ],
          "writable": true
        },
        {
          "name": "governor",
          "docs": [
            "The [Governor]."
          ]
        },
        {
          "name": "smart_wallet",
          "docs": [
            "The smart wallet on the [Governor]."
          ],
          "signer": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "LockerParams"
            }
          }
        }
      ]
    },
    {
      "name": "set_vote_delegate",
      "docs": [
        "Delegate escrow vote."
      ],
      "discriminator": [
        46,
        236,
        241,
        243,
        251,
        108,
        156,
        12
      ],
      "accounts": [
        {
          "name": "escrow",
          "docs": [
            "The [Escrow]."
          ],
          "writable": true
        },
        {
          "name": "escrow_owner",
          "docs": [
            "The owner of the [Escrow]."
          ],
          "signer": true
        }
      ],
      "args": [
        {
          "name": "new_delegate",
          "type": "pubkey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "Escrow",
      "discriminator": [
        31,
        213,
        123,
        187,
        186,
        22,
        218,
        155
      ]
    },
    {
      "name": "Governor",
      "discriminator": [
        37,
        136,
        44,
        80,
        68,
        85,
        213,
        178
      ]
    },
    {
      "name": "Locker",
      "discriminator": [
        74,
        246,
        6,
        113,
        249,
        228,
        75,
        169
      ]
    },
    {
      "name": "LockerWhitelistEntry",
      "discriminator": [
        128,
        245,
        238,
        138,
        226,
        48,
        216,
        63
      ]
    },
    {
      "name": "Proposal",
      "discriminator": [
        26,
        94,
        189,
        187,
        116,
        136,
        53,
        33
      ]
    },
    {
      "name": "Vote",
      "discriminator": [
        96,
        91,
        104,
        57,
        145,
        35,
        172,
        155
      ]
    }
  ],
  "events": [
    {
      "name": "ApproveLockPrivilegeEvent",
      "discriminator": [
        240,
        224,
        137,
        61,
        143,
        200,
        225,
        110
      ]
    },
    {
      "name": "ExitEscrowEvent",
      "discriminator": [
        218,
        91,
        68,
        189,
        102,
        152,
        212,
        166
      ]
    },
    {
      "name": "LockEvent",
      "discriminator": [
        76,
        37,
        6,
        186,
        14,
        42,
        253,
        15
      ]
    },
    {
      "name": "LockerSetParamsEvent",
      "discriminator": [
        239,
        24,
        209,
        234,
        210,
        143,
        7,
        202
      ]
    },
    {
      "name": "NewEscrowEvent",
      "discriminator": [
        96,
        82,
        181,
        204,
        84,
        177,
        72,
        141
      ]
    },
    {
      "name": "NewLockerEvent",
      "discriminator": [
        149,
        31,
        207,
        106,
        172,
        155,
        65,
        110
      ]
    },
    {
      "name": "RevokeLockPrivilegeEvent",
      "discriminator": [
        53,
        15,
        178,
        80,
        153,
        198,
        65,
        145
      ]
    },
    {
      "name": "SetVoteDelegateEvent",
      "discriminator": [
        165,
        160,
        157,
        241,
        121,
        34,
        54,
        8
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "ProgramNotWhitelisted",
      "msg": "CPI caller not whitelisted to invoke lock instruction."
    },
    {
      "code": 6001,
      "name": "LockupDurationTooShort",
      "msg": "Lockup duration must at least be the min stake duration."
    },
    {
      "code": 6002,
      "name": "LockupDurationTooLong",
      "msg": "Lockup duration must at most be the max stake duration."
    },
    {
      "code": 6003,
      "name": "RefreshCannotShorten",
      "msg": "A voting escrow refresh cannot shorten the escrow time remaining."
    },
    {
      "code": 6004,
      "name": "EscrowNotEnded",
      "msg": "Escrow has not ended."
    },
    {
      "code": 6005,
      "name": "MustProvideWhitelist",
      "msg": "Program whitelist enabled; please provide whitelist entry and instructions sysvar"
    },
    {
      "code": 6006,
      "name": "EscrowOwnerNotWhitelisted",
      "msg": "CPI caller not whitelisted for escrow owner to invoke lock instruction."
    },
    {
      "code": 6007,
      "name": "KeyMismatch",
      "msg": "Key mismatch."
    },
    {
      "code": 6008,
      "name": "MathOverflow",
      "msg": "Math overflow."
    },
    {
      "code": 6009,
      "name": "InvariantFailed",
      "msg": "Invariant failed."
    },
    {
      "code": 6010,
      "name": "UnexpectedNone",
      "msg": "Unexpected None value."
    }
  ],
  "types": [
    {
      "name": "ApproveLockPrivilegeEvent",
      "docs": [
        "Event called in [locked_voter::approve_program_lock_privilege]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "locker",
            "docs": [
              "The [Locker]."
            ],
            "type": "pubkey"
          },
          {
            "name": "program_id",
            "docs": [
              "ProgramId approved to make CPI calls to [locked_voter::lock]."
            ],
            "type": "pubkey"
          },
          {
            "name": "owner",
            "docs": [
              "Owner of the [Escrow]."
            ],
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "docs": [
              "Timestamp of the event."
            ],
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "Escrow",
      "docs": [
        "Locks tokens on behalf of a user."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "locker",
            "docs": [
              "The [Locker] that this [Escrow] is part of."
            ],
            "type": "pubkey"
          },
          {
            "name": "owner",
            "docs": [
              "The key of the account that is authorized to stake into/withdraw from this [Escrow]."
            ],
            "type": "pubkey"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed."
            ],
            "type": "u8"
          },
          {
            "name": "tokens",
            "docs": [
              "The token account holding the escrow tokens."
            ],
            "type": "pubkey"
          },
          {
            "name": "amount",
            "docs": [
              "Amount of tokens staked."
            ],
            "type": "u64"
          },
          {
            "name": "escrow_started_at",
            "docs": [
              "When the [Escrow::owner] started their escrow."
            ],
            "type": "i64"
          },
          {
            "name": "escrow_ends_at",
            "docs": [
              "When the escrow unlocks; i.e. the [Escrow::owner] is scheduled to be allowed to withdraw their tokens."
            ],
            "type": "i64"
          },
          {
            "name": "vote_delegate",
            "docs": [
              "Account that is authorized to vote on behalf of this [Escrow].",
              "Defaults to the [Escrow::owner]."
            ],
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "ExitEscrowEvent",
      "docs": [
        "Event called in [locked_voter::exit]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "escrow_owner",
            "docs": [
              "The owner of the [Escrow]."
            ],
            "type": "pubkey"
          },
          {
            "name": "locker",
            "docs": [
              "The locker for the [Escrow]."
            ],
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "docs": [
              "Timestamp for the event."
            ],
            "type": "i64"
          },
          {
            "name": "locker_supply",
            "docs": [
              "The amount of tokens locked inside the [Locker]."
            ],
            "type": "u64"
          },
          {
            "name": "released_amount",
            "docs": [
              "The amount released from the [Escrow]."
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "GovernanceParameters",
      "docs": [
        "Governance parameters."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "voting_delay",
            "docs": [
              "The delay before voting on a proposal may take place, once proposed, in seconds"
            ],
            "type": "u64"
          },
          {
            "name": "voting_period",
            "docs": [
              "The duration of voting on a proposal, in seconds"
            ],
            "type": "u64"
          },
          {
            "name": "quorum_votes",
            "docs": [
              "The number of votes in support of a proposal required in order for a quorum to be reached and for a vote to succeed"
            ],
            "type": "u64"
          },
          {
            "name": "timelock_delay_seconds",
            "docs": [
              "The timelock delay of the DAO's created proposals."
            ],
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "Governor",
      "docs": [
        "A Governor is the \"DAO\": it is the account that holds control over important protocol functions,",
        "including treasury, protocol parameters, and more."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "base",
            "docs": [
              "Base."
            ],
            "type": "pubkey"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed"
            ],
            "type": "u8"
          },
          {
            "name": "proposal_count",
            "docs": [
              "The total number of [Proposal]s"
            ],
            "type": "u64"
          },
          {
            "name": "electorate",
            "docs": [
              "The voting body associated with the Governor.",
              "This account is responsible for handling vote proceedings, such as:",
              "- activating proposals",
              "- setting the number of votes per voter"
            ],
            "type": "pubkey"
          },
          {
            "name": "smart_wallet",
            "docs": [
              "The public key of the [smart_wallet::SmartWallet] account.",
              "This smart wallet executes proposals."
            ],
            "type": "pubkey"
          },
          {
            "name": "params",
            "docs": [
              "Governance parameters."
            ],
            "type": {
              "defined": {
                "name": "GovernanceParameters"
              }
            }
          }
        ]
      }
    },
    {
      "name": "LockEvent",
      "docs": [
        "Event called in [locked_voter::lock]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "locker",
            "docs": [
              "The locker of the [Escrow]"
            ],
            "type": "pubkey"
          },
          {
            "name": "escrow_owner",
            "docs": [
              "The owner of the [Escrow]."
            ],
            "type": "pubkey"
          },
          {
            "name": "token_mint",
            "docs": [
              "Mint of the token that for the [Locker]."
            ],
            "type": "pubkey"
          },
          {
            "name": "amount",
            "docs": [
              "Amount of tokens locked."
            ],
            "type": "u64"
          },
          {
            "name": "locker_supply",
            "docs": [
              "Amount of tokens locked inside the [Locker]."
            ],
            "type": "u64"
          },
          {
            "name": "duration",
            "docs": [
              "Duration of lock time."
            ],
            "type": "i64"
          },
          {
            "name": "prev_escrow_ends_at",
            "docs": [
              "The previous timestamp that the [Escrow] ended at."
            ],
            "type": "i64"
          },
          {
            "name": "next_escrow_ends_at",
            "docs": [
              "The new [Escrow] end time."
            ],
            "type": "i64"
          },
          {
            "name": "next_escrow_started_at",
            "docs": [
              "The new [Escrow] start time."
            ],
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "Locker",
      "docs": [
        "A group of [Escrow]s."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "base",
            "docs": [
              "Base account used to generate signer seeds."
            ],
            "type": "pubkey"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed."
            ],
            "type": "u8"
          },
          {
            "name": "token_mint",
            "docs": [
              "Mint of the token that must be locked in the [Locker]."
            ],
            "type": "pubkey"
          },
          {
            "name": "locked_supply",
            "docs": [
              "Total number of tokens locked in [Escrow]s."
            ],
            "type": "u64"
          },
          {
            "name": "governor",
            "docs": [
              "Governor associated with the [Locker]."
            ],
            "type": "pubkey"
          },
          {
            "name": "params",
            "docs": [
              "Mutable parameters of how a [Locker] should behave."
            ],
            "type": {
              "defined": {
                "name": "LockerParams"
              }
            }
          }
        ]
      }
    },
    {
      "name": "LockerParams",
      "docs": [
        "Contains parameters for the [Locker]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "whitelist_enabled",
            "docs": [
              "Whether or not the locking whitelist system is enabled."
            ],
            "type": "bool"
          },
          {
            "name": "max_stake_vote_multiplier",
            "docs": [
              "The weight of a maximum vote lock relative to the total number of tokens locked.",
              "For example, veCRV is 10 because 1 CRV locked for 4 years = 10 veCRV."
            ],
            "type": "u8"
          },
          {
            "name": "min_stake_duration",
            "docs": [
              "Minimum staking duration."
            ],
            "type": "u64"
          },
          {
            "name": "max_stake_duration",
            "docs": [
              "Maximum staking duration."
            ],
            "type": "u64"
          },
          {
            "name": "proposal_activation_min_votes",
            "docs": [
              "Minimum number of votes required to activate a proposal."
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "LockerSetParamsEvent",
      "docs": [
        "Event called in [locked_voter::set_locker_params]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "locker",
            "docs": [
              "The [Locker]."
            ],
            "type": "pubkey"
          },
          {
            "name": "prev_params",
            "docs": [
              "Previous [LockerParams]."
            ],
            "type": {
              "defined": {
                "name": "LockerParams"
              }
            }
          },
          {
            "name": "params",
            "docs": [
              "New [LockerParams]."
            ],
            "type": {
              "defined": {
                "name": "LockerParams"
              }
            }
          }
        ]
      }
    },
    {
      "name": "LockerWhitelistEntry",
      "docs": [
        "An entry in the [Locker]'s whitelist.",
        "",
        "The whitelist controls which programs are allowed to stake tokens into the system."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "docs": [
              "Bump seed."
            ],
            "type": "u8"
          },
          {
            "name": "locker",
            "docs": [
              "[Locker] this whitelist entry belongs to."
            ],
            "type": "pubkey"
          },
          {
            "name": "program_id",
            "docs": [
              "Key of the program_id allowed to call the `lock` CPI."
            ],
            "type": "pubkey"
          },
          {
            "name": "owner",
            "docs": [
              "The account authorized to be the [Escrow::owner] with this CPI.",
              "If set to [anchor_lang::solana_program::system_program::ID],",
              "all accounts are allowed to be the [Escrow::owner]."
            ],
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "NewEscrowEvent",
      "docs": [
        "Event called in [locked_voter::new_escrow]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "escrow",
            "docs": [
              "The [Escrow] being created."
            ],
            "type": "pubkey"
          },
          {
            "name": "escrow_owner",
            "docs": [
              "The owner of the [Escrow]."
            ],
            "type": "pubkey"
          },
          {
            "name": "locker",
            "docs": [
              "The locker for the [Escrow]."
            ],
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "docs": [
              "Timestamp for the event."
            ],
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "NewLockerEvent",
      "docs": [
        "Event called in [locked_voter::new_locker]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "governor",
            "docs": [
              "The governor for the [Locker]."
            ],
            "type": "pubkey"
          },
          {
            "name": "locker",
            "docs": [
              "The [Locker] being created."
            ],
            "type": "pubkey"
          },
          {
            "name": "token_mint",
            "docs": [
              "Mint of the token that can be used to join the [Locker]."
            ],
            "type": "pubkey"
          },
          {
            "name": "params",
            "docs": [
              "New [LockerParams]."
            ],
            "type": {
              "defined": {
                "name": "LockerParams"
              }
            }
          }
        ]
      }
    },
    {
      "name": "Proposal",
      "docs": [
        "A Proposal is a pending transaction that may or may not be executed by the DAO."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "governor",
            "docs": [
              "The public key of the governor."
            ],
            "type": "pubkey"
          },
          {
            "name": "index",
            "docs": [
              "The unique ID of the proposal, auto-incremented."
            ],
            "type": "u64"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed"
            ],
            "type": "u8"
          },
          {
            "name": "proposer",
            "docs": [
              "The public key of the proposer."
            ],
            "type": "pubkey"
          },
          {
            "name": "quorum_votes",
            "docs": [
              "The number of votes in support of a proposal required in order for a quorum to be reached and for a vote to succeed"
            ],
            "type": "u64"
          },
          {
            "name": "for_votes",
            "docs": [
              "Current number of votes in favor of this proposal"
            ],
            "type": "u64"
          },
          {
            "name": "against_votes",
            "docs": [
              "Current number of votes in opposition to this proposal"
            ],
            "type": "u64"
          },
          {
            "name": "abstain_votes",
            "docs": [
              "Current number of votes for abstaining for this proposal"
            ],
            "type": "u64"
          },
          {
            "name": "canceled_at",
            "docs": [
              "The timestamp when the proposal was canceled."
            ],
            "type": "i64"
          },
          {
            "name": "created_at",
            "docs": [
              "The timestamp when the proposal was created."
            ],
            "type": "i64"
          },
          {
            "name": "activated_at",
            "docs": [
              "The timestamp in which the proposal was activated.",
              "This is when voting begins."
            ],
            "type": "i64"
          },
          {
            "name": "voting_ends_at",
            "docs": [
              "The timestamp when voting ends.",
              "This only applies to active proposals."
            ],
            "type": "i64"
          },
          {
            "name": "queued_at",
            "docs": [
              "The timestamp in which the proposal was queued, i.e.",
              "approved for execution on the Smart Wallet."
            ],
            "type": "i64"
          },
          {
            "name": "queued_transaction",
            "docs": [
              "If the transaction was queued, this is the associated Goki Smart Wallet transaction."
            ],
            "type": "pubkey"
          },
          {
            "name": "instructions",
            "docs": [
              "The instructions associated with the proposal."
            ],
            "type": {
              "vec": {
                "defined": {
                  "name": "ProposalInstruction"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "ProposalAccountMeta",
      "docs": [
        "Account metadata used to define Instructions"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pubkey",
            "docs": [
              "An account's public key"
            ],
            "type": "pubkey"
          },
          {
            "name": "is_signer",
            "docs": [
              "True if an Instruction requires a Transaction signature matching `pubkey`."
            ],
            "type": "bool"
          },
          {
            "name": "is_writable",
            "docs": [
              "True if the `pubkey` can be loaded as a read-write account."
            ],
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "ProposalInstruction",
      "docs": [
        "Instruction."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "program_id",
            "docs": [
              "Pubkey of the instruction processor that executes this instruction"
            ],
            "type": "pubkey"
          },
          {
            "name": "keys",
            "docs": [
              "Metadata for what accounts should be passed to the instruction processor"
            ],
            "type": {
              "vec": {
                "defined": {
                  "name": "ProposalAccountMeta"
                }
              }
            }
          },
          {
            "name": "data",
            "docs": [
              "Opaque data passed to the instruction processor"
            ],
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "RevokeLockPrivilegeEvent",
      "docs": [
        "Event called in [locked_voter::revoke_program_lock_privilege]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "locker",
            "docs": [
              "The [Locker]."
            ],
            "type": "pubkey"
          },
          {
            "name": "program_id",
            "docs": [
              "ProgramId approved to make CPI calls to [locked_voter::lock]."
            ],
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "docs": [
              "Timestamp of the event."
            ],
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "SetVoteDelegateEvent",
      "docs": [
        "Event called in [locked_voter::set_vote_delegate]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "escrow_owner",
            "docs": [
              "The owner of the Escrow."
            ],
            "type": "pubkey"
          },
          {
            "name": "old_delegate",
            "docs": [
              "The old escrow delegate."
            ],
            "type": "pubkey"
          },
          {
            "name": "new_delegate",
            "docs": [
              "The new escrow delegate."
            ],
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "Vote",
      "docs": [
        "A [Vote] is a vote made by a `voter` by an `electorate`."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "proposal",
            "docs": [
              "The proposal being voted on."
            ],
            "type": "pubkey"
          },
          {
            "name": "voter",
            "docs": [
              "The voter."
            ],
            "type": "pubkey"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed"
            ],
            "type": "u8"
          },
          {
            "name": "side",
            "docs": [
              "The side of the vote taken."
            ],
            "type": "u8"
          },
          {
            "name": "weight",
            "docs": [
              "The number of votes this vote holds."
            ],
            "type": "u64"
          }
        ]
      }
    }
  ]
};
