export type UsimpleUvoterIDL =
{
  "address": "Tok6iuA69RLN1QrpXgQKnDgE1YYbLzQsZGSoz75fQdz",
  "metadata": {
    "name": "simple_voter",
    "version": "0.5.1",
    "spec": "0.1.0",
    "description": "A simple Tribeca voter program where 1 token = 1 vote.",
    "repository": "https://github.com/TribecaHQ/tribeca"
  },
  "instructions": [
    {
      "name": "activate_proposal",
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
          "name": "electorate"
        },
        {
          "name": "governor"
        },
        {
          "name": "proposal",
          "writable": true
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
      "name": "cast_votes",
      "discriminator": [
        236,
        139,
        5,
        4,
        34,
        33,
        175,
        92
      ],
      "accounts": [
        {
          "name": "electorate",
          "docs": [
            "The [Electorate]."
          ]
        },
        {
          "name": "authority",
          "docs": [
            "TODO(michael): Docs"
          ],
          "signer": true
        },
        {
          "name": "proposal",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true
        },
        {
          "name": "token_record",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true
        },
        {
          "name": "vote",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true
        },
        {
          "name": "tribeca",
          "accounts": [
            {
              "name": "governor",
              "docs": [
                "TODO(michael): Docs"
              ],
              "writable": true
            },
            {
              "name": "program",
              "docs": [
                "TODO(michael): Docs"
              ],
              "address": "Govz1VyoyLD5BL6CSCxUJLVLsQHRwjfFj1prNsdNg5Jw"
            }
          ]
        }
      ],
      "args": [
        {
          "name": "vote_side",
          "type": "u8"
        }
      ]
    },
    {
      "name": "deposit_tokens",
      "discriminator": [
        176,
        83,
        229,
        18,
        191,
        143,
        176,
        150
      ],
      "accounts": [
        {
          "name": "authority",
          "docs": [
            "TODO(michael): Docs"
          ],
          "signer": true
        },
        {
          "name": "token_record",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true
        },
        {
          "name": "gov_token_account",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true
        },
        {
          "name": "gov_token_vault",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true
        },
        {
          "name": "token_program",
          "docs": [
            "TODO(michael): Docs"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "finalize_votes",
      "discriminator": [
        128,
        235,
        61,
        11,
        90,
        13,
        194,
        71
      ],
      "accounts": [
        {
          "name": "authority",
          "docs": [
            "TODO(michael): Docs"
          ],
          "signer": true
        },
        {
          "name": "governor",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true
        },
        {
          "name": "proposal",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true
        },
        {
          "name": "token_record",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "initialize_electorate",
      "discriminator": [
        20,
        206,
        141,
        206,
        43,
        28,
        26,
        253
      ],
      "accounts": [
        {
          "name": "base",
          "docs": [
            "Base used to create the voter."
          ],
          "signer": true
        },
        {
          "name": "electorate",
          "docs": [
            "The electorate."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  83,
                  105,
                  109,
                  112,
                  108,
                  101,
                  69,
                  108,
                  101,
                  99,
                  116,
                  111,
                  114,
                  97,
                  116,
                  101
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
          "name": "governor",
          "docs": [
            "TODO(michael): Docs"
          ]
        },
        {
          "name": "gov_token_mint",
          "docs": [
            "TODO(michael): Docs"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "system_program",
          "docs": [
            "TODO(michael): Docs"
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
          "name": "proposal_threshold",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initialize_token_record",
      "discriminator": [
        124,
        208,
        253,
        165,
        64,
        64,
        56,
        56
      ],
      "accounts": [
        {
          "name": "authority",
          "signer": true
        },
        {
          "name": "token_record",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  83,
                  105,
                  109,
                  112,
                  108,
                  101,
                  84,
                  111,
                  107,
                  101,
                  110,
                  82,
                  101,
                  99,
                  111,
                  114,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              },
              {
                "kind": "account",
                "path": "electorate"
              }
            ]
          }
        },
        {
          "name": "electorate",
          "writable": true
        },
        {
          "name": "gov_token_vault",
          "docs": [
            "TODO(michael): Docs"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "system_program",
          "docs": [
            "TODO(michael): Docs"
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
      "name": "withdraw_tokens",
      "discriminator": [
        2,
        4,
        225,
        61,
        19,
        182,
        106,
        170
      ],
      "accounts": [
        {
          "name": "authority",
          "docs": [
            "TODO(michael): Docs"
          ],
          "signer": true
        },
        {
          "name": "token_record",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true
        },
        {
          "name": "gov_token_account",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true
        },
        {
          "name": "gov_token_vault",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true
        },
        {
          "name": "token_program",
          "docs": [
            "TODO(michael): Docs"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdraw_votes",
      "discriminator": [
        45,
        134,
        77,
        70,
        117,
        71,
        195,
        19
      ],
      "accounts": [
        {
          "name": "electorate",
          "docs": [
            "The [Electorate]."
          ]
        },
        {
          "name": "authority",
          "docs": [
            "TODO(michael): Docs"
          ],
          "signer": true
        },
        {
          "name": "proposal",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true
        },
        {
          "name": "token_record",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true
        },
        {
          "name": "vote",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true
        },
        {
          "name": "tribeca",
          "accounts": [
            {
              "name": "governor",
              "docs": [
                "TODO(michael): Docs"
              ],
              "writable": true
            },
            {
              "name": "program",
              "docs": [
                "TODO(michael): Docs"
              ],
              "address": "Govz1VyoyLD5BL6CSCxUJLVLsQHRwjfFj1prNsdNg5Jw"
            }
          ]
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "Electorate",
      "discriminator": [
        173,
        236,
        129,
        162,
        143,
        163,
        191,
        88
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
      "name": "TokenRecord",
      "discriminator": [
        27,
        187,
        32,
        100,
        137,
        253,
        104,
        242
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
  "errors": [
    {
      "code": 6000,
      "name": "BelowProposingThreshold",
      "msg": "Below proposing threshold."
    },
    {
      "code": 6001,
      "name": "KeyMismatch",
      "msg": "Key mismatch."
    },
    {
      "code": 6002,
      "name": "MathOverflow",
      "msg": "Math overflow."
    },
    {
      "code": 6003,
      "name": "InvariantFailed",
      "msg": "Invariant failed."
    }
  ],
  "types": [
    {
      "name": "Electorate",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "docs": [
              "TODO(michael): Docs"
            ],
            "type": "u8"
          },
          {
            "name": "base",
            "docs": [
              "TODO(michael): Docs"
            ],
            "type": "pubkey"
          },
          {
            "name": "governor",
            "docs": [
              "TODO(michael): Docs"
            ],
            "type": "pubkey"
          },
          {
            "name": "gov_token_mint",
            "docs": [
              "TODO(michael): Docs"
            ],
            "type": "pubkey"
          },
          {
            "name": "proposal_threshold",
            "docs": [
              "The number of votes required in order for a voter to activate a proposal"
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
      "name": "TokenRecord",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "docs": [
              "TODO(michael): Docs"
            ],
            "type": "u8"
          },
          {
            "name": "authority",
            "docs": [
              "TODO(michael): Docs"
            ],
            "type": "pubkey"
          },
          {
            "name": "electorate",
            "docs": [
              "TODO(michael): Docs"
            ],
            "type": "pubkey"
          },
          {
            "name": "token_vault_key",
            "docs": [
              "TODO(michael): Docs"
            ],
            "type": "pubkey"
          },
          {
            "name": "balance",
            "docs": [
              "TODO(michael): Docs"
            ],
            "type": "u64"
          },
          {
            "name": "unfinalized_votes",
            "docs": [
              "TODO(michael): Docs"
            ],
            "type": "u64"
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

export const UsimpleUvoterJSON: UsimpleUvoterIDL =
{
  "address": "Tok6iuA69RLN1QrpXgQKnDgE1YYbLzQsZGSoz75fQdz",
  "metadata": {
    "name": "simple_voter",
    "version": "0.5.1",
    "spec": "0.1.0",
    "description": "A simple Tribeca voter program where 1 token = 1 vote.",
    "repository": "https://github.com/TribecaHQ/tribeca"
  },
  "instructions": [
    {
      "name": "activate_proposal",
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
          "name": "electorate"
        },
        {
          "name": "governor"
        },
        {
          "name": "proposal",
          "writable": true
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
      "name": "cast_votes",
      "discriminator": [
        236,
        139,
        5,
        4,
        34,
        33,
        175,
        92
      ],
      "accounts": [
        {
          "name": "electorate",
          "docs": [
            "The [Electorate]."
          ]
        },
        {
          "name": "authority",
          "docs": [
            "TODO(michael): Docs"
          ],
          "signer": true
        },
        {
          "name": "proposal",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true
        },
        {
          "name": "token_record",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true
        },
        {
          "name": "vote",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true
        },
        {
          "name": "tribeca",
          "accounts": [
            {
              "name": "governor",
              "docs": [
                "TODO(michael): Docs"
              ],
              "writable": true
            },
            {
              "name": "program",
              "docs": [
                "TODO(michael): Docs"
              ],
              "address": "Govz1VyoyLD5BL6CSCxUJLVLsQHRwjfFj1prNsdNg5Jw"
            }
          ]
        }
      ],
      "args": [
        {
          "name": "vote_side",
          "type": "u8"
        }
      ]
    },
    {
      "name": "deposit_tokens",
      "discriminator": [
        176,
        83,
        229,
        18,
        191,
        143,
        176,
        150
      ],
      "accounts": [
        {
          "name": "authority",
          "docs": [
            "TODO(michael): Docs"
          ],
          "signer": true
        },
        {
          "name": "token_record",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true
        },
        {
          "name": "gov_token_account",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true
        },
        {
          "name": "gov_token_vault",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true
        },
        {
          "name": "token_program",
          "docs": [
            "TODO(michael): Docs"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "finalize_votes",
      "discriminator": [
        128,
        235,
        61,
        11,
        90,
        13,
        194,
        71
      ],
      "accounts": [
        {
          "name": "authority",
          "docs": [
            "TODO(michael): Docs"
          ],
          "signer": true
        },
        {
          "name": "governor",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true
        },
        {
          "name": "proposal",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true
        },
        {
          "name": "token_record",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "initialize_electorate",
      "discriminator": [
        20,
        206,
        141,
        206,
        43,
        28,
        26,
        253
      ],
      "accounts": [
        {
          "name": "base",
          "docs": [
            "Base used to create the voter."
          ],
          "signer": true
        },
        {
          "name": "electorate",
          "docs": [
            "The electorate."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  83,
                  105,
                  109,
                  112,
                  108,
                  101,
                  69,
                  108,
                  101,
                  99,
                  116,
                  111,
                  114,
                  97,
                  116,
                  101
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
          "name": "governor",
          "docs": [
            "TODO(michael): Docs"
          ]
        },
        {
          "name": "gov_token_mint",
          "docs": [
            "TODO(michael): Docs"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "system_program",
          "docs": [
            "TODO(michael): Docs"
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
          "name": "proposal_threshold",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initialize_token_record",
      "discriminator": [
        124,
        208,
        253,
        165,
        64,
        64,
        56,
        56
      ],
      "accounts": [
        {
          "name": "authority",
          "signer": true
        },
        {
          "name": "token_record",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  83,
                  105,
                  109,
                  112,
                  108,
                  101,
                  84,
                  111,
                  107,
                  101,
                  110,
                  82,
                  101,
                  99,
                  111,
                  114,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              },
              {
                "kind": "account",
                "path": "electorate"
              }
            ]
          }
        },
        {
          "name": "electorate",
          "writable": true
        },
        {
          "name": "gov_token_vault",
          "docs": [
            "TODO(michael): Docs"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "system_program",
          "docs": [
            "TODO(michael): Docs"
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
      "name": "withdraw_tokens",
      "discriminator": [
        2,
        4,
        225,
        61,
        19,
        182,
        106,
        170
      ],
      "accounts": [
        {
          "name": "authority",
          "docs": [
            "TODO(michael): Docs"
          ],
          "signer": true
        },
        {
          "name": "token_record",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true
        },
        {
          "name": "gov_token_account",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true
        },
        {
          "name": "gov_token_vault",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true
        },
        {
          "name": "token_program",
          "docs": [
            "TODO(michael): Docs"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdraw_votes",
      "discriminator": [
        45,
        134,
        77,
        70,
        117,
        71,
        195,
        19
      ],
      "accounts": [
        {
          "name": "electorate",
          "docs": [
            "The [Electorate]."
          ]
        },
        {
          "name": "authority",
          "docs": [
            "TODO(michael): Docs"
          ],
          "signer": true
        },
        {
          "name": "proposal",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true
        },
        {
          "name": "token_record",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true
        },
        {
          "name": "vote",
          "docs": [
            "TODO(michael): Docs"
          ],
          "writable": true
        },
        {
          "name": "tribeca",
          "accounts": [
            {
              "name": "governor",
              "docs": [
                "TODO(michael): Docs"
              ],
              "writable": true
            },
            {
              "name": "program",
              "docs": [
                "TODO(michael): Docs"
              ],
              "address": "Govz1VyoyLD5BL6CSCxUJLVLsQHRwjfFj1prNsdNg5Jw"
            }
          ]
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "Electorate",
      "discriminator": [
        173,
        236,
        129,
        162,
        143,
        163,
        191,
        88
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
      "name": "TokenRecord",
      "discriminator": [
        27,
        187,
        32,
        100,
        137,
        253,
        104,
        242
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
  "errors": [
    {
      "code": 6000,
      "name": "BelowProposingThreshold",
      "msg": "Below proposing threshold."
    },
    {
      "code": 6001,
      "name": "KeyMismatch",
      "msg": "Key mismatch."
    },
    {
      "code": 6002,
      "name": "MathOverflow",
      "msg": "Math overflow."
    },
    {
      "code": 6003,
      "name": "InvariantFailed",
      "msg": "Invariant failed."
    }
  ],
  "types": [
    {
      "name": "Electorate",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "docs": [
              "TODO(michael): Docs"
            ],
            "type": "u8"
          },
          {
            "name": "base",
            "docs": [
              "TODO(michael): Docs"
            ],
            "type": "pubkey"
          },
          {
            "name": "governor",
            "docs": [
              "TODO(michael): Docs"
            ],
            "type": "pubkey"
          },
          {
            "name": "gov_token_mint",
            "docs": [
              "TODO(michael): Docs"
            ],
            "type": "pubkey"
          },
          {
            "name": "proposal_threshold",
            "docs": [
              "The number of votes required in order for a voter to activate a proposal"
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
      "name": "TokenRecord",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "docs": [
              "TODO(michael): Docs"
            ],
            "type": "u8"
          },
          {
            "name": "authority",
            "docs": [
              "TODO(michael): Docs"
            ],
            "type": "pubkey"
          },
          {
            "name": "electorate",
            "docs": [
              "TODO(michael): Docs"
            ],
            "type": "pubkey"
          },
          {
            "name": "token_vault_key",
            "docs": [
              "TODO(michael): Docs"
            ],
            "type": "pubkey"
          },
          {
            "name": "balance",
            "docs": [
              "TODO(michael): Docs"
            ],
            "type": "u64"
          },
          {
            "name": "unfinalized_votes",
            "docs": [
              "TODO(michael): Docs"
            ],
            "type": "u64"
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
