const ABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'msg',
        type: 'string',
      },
    ],
    name: 'BusinessShutdownEvent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'msg',
        type: 'string',
      },
    ],
    name: 'BuyEvent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'msg',
        type: 'string',
      },
    ],
    name: 'ClaimRewardEvent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'msg',
        type: 'string',
      },
    ],
    name: 'RegisterBusinessEvent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'msg',
        type: 'string',
      },
    ],
    name: 'UpdateRewardConfigEvent',
    type: 'event',
  },
  {
    inputs: [],
    name: 'businessHashCount',
    outputs: [
      {
        internalType: 'uint16',
        name: '',
        type: 'uint16',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: '',
        type: 'uint16',
      },
    ],
    name: 'businesses',
    outputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'rewardThreshold',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'rewardAmount',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isActive',
        type: 'bool',
      },
      {
        internalType: 'address',
        name: 'paymentAddress',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'businessContext',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'productPrice',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'businessHash',
        type: 'uint16',
      },
      {
        internalType: 'uint16',
        name: 'productIndex',
        type: 'uint16',
      },
    ],
    name: 'buySomething',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'businessHash',
        type: 'uint16',
      },
      {
        internalType: 'uint16',
        name: 'productIndex',
        type: 'uint16',
      },
    ],
    name: 'buySomething2',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'businessHash',
        type: 'uint16',
      },
    ],
    name: 'claimReward',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'emitBusinessShutdown',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'emitBuy',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'emitClaimReward',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'emitRegisterBusiness',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'emitUpdateRewardConfig',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'businessHash',
        type: 'uint16',
      },
    ],
    name: 'getBusinesInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'rewardThreshold',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'rewardAmount',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isActive',
            type: 'bool',
          },
          {
            internalType: 'address',
            name: 'paymentAddress',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'businessContext',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'productPrice',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'uint256',
                name: 'price',
                type: 'uint256',
              },
            ],
            internalType: 'struct FedX.Products[]',
            name: 'products',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct FedX.Business',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getBusinesses',
    outputs: [
      {
        components: [
          {
            internalType: 'uint16',
            name: 'businessHash',
            type: 'uint16',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'uint256',
                name: 'rewardThreshold',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'rewardAmount',
                type: 'uint256',
              },
              {
                internalType: 'bool',
                name: 'isActive',
                type: 'bool',
              },
              {
                internalType: 'address',
                name: 'paymentAddress',
                type: 'address',
              },
              {
                internalType: 'string',
                name: 'businessContext',
                type: 'string',
              },
              {
                internalType: 'uint256',
                name: 'productPrice',
                type: 'uint256',
              },
              {
                components: [
                  {
                    internalType: 'string',
                    name: 'name',
                    type: 'string',
                  },
                  {
                    internalType: 'uint256',
                    name: 'price',
                    type: 'uint256',
                  },
                ],
                internalType: 'struct FedX.Products[]',
                name: 'products',
                type: 'tuple[]',
              },
            ],
            internalType: 'struct FedX.Business',
            name: 'business',
            type: 'tuple',
          },
        ],
        internalType: 'struct FedX.BusinessEntry[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'businessHash',
        type: 'uint16',
      },
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'getPoints',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'businessHash',
        type: 'uint16',
      },
    ],
    name: 'getTransactionCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'businessHash',
        type: 'uint16',
      },
    ],
    name: 'getTransactions',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
        ],
        internalType: 'struct FedX.Transaction[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'rewardThreshold',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'rewardAmount',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'paymentAddress',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'businessContext',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'productPrice',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
        ],
        internalType: 'struct FedX.Products[]',
        name: 'products',
        type: 'tuple[]',
      },
    ],
    name: 'registerBusiness',
    outputs: [
      {
        internalType: 'uint16',
        name: '',
        type: 'uint16',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'businessHash',
        type: 'uint16',
      },
    ],
    name: 'shutdownBusiness',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: '',
        type: 'uint16',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'transactions',
    outputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'businessHash',
        type: 'uint16',
      },
      {
        internalType: 'uint256',
        name: 'newThreshold',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'newAmount',
        type: 'uint256',
      },
    ],
    name: 'updateRewardConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: '',
        type: 'uint16',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'userPoints',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export const daiContractConfig = {
  address: '0x43Bd95A1E48c13BB600BF37b2D7B396D0989554e',
  abi: ABI,
} as const;
