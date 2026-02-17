export type UgovernIDL =
{
  "address": "Govz1VyoyLD5BL6CSCxUJLVLsQHRwjfFj1prNsdNg5Jw",
  "metadata": {
    "name": "govern",
    "version": "0.5.1",
    "spec": "0.1.0",
    "description": "Handles proposal creation, lifecycle, voting, and execution.",
    "repository": "https://github.com/TribecaHQ/tribeca"
  },
  "docs": [
    "The [govern] program."
  ],
  "instructions": [
    {
      "name": "activate_proposal",
      "docs": [
        "Activates a proposal.",
        "Only the [Governor::electorate] may call this; that program",
        "may ensure that only certain types of users can activate proposals."
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
          "name": "governor",
          "docs": [
            "The [Governor]."
          ]
        },
        {
          "name": "proposal",
          "docs": [
            "The [Proposal] to activate."
          ],
          "writable": true
        },
        {
          "name": "electorate",
          "docs": [
            "The electorate of the [Governor] that may activate the proposal."
          ],
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "cancel_proposal",
      "docs": [
        "Cancels a proposal.",
        "This is only callable by the creator of the proposal."
      ],
      "discriminator": [
        106,
        74,
        128,
        146,
        19,
        65,
        39,
        23
      ],
      "accounts": [
        {
          "name": "governor",
          "docs": [
            "The [Governor]."
          ]
        },
        {
          "name": "proposal",
          "docs": [
            "The [Proposal] to activate."
          ],
          "writable": true
        },
        {
          "name": "proposer",
          "docs": [
            "The [Proposal::proposer]."
          ],
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "create_governor",
      "docs": [
        "Creates a [Governor]."
      ],
      "discriminator": [
        103,
        30,
        78,
        252,
        28,
        128,
        40,
        3
      ],
      "accounts": [
        {
          "name": "base",
          "docs": [
            "Base of the [Governor] key."
          ],
          "signer": true
        },
        {
          "name": "governor",
          "docs": [
            "Governor."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  84,
                  114,
                  105,
                  98,
                  101,
                  99,
                  97,
                  71,
                  111,
                  118,
                  101,
                  114,
                  110,
                  111,
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
          "name": "smart_wallet",
          "docs": [
            "The Smart Wallet."
          ]
        },
        {
          "name": "payer",
          "docs": [
            "Payer."
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
          "name": "electorate",
          "type": "pubkey"
        },
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "GovernanceParameters"
            }
          }
        }
      ]
    },
    {
      "name": "create_proposal",
      "docs": [
        "Creates a [Proposal].",
        "This may be called by anyone, since the [Proposal] does not do anything until",
        "it is activated in [activate_proposal]."
      ],
      "discriminator": [
        132,
        116,
        68,
        174,
        216,
        160,
        198,
        22
      ],
      "accounts": [
        {
          "name": "governor",
          "docs": [
            "The [Governor]."
          ],
          "writable": true
        },
        {
          "name": "proposal",
          "docs": [
            "The [Proposal]."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  84,
                  114,
                  105,
                  98,
                  101,
                  99,
                  97,
                  80,
                  114,
                  111,
                  112,
                  111,
                  115,
                  97,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "governor"
              },
              {
                "kind": "account",
                "path": "governor.proposal_count",
                "account": "Governor"
              }
            ]
          }
        },
        {
          "name": "proposer",
          "docs": [
            "Proposer of the proposal."
          ],
          "signer": true
        },
        {
          "name": "payer",
          "docs": [
            "Payer of the proposal."
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
          "name": "instructions",
          "type": {
            "vec": {
              "defined": {
                "name": "ProposalInstruction"
              }
            }
          }
        }
      ]
    },
    {
      "name": "create_proposal_meta",
      "docs": [
        "Creates a [ProposalMeta]."
      ],
      "discriminator": [
        238,
        138,
        212,
        160,
        46,
        53,
        51,
        88
      ],
      "accounts": [
        {
          "name": "proposal",
          "docs": [
            "The [Proposal]."
          ]
        },
        {
          "name": "proposer",
          "docs": [
            "Proposer of the proposal."
          ],
          "signer": true
        },
        {
          "name": "proposal_meta",
          "docs": [
            "The [ProposalMeta]."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  84,
                  114,
                  105,
                  98,
                  101,
                  99,
                  97,
                  80,
                  114,
                  111,
                  112,
                  111,
                  115,
                  97,
                  108,
                  77,
                  101,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "proposal"
              }
            ]
          }
        },
        {
          "name": "payer",
          "docs": [
            "Payer of the [ProposalMeta]."
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
          "name": "title",
          "type": "string"
        },
        {
          "name": "description_link",
          "type": "string"
        }
      ]
    },
    {
      "name": "new_vote",
      "docs": [
        "Creates a new [Vote]. Anyone can call this."
      ],
      "discriminator": [
        163,
        108,
        157,
        189,
        140,
        80,
        13,
        143
      ],
      "accounts": [
        {
          "name": "proposal",
          "docs": [
            "Proposal being voted on."
          ]
        },
        {
          "name": "vote",
          "docs": [
            "The vote."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  84,
                  114,
                  105,
                  98,
                  101,
                  99,
                  97,
                  86,
                  111,
                  116,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "proposal"
              },
              {
                "kind": "arg",
                "path": "voter"
              }
            ]
          }
        },
        {
          "name": "payer",
          "docs": [
            "Payer of the [Vote]."
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
          "name": "voter",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "queue_proposal",
      "docs": [
        "Queues a proposal for execution by the [SmartWallet]."
      ],
      "discriminator": [
        168,
        219,
        139,
        211,
        205,
        152,
        125,
        110
      ],
      "accounts": [
        {
          "name": "governor",
          "docs": [
            "The Governor."
          ]
        },
        {
          "name": "proposal",
          "docs": [
            "The Proposal to queue."
          ],
          "writable": true
        },
        {
          "name": "transaction",
          "writable": true
        },
        {
          "name": "smart_wallet",
          "docs": [
            "The Smart Wallet."
          ],
          "writable": true
        },
        {
          "name": "payer",
          "docs": [
            "Payer of the queued transaction."
          ],
          "signer": true
        },
        {
          "name": "smart_wallet_program",
          "docs": [
            "The Smart Wallet program."
          ],
          "address": "GokivDYuQXPZCWRkwMhdH2h91KpDQXBEmpgBgs55bnpH"
        },
        {
          "name": "system_program",
          "docs": [
            "The System program."
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "tx_bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "set_electorate",
      "docs": [
        "Sets the electorate of the [Governor]."
      ],
      "discriminator": [
        145,
        135,
        92,
        16,
        77,
        195,
        145,
        91
      ],
      "accounts": [
        {
          "name": "governor",
          "docs": [
            "The [Governor]"
          ],
          "writable": true
        },
        {
          "name": "smart_wallet",
          "docs": [
            "The Smart Wallet."
          ],
          "signer": true
        }
      ],
      "args": [
        {
          "name": "new_electorate",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "set_governance_params",
      "docs": [
        "Sets the [GovernanceParameters].",
        "This may only be called by the [Governor::smart_wallet]."
      ],
      "discriminator": [
        175,
        187,
        3,
        73,
        8,
        251,
        67,
        178
      ],
      "accounts": [
        {
          "name": "governor",
          "docs": [
            "The [Governor]"
          ],
          "writable": true
        },
        {
          "name": "smart_wallet",
          "docs": [
            "The Smart Wallet."
          ],
          "signer": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "GovernanceParameters"
            }
          }
        }
      ]
    },
    {
      "name": "set_vote",
      "docs": [
        "Sets a [Vote] weight and side.",
        "This may only be called by the [Governor::electorate]."
      ],
      "discriminator": [
        171,
        33,
        83,
        172,
        148,
        215,
        239,
        97
      ],
      "accounts": [
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
          "name": "vote",
          "docs": [
            "The [Vote]."
          ],
          "writable": true
        },
        {
          "name": "electorate",
          "docs": [
            "The [Governor::electorate]."
          ],
          "signer": true
        }
      ],
      "args": [
        {
          "name": "side",
          "type": "u8"
        },
        {
          "name": "weight",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
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
      "name": "ProposalMeta",
      "discriminator": [
        50,
        100,
        46,
        24,
        151,
        174,
        216,
        78
      ]
    },
    {
      "name": "SmartWallet",
      "discriminator": [
        67,
        59,
        220,
        179,
        41,
        10,
        60,
        177
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
      "name": "GovernorCreateEvent",
      "discriminator": [
        117,
        24,
        15,
        85,
        39,
        58,
        62,
        23
      ]
    },
    {
      "name": "GovernorSetElectorateEvent",
      "discriminator": [
        146,
        179,
        141,
        206,
        235,
        125,
        146,
        26
      ]
    },
    {
      "name": "GovernorSetParamsEvent",
      "discriminator": [
        169,
        129,
        187,
        152,
        130,
        17,
        81,
        157
      ]
    },
    {
      "name": "ProposalActivateEvent",
      "discriminator": [
        247,
        53,
        166,
        250,
        118,
        62,
        53,
        80
      ]
    },
    {
      "name": "ProposalCancelEvent",
      "discriminator": [
        24,
        49,
        11,
        182,
        23,
        59,
        122,
        220
      ]
    },
    {
      "name": "ProposalCreateEvent",
      "discriminator": [
        121,
        18,
        213,
        155,
        223,
        158,
        95,
        70
      ]
    },
    {
      "name": "ProposalMetaCreateEvent",
      "discriminator": [
        50,
        59,
        195,
        75,
        85,
        227,
        187,
        82
      ]
    },
    {
      "name": "ProposalQueueEvent",
      "discriminator": [
        48,
        219,
        123,
        209,
        140,
        210,
        248,
        14
      ]
    },
    {
      "name": "VoteSetEvent",
      "discriminator": [
        175,
        119,
        30,
        108,
        176,
        233,
        151,
        252
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidVoteSide",
      "msg": "Invalid vote side."
    },
    {
      "code": 6001,
      "name": "GovernorNotFound",
      "msg": "The owner of the smart wallet doesn't match with current."
    },
    {
      "code": 6002,
      "name": "VotingDelayNotMet",
      "msg": "The proposal cannot be activated since it has not yet passed the voting delay."
    },
    {
      "code": 6003,
      "name": "ProposalNotDraft",
      "msg": "Only drafts can be canceled."
    },
    {
      "code": 6004,
      "name": "ProposalNotActive",
      "msg": "The proposal must be active."
    },
    {
      "code": 6005,
      "name": "KeyMismatch",
      "msg": "Key mismatch."
    },
    {
      "code": 6006,
      "name": "MathOverflow",
      "msg": "Math overflow."
    },
    {
      "code": 6007,
      "name": "InvariantFailed",
      "msg": "Invariant failed."
    },
    {
      "code": 6008,
      "name": "UnexpectedNone",
      "msg": "Unexpected None value."
    },
    {
      "code": 6009,
      "name": "ProgramError",
      "msg": "Program error."
    }
  ],
  "types": [
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
      "name": "GovernorCreateEvent",
      "docs": [
        "Event called in [govern::create_governor]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "governor",
            "docs": [
              "The governor being created."
            ],
            "type": "pubkey"
          },
          {
            "name": "electorate",
            "docs": [
              "The electorate of the created [Governor]."
            ],
            "type": "pubkey"
          },
          {
            "name": "smart_wallet",
            "docs": [
              "The [SmartWallet]."
            ],
            "type": "pubkey"
          },
          {
            "name": "parameters",
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
      "name": "GovernorSetElectorateEvent",
      "docs": [
        "Event called in [govern::set_electorate]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "governor",
            "docs": [
              "The governor being created."
            ],
            "type": "pubkey"
          },
          {
            "name": "prev_electorate",
            "docs": [
              "Previous [Governor::electorate]."
            ],
            "type": "pubkey"
          },
          {
            "name": "new_electorate",
            "docs": [
              "New [Governor::electorate]."
            ],
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "GovernorSetParamsEvent",
      "docs": [
        "Event called in [govern::set_governance_params]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "governor",
            "docs": [
              "The governor being created."
            ],
            "type": "pubkey"
          },
          {
            "name": "prev_params",
            "docs": [
              "Previous [GovernanceParameters]."
            ],
            "type": {
              "defined": {
                "name": "GovernanceParameters"
              }
            }
          },
          {
            "name": "params",
            "docs": [
              "New [GovernanceParameters]."
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
      "name": "ProposalActivateEvent",
      "docs": [
        "Event called in [govern::cancel_proposal]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "governor",
            "docs": [
              "The governor."
            ],
            "type": "pubkey"
          },
          {
            "name": "proposal",
            "docs": [
              "The proposal being activated."
            ],
            "type": "pubkey"
          },
          {
            "name": "voting_ends_at",
            "docs": [
              "When voting ends for the [Proposal]."
            ],
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "ProposalCancelEvent",
      "docs": [
        "Event called in [govern::cancel_proposal]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "governor",
            "docs": [
              "The governor."
            ],
            "type": "pubkey"
          },
          {
            "name": "proposal",
            "docs": [
              "The proposal being canceled."
            ],
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "ProposalCreateEvent",
      "docs": [
        "Event called in [govern::create_proposal]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "governor",
            "docs": [
              "The governor."
            ],
            "type": "pubkey"
          },
          {
            "name": "proposal",
            "docs": [
              "The proposal being created."
            ],
            "type": "pubkey"
          },
          {
            "name": "index",
            "docs": [
              "The index of the [Proposal]."
            ],
            "type": "u64"
          },
          {
            "name": "instructions",
            "docs": [
              "Instructions in the proposal."
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
      "name": "ProposalMeta",
      "docs": [
        "Metadata about a proposal."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "proposal",
            "docs": [
              "The [Proposal]."
            ],
            "type": "pubkey"
          },
          {
            "name": "title",
            "docs": [
              "Title of the proposal."
            ],
            "type": "string"
          },
          {
            "name": "description_link",
            "docs": [
              "Link to a description of the proposal."
            ],
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "ProposalMetaCreateEvent",
      "docs": [
        "Event called in [govern::create_proposal_meta]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "governor",
            "docs": [
              "The governor."
            ],
            "type": "pubkey"
          },
          {
            "name": "proposal",
            "docs": [
              "The proposal being voted on."
            ],
            "type": "pubkey"
          },
          {
            "name": "title",
            "docs": [
              "The title."
            ],
            "type": "string"
          },
          {
            "name": "description_link",
            "docs": [
              "The description."
            ],
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "ProposalQueueEvent",
      "docs": [
        "Event called in [govern::queue_proposal]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "governor",
            "docs": [
              "The governor."
            ],
            "type": "pubkey"
          },
          {
            "name": "proposal",
            "docs": [
              "The proposal being queued."
            ],
            "type": "pubkey"
          },
          {
            "name": "transaction",
            "docs": [
              "The transaction key."
            ],
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "SmartWallet",
      "docs": [
        "A [SmartWallet] is a multisig wallet with Timelock capabilities."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "base",
            "docs": [
              "Base key used to generate the PDA."
            ],
            "type": "pubkey"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed for PDA derivation."
            ],
            "type": "u8"
          },
          {
            "name": "threshold",
            "docs": [
              "Minimum number of owner approvals needed to sign a [Transaction]."
            ],
            "type": "u64"
          },
          {
            "name": "minimum_delay",
            "docs": [
              "Minimum delay between approval and execution, in seconds."
            ],
            "type": "i64"
          },
          {
            "name": "grace_period",
            "docs": [
              "Time after the ETA until a [Transaction] expires."
            ],
            "type": "i64"
          },
          {
            "name": "owner_set_seqno",
            "docs": [
              "Sequence number for tracking owner set changes."
            ],
            "type": "u32"
          },
          {
            "name": "num_transactions",
            "docs": [
              "Auto-incrementing transaction index."
            ],
            "type": "u64"
          },
          {
            "name": "owners",
            "docs": [
              "Owners of the [SmartWallet]."
            ],
            "type": {
              "vec": "pubkey"
            }
          },
          {
            "name": "reserved",
            "docs": [
              "Reserved for future use."
            ],
            "type": {
              "array": [
                "u64",
                16
              ]
            }
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
    },
    {
      "name": "VoteSetEvent",
      "docs": [
        "Event called in [govern::set_vote]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "governor",
            "docs": [
              "The governor."
            ],
            "type": "pubkey"
          },
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
            "name": "vote",
            "docs": [
              "The vote."
            ],
            "type": "pubkey"
          },
          {
            "name": "side",
            "docs": [
              "The vote side."
            ],
            "type": "u8"
          },
          {
            "name": "weight",
            "docs": [
              "The vote's weight."
            ],
            "type": "u64"
          }
        ]
      }
    }
  ]
};

export const UgovernJSON: UgovernIDL =
{
  "address": "Govz1VyoyLD5BL6CSCxUJLVLsQHRwjfFj1prNsdNg5Jw",
  "metadata": {
    "name": "govern",
    "version": "0.5.1",
    "spec": "0.1.0",
    "description": "Handles proposal creation, lifecycle, voting, and execution.",
    "repository": "https://github.com/TribecaHQ/tribeca"
  },
  "docs": [
    "The [govern] program."
  ],
  "instructions": [
    {
      "name": "activate_proposal",
      "docs": [
        "Activates a proposal.",
        "Only the [Governor::electorate] may call this; that program",
        "may ensure that only certain types of users can activate proposals."
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
          "name": "governor",
          "docs": [
            "The [Governor]."
          ]
        },
        {
          "name": "proposal",
          "docs": [
            "The [Proposal] to activate."
          ],
          "writable": true
        },
        {
          "name": "electorate",
          "docs": [
            "The electorate of the [Governor] that may activate the proposal."
          ],
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "cancel_proposal",
      "docs": [
        "Cancels a proposal.",
        "This is only callable by the creator of the proposal."
      ],
      "discriminator": [
        106,
        74,
        128,
        146,
        19,
        65,
        39,
        23
      ],
      "accounts": [
        {
          "name": "governor",
          "docs": [
            "The [Governor]."
          ]
        },
        {
          "name": "proposal",
          "docs": [
            "The [Proposal] to activate."
          ],
          "writable": true
        },
        {
          "name": "proposer",
          "docs": [
            "The [Proposal::proposer]."
          ],
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "create_governor",
      "docs": [
        "Creates a [Governor]."
      ],
      "discriminator": [
        103,
        30,
        78,
        252,
        28,
        128,
        40,
        3
      ],
      "accounts": [
        {
          "name": "base",
          "docs": [
            "Base of the [Governor] key."
          ],
          "signer": true
        },
        {
          "name": "governor",
          "docs": [
            "Governor."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  84,
                  114,
                  105,
                  98,
                  101,
                  99,
                  97,
                  71,
                  111,
                  118,
                  101,
                  114,
                  110,
                  111,
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
          "name": "smart_wallet",
          "docs": [
            "The Smart Wallet."
          ]
        },
        {
          "name": "payer",
          "docs": [
            "Payer."
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
          "name": "electorate",
          "type": "pubkey"
        },
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "GovernanceParameters"
            }
          }
        }
      ]
    },
    {
      "name": "create_proposal",
      "docs": [
        "Creates a [Proposal].",
        "This may be called by anyone, since the [Proposal] does not do anything until",
        "it is activated in [activate_proposal]."
      ],
      "discriminator": [
        132,
        116,
        68,
        174,
        216,
        160,
        198,
        22
      ],
      "accounts": [
        {
          "name": "governor",
          "docs": [
            "The [Governor]."
          ],
          "writable": true
        },
        {
          "name": "proposal",
          "docs": [
            "The [Proposal]."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  84,
                  114,
                  105,
                  98,
                  101,
                  99,
                  97,
                  80,
                  114,
                  111,
                  112,
                  111,
                  115,
                  97,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "governor"
              },
              {
                "kind": "account",
                "path": "governor.proposal_count",
                "account": "Governor"
              }
            ]
          }
        },
        {
          "name": "proposer",
          "docs": [
            "Proposer of the proposal."
          ],
          "signer": true
        },
        {
          "name": "payer",
          "docs": [
            "Payer of the proposal."
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
          "name": "instructions",
          "type": {
            "vec": {
              "defined": {
                "name": "ProposalInstruction"
              }
            }
          }
        }
      ]
    },
    {
      "name": "create_proposal_meta",
      "docs": [
        "Creates a [ProposalMeta]."
      ],
      "discriminator": [
        238,
        138,
        212,
        160,
        46,
        53,
        51,
        88
      ],
      "accounts": [
        {
          "name": "proposal",
          "docs": [
            "The [Proposal]."
          ]
        },
        {
          "name": "proposer",
          "docs": [
            "Proposer of the proposal."
          ],
          "signer": true
        },
        {
          "name": "proposal_meta",
          "docs": [
            "The [ProposalMeta]."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  84,
                  114,
                  105,
                  98,
                  101,
                  99,
                  97,
                  80,
                  114,
                  111,
                  112,
                  111,
                  115,
                  97,
                  108,
                  77,
                  101,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "proposal"
              }
            ]
          }
        },
        {
          "name": "payer",
          "docs": [
            "Payer of the [ProposalMeta]."
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
          "name": "title",
          "type": "string"
        },
        {
          "name": "description_link",
          "type": "string"
        }
      ]
    },
    {
      "name": "new_vote",
      "docs": [
        "Creates a new [Vote]. Anyone can call this."
      ],
      "discriminator": [
        163,
        108,
        157,
        189,
        140,
        80,
        13,
        143
      ],
      "accounts": [
        {
          "name": "proposal",
          "docs": [
            "Proposal being voted on."
          ]
        },
        {
          "name": "vote",
          "docs": [
            "The vote."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  84,
                  114,
                  105,
                  98,
                  101,
                  99,
                  97,
                  86,
                  111,
                  116,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "proposal"
              },
              {
                "kind": "arg",
                "path": "voter"
              }
            ]
          }
        },
        {
          "name": "payer",
          "docs": [
            "Payer of the [Vote]."
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
          "name": "voter",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "queue_proposal",
      "docs": [
        "Queues a proposal for execution by the [SmartWallet]."
      ],
      "discriminator": [
        168,
        219,
        139,
        211,
        205,
        152,
        125,
        110
      ],
      "accounts": [
        {
          "name": "governor",
          "docs": [
            "The Governor."
          ]
        },
        {
          "name": "proposal",
          "docs": [
            "The Proposal to queue."
          ],
          "writable": true
        },
        {
          "name": "transaction",
          "writable": true
        },
        {
          "name": "smart_wallet",
          "docs": [
            "The Smart Wallet."
          ],
          "writable": true
        },
        {
          "name": "payer",
          "docs": [
            "Payer of the queued transaction."
          ],
          "signer": true
        },
        {
          "name": "smart_wallet_program",
          "docs": [
            "The Smart Wallet program."
          ],
          "address": "GokivDYuQXPZCWRkwMhdH2h91KpDQXBEmpgBgs55bnpH"
        },
        {
          "name": "system_program",
          "docs": [
            "The System program."
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "tx_bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "set_electorate",
      "docs": [
        "Sets the electorate of the [Governor]."
      ],
      "discriminator": [
        145,
        135,
        92,
        16,
        77,
        195,
        145,
        91
      ],
      "accounts": [
        {
          "name": "governor",
          "docs": [
            "The [Governor]"
          ],
          "writable": true
        },
        {
          "name": "smart_wallet",
          "docs": [
            "The Smart Wallet."
          ],
          "signer": true
        }
      ],
      "args": [
        {
          "name": "new_electorate",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "set_governance_params",
      "docs": [
        "Sets the [GovernanceParameters].",
        "This may only be called by the [Governor::smart_wallet]."
      ],
      "discriminator": [
        175,
        187,
        3,
        73,
        8,
        251,
        67,
        178
      ],
      "accounts": [
        {
          "name": "governor",
          "docs": [
            "The [Governor]"
          ],
          "writable": true
        },
        {
          "name": "smart_wallet",
          "docs": [
            "The Smart Wallet."
          ],
          "signer": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "GovernanceParameters"
            }
          }
        }
      ]
    },
    {
      "name": "set_vote",
      "docs": [
        "Sets a [Vote] weight and side.",
        "This may only be called by the [Governor::electorate]."
      ],
      "discriminator": [
        171,
        33,
        83,
        172,
        148,
        215,
        239,
        97
      ],
      "accounts": [
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
          "name": "vote",
          "docs": [
            "The [Vote]."
          ],
          "writable": true
        },
        {
          "name": "electorate",
          "docs": [
            "The [Governor::electorate]."
          ],
          "signer": true
        }
      ],
      "args": [
        {
          "name": "side",
          "type": "u8"
        },
        {
          "name": "weight",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
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
      "name": "ProposalMeta",
      "discriminator": [
        50,
        100,
        46,
        24,
        151,
        174,
        216,
        78
      ]
    },
    {
      "name": "SmartWallet",
      "discriminator": [
        67,
        59,
        220,
        179,
        41,
        10,
        60,
        177
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
      "name": "GovernorCreateEvent",
      "discriminator": [
        117,
        24,
        15,
        85,
        39,
        58,
        62,
        23
      ]
    },
    {
      "name": "GovernorSetElectorateEvent",
      "discriminator": [
        146,
        179,
        141,
        206,
        235,
        125,
        146,
        26
      ]
    },
    {
      "name": "GovernorSetParamsEvent",
      "discriminator": [
        169,
        129,
        187,
        152,
        130,
        17,
        81,
        157
      ]
    },
    {
      "name": "ProposalActivateEvent",
      "discriminator": [
        247,
        53,
        166,
        250,
        118,
        62,
        53,
        80
      ]
    },
    {
      "name": "ProposalCancelEvent",
      "discriminator": [
        24,
        49,
        11,
        182,
        23,
        59,
        122,
        220
      ]
    },
    {
      "name": "ProposalCreateEvent",
      "discriminator": [
        121,
        18,
        213,
        155,
        223,
        158,
        95,
        70
      ]
    },
    {
      "name": "ProposalMetaCreateEvent",
      "discriminator": [
        50,
        59,
        195,
        75,
        85,
        227,
        187,
        82
      ]
    },
    {
      "name": "ProposalQueueEvent",
      "discriminator": [
        48,
        219,
        123,
        209,
        140,
        210,
        248,
        14
      ]
    },
    {
      "name": "VoteSetEvent",
      "discriminator": [
        175,
        119,
        30,
        108,
        176,
        233,
        151,
        252
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidVoteSide",
      "msg": "Invalid vote side."
    },
    {
      "code": 6001,
      "name": "GovernorNotFound",
      "msg": "The owner of the smart wallet doesn't match with current."
    },
    {
      "code": 6002,
      "name": "VotingDelayNotMet",
      "msg": "The proposal cannot be activated since it has not yet passed the voting delay."
    },
    {
      "code": 6003,
      "name": "ProposalNotDraft",
      "msg": "Only drafts can be canceled."
    },
    {
      "code": 6004,
      "name": "ProposalNotActive",
      "msg": "The proposal must be active."
    },
    {
      "code": 6005,
      "name": "KeyMismatch",
      "msg": "Key mismatch."
    },
    {
      "code": 6006,
      "name": "MathOverflow",
      "msg": "Math overflow."
    },
    {
      "code": 6007,
      "name": "InvariantFailed",
      "msg": "Invariant failed."
    },
    {
      "code": 6008,
      "name": "UnexpectedNone",
      "msg": "Unexpected None value."
    },
    {
      "code": 6009,
      "name": "ProgramError",
      "msg": "Program error."
    }
  ],
  "types": [
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
      "name": "GovernorCreateEvent",
      "docs": [
        "Event called in [govern::create_governor]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "governor",
            "docs": [
              "The governor being created."
            ],
            "type": "pubkey"
          },
          {
            "name": "electorate",
            "docs": [
              "The electorate of the created [Governor]."
            ],
            "type": "pubkey"
          },
          {
            "name": "smart_wallet",
            "docs": [
              "The [SmartWallet]."
            ],
            "type": "pubkey"
          },
          {
            "name": "parameters",
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
      "name": "GovernorSetElectorateEvent",
      "docs": [
        "Event called in [govern::set_electorate]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "governor",
            "docs": [
              "The governor being created."
            ],
            "type": "pubkey"
          },
          {
            "name": "prev_electorate",
            "docs": [
              "Previous [Governor::electorate]."
            ],
            "type": "pubkey"
          },
          {
            "name": "new_electorate",
            "docs": [
              "New [Governor::electorate]."
            ],
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "GovernorSetParamsEvent",
      "docs": [
        "Event called in [govern::set_governance_params]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "governor",
            "docs": [
              "The governor being created."
            ],
            "type": "pubkey"
          },
          {
            "name": "prev_params",
            "docs": [
              "Previous [GovernanceParameters]."
            ],
            "type": {
              "defined": {
                "name": "GovernanceParameters"
              }
            }
          },
          {
            "name": "params",
            "docs": [
              "New [GovernanceParameters]."
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
      "name": "ProposalActivateEvent",
      "docs": [
        "Event called in [govern::cancel_proposal]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "governor",
            "docs": [
              "The governor."
            ],
            "type": "pubkey"
          },
          {
            "name": "proposal",
            "docs": [
              "The proposal being activated."
            ],
            "type": "pubkey"
          },
          {
            "name": "voting_ends_at",
            "docs": [
              "When voting ends for the [Proposal]."
            ],
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "ProposalCancelEvent",
      "docs": [
        "Event called in [govern::cancel_proposal]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "governor",
            "docs": [
              "The governor."
            ],
            "type": "pubkey"
          },
          {
            "name": "proposal",
            "docs": [
              "The proposal being canceled."
            ],
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "ProposalCreateEvent",
      "docs": [
        "Event called in [govern::create_proposal]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "governor",
            "docs": [
              "The governor."
            ],
            "type": "pubkey"
          },
          {
            "name": "proposal",
            "docs": [
              "The proposal being created."
            ],
            "type": "pubkey"
          },
          {
            "name": "index",
            "docs": [
              "The index of the [Proposal]."
            ],
            "type": "u64"
          },
          {
            "name": "instructions",
            "docs": [
              "Instructions in the proposal."
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
      "name": "ProposalMeta",
      "docs": [
        "Metadata about a proposal."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "proposal",
            "docs": [
              "The [Proposal]."
            ],
            "type": "pubkey"
          },
          {
            "name": "title",
            "docs": [
              "Title of the proposal."
            ],
            "type": "string"
          },
          {
            "name": "description_link",
            "docs": [
              "Link to a description of the proposal."
            ],
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "ProposalMetaCreateEvent",
      "docs": [
        "Event called in [govern::create_proposal_meta]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "governor",
            "docs": [
              "The governor."
            ],
            "type": "pubkey"
          },
          {
            "name": "proposal",
            "docs": [
              "The proposal being voted on."
            ],
            "type": "pubkey"
          },
          {
            "name": "title",
            "docs": [
              "The title."
            ],
            "type": "string"
          },
          {
            "name": "description_link",
            "docs": [
              "The description."
            ],
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "ProposalQueueEvent",
      "docs": [
        "Event called in [govern::queue_proposal]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "governor",
            "docs": [
              "The governor."
            ],
            "type": "pubkey"
          },
          {
            "name": "proposal",
            "docs": [
              "The proposal being queued."
            ],
            "type": "pubkey"
          },
          {
            "name": "transaction",
            "docs": [
              "The transaction key."
            ],
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "SmartWallet",
      "docs": [
        "A [SmartWallet] is a multisig wallet with Timelock capabilities."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "base",
            "docs": [
              "Base key used to generate the PDA."
            ],
            "type": "pubkey"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed for PDA derivation."
            ],
            "type": "u8"
          },
          {
            "name": "threshold",
            "docs": [
              "Minimum number of owner approvals needed to sign a [Transaction]."
            ],
            "type": "u64"
          },
          {
            "name": "minimum_delay",
            "docs": [
              "Minimum delay between approval and execution, in seconds."
            ],
            "type": "i64"
          },
          {
            "name": "grace_period",
            "docs": [
              "Time after the ETA until a [Transaction] expires."
            ],
            "type": "i64"
          },
          {
            "name": "owner_set_seqno",
            "docs": [
              "Sequence number for tracking owner set changes."
            ],
            "type": "u32"
          },
          {
            "name": "num_transactions",
            "docs": [
              "Auto-incrementing transaction index."
            ],
            "type": "u64"
          },
          {
            "name": "owners",
            "docs": [
              "Owners of the [SmartWallet]."
            ],
            "type": {
              "vec": "pubkey"
            }
          },
          {
            "name": "reserved",
            "docs": [
              "Reserved for future use."
            ],
            "type": {
              "array": [
                "u64",
                16
              ]
            }
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
    },
    {
      "name": "VoteSetEvent",
      "docs": [
        "Event called in [govern::set_vote]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "governor",
            "docs": [
              "The governor."
            ],
            "type": "pubkey"
          },
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
            "name": "vote",
            "docs": [
              "The vote."
            ],
            "type": "pubkey"
          },
          {
            "name": "side",
            "docs": [
              "The vote side."
            ],
            "type": "u8"
          },
          {
            "name": "weight",
            "docs": [
              "The vote's weight."
            ],
            "type": "u64"
          }
        ]
      }
    }
  ]
};
