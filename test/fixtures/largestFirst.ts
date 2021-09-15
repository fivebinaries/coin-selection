import { dummyStakingKeyHash } from '../../src/constants';
import { Certificate } from '../../src/types/types';

const changeAddress = {
  address:
    'addr1q8u2f05rprqjhygz22m06mhy4xrnqvqqpyuzhmxqfxnwvxz8d2kd47hsre5v9urjyu8s0ryk38dxzw0t5jesncw4v90s22tk0f',
  path: "m/1852'/1815'/0'/1/0",
  stakingPath: "m/1852'/1815'/0'/2/0",
};

const utxo1 = Object.freeze({
  address:
    'addr1q860vxljhadqxnrrsr2j6yxnwpdkyquq74lmghx502aj0r28d2kd47hsre5v9urjyu8s0ryk38dxzw0t5jesncw4v90sp0878u',
  txHash: '3c388acb799a37a4f1cc99bec7626637b0b80626b9ef7c7a687282cab701178d',
  outputIndex: 0,
  amount: [
    {
      quantity: '5000000',
      unit: 'lovelace',
    },
  ],
});

const utxo2 = Object.freeze({
  address:
    'addr1q860vxljhadqxnrrsr2j6yxnwpdkyquq74lmghx502aj0r28d2kd47hsre5v9urjyu8s0ryk38dxzw0t5jesncw4v90sp0878u',
  txHash: '9e63fddf20cb7b5472e2c9a1bb4bbe3112b8f2b22e45bc441206bcddde5c58a0',
  outputIndex: 1,
  amount: [
    {
      quantity: '5000000',
      unit: 'lovelace',
    },
    {
      quantity: '1000',
      unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
    },
  ],
});

const utxo3 = Object.freeze({
  address:
    'addr1q860vxljhadqxnrrsr2j6yxnwpdkyquq74lmghx502aj0r28d2kd47hsre5v9urjyu8s0ryk38dxzw0t5jesncw4v90sp0878u',
  txHash: '3c388acb799a37a4f1cc99bec7626637b0b80626b9ef7c7a687282cab701178d',
  outputIndex: 2,
  amount: [
    {
      quantity: '10000000',
      unit: 'lovelace',
    },
  ],
});

export const nonFinalCompose = [
  {
    description: 'Non-final compose: amount not filled',
    utxos: [utxo1],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: undefined,
        assets: [],
        setMax: false,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    options: { byron: false },
    result: {
      totalSpent: '168009',
      fee: '168009',
    },
  },
  {
    description: 'Non-final compose: address not filled',
    utxos: [utxo1],
    outputs: [
      {
        address: undefined,
        amount: '2000000',
        assets: [],
        setMax: false,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    options: { byron: false },
    result: {
      totalSpent: '2168009',
      fee: '168009',
    },
  },
  {
    description: 'Non-final compose, 2 outputs, 1 amount not filled',
    utxos: [utxo1],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: '2000000',
        assets: [],
        setMax: false,
      },
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: undefined,
        assets: [],
        setMax: false,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    options: { byron: false },
    result: {
      totalSpent: '2170869',
      fee: '170869',
    },
  },
];

export const coinSelection = [
  // TODO set max token, without amount
  {
    description: '1 ADA only utxo, 1 output, no change (dust burned as fee)',
    utxos: [utxo1],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: '4820000',
        assets: [],
        setMax: false,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    options: { byron: false },
    result: {
      totalSpent: '5000000',
      fee: '180000',
      inputs: [utxo1],
      outputs: [
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '4820000',
          assets: [],
          setMax: false,
        },
      ],
    },
  },
  {
    description: '1 ADA only utxo, 1 output + change (custom fee param A=0)',
    utxos: [utxo1],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: '3000000',
        assets: [],
        setMax: false,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    options: { byron: false, feeParams: { a: '0' } },
    result: {
      totalSpent: '3155381',
      fee: '155381', // since we set cost per byte to 0, the tx cost wll be equal to fee param B
      inputs: [utxo1],
      outputs: [
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '3000000',
          assets: [],
          setMax: false,
        },
        {
          addressParameters: {
            addressType: 0,
            path: "m/1852'/1815'/0'/1/0",
            stakingPath: "m/1852'/1815'/0'/2/0",
          },
          amount: '1844619',
          assets: [],
        },
      ],
    },
  },
  {
    description: 'set max on ADA output, no change',
    utxos: [utxo1, utxo3],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: undefined,
        assets: [],
        setMax: true,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    options: { byron: false },
    result: {
      max: '14828735',
      totalSpent: '15000000',
      fee: '171265',
      inputs: [utxo1, utxo3],
      outputs: [
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '14828735',
          assets: [],
          setMax: true,
        },
      ],
    },
  },
  {
    description: 'set max on ADA output, assets returned',
    utxos: [utxo1, utxo2],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: undefined,
        assets: [],
        setMax: true,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    options: { byron: false },
    result: {
      max: '8379628',
      totalSpent: '8555557', // plus 1444443 in change output = 10000000
      fee: '175929',
      inputs: [utxo1, utxo2],
      outputs: [
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '8379628',
          assets: [],
          setMax: true,
        },
        {
          addressParameters: {
            addressType: 0,
            path: "m/1852'/1815'/0'/1/0",
            stakingPath: "m/1852'/1815'/0'/2/0",
          },
          amount: '1444443',
          assets: [
            {
              quantity: '1000',
              unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
            },
          ],
        },
      ],
    },
  },
  {
    description: 'set max on ADA output, multiple outputs, assets returned',
    utxos: [utxo1, utxo2],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: '1000000',
        assets: [],
        setMax: false,
      },
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: undefined,
        assets: [],
        setMax: true,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    options: { byron: false },
    result: {
      max: '7376768',
      totalSpent: '8555557', // plus 1444443 in change output = 10000000
      fee: '178789',
      inputs: [utxo1, utxo2],
      outputs: [
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '1000000',
          assets: [],
          setMax: false,
        },
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '7376768',
          assets: [],
          setMax: true,
        },
        {
          addressParameters: {
            addressType: 0,
            path: "m/1852'/1815'/0'/1/0",
            stakingPath: "m/1852'/1815'/0'/2/0",
          },
          amount: '1444443',
          assets: [
            {
              quantity: '1000',
              unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
            },
          ],
        },
      ],
    },
  },
  {
    description: 'set max on token output',
    utxos: [utxo1, utxo2],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: undefined,
        assets: [
          {
            quantity: '',
            unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
          },
        ],
        setMax: true,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    options: { byron: false },
    result: {
      max: '1000',
      totalSpent: '1615972', // plus amount in change output = 5000000
      fee: '171529',
      inputs: [utxo2],
      outputs: [
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '1444443',
          assets: [
            {
              quantity: '1000',
              unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
            },
          ],
          setMax: true,
        },
        {
          addressParameters: {
            addressType: 0,
            path: "m/1852'/1815'/0'/1/0",
            stakingPath: "m/1852'/1815'/0'/2/0",
          },
          amount: '3384028',
          assets: [],
        },
      ],
    },
  },
  {
    description: 'withdrawing rewards: 1 ADA only utxo, 1 change output',
    utxos: [utxo1],
    outputs: [],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [{ amount: '10000000', stakingPath: "m/1852'/1815'/0'/2/0" }],
    options: { byron: false },
    result: {
      totalSpent: '171265',
      fee: '171265',
      inputs: [utxo1],
      outputs: [
        {
          addressParameters: {
            addressType: 0,
            path: "m/1852'/1815'/0'/1/0",
            stakingPath: "m/1852'/1815'/0'/2/0",
          },
          amount: '14828735',
          assets: [],
        },
      ],
    },
  },
  {
    description:
      'withdrawing rewards: multiple utxos, multiple withdrawals, 1 change output',
    utxos: [utxo1, utxo2],
    outputs: [],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [
      { amount: '10000000', stakingPath: "m/1852'/1815'/0'/2/0" },
      { amount: '10000000', stakingPath: "m/1852'/1815'/1'/2/0" },
    ],
    options: { byron: false },
    result: {
      totalSpent: '171265',
      fee: '171265',
      inputs: [utxo1],
      outputs: [
        {
          addressParameters: {
            addressType: 0,
            path: "m/1852'/1815'/0'/1/0",
            stakingPath: "m/1852'/1815'/0'/2/0",
          },
          amount: '24828735',
          assets: [],
        },
      ],
    },
  },
  {
    description: 'stake registration',
    utxos: [utxo1],
    outputs: [],
    changeAddress: changeAddress,
    certificates: [
      {
        type: 0,
        stakingKeyHash: dummyStakingKeyHash,
      },
    ] as Certificate[],
    withdrawals: [],
    options: { byron: false },
    result: {
      totalSpent: '2166733',
      fee: '166733',
      inputs: [utxo1],
      outputs: [
        {
          addressParameters: {
            addressType: 0,
            path: "m/1852'/1815'/0'/1/0",
            stakingPath: "m/1852'/1815'/0'/2/0",
          },
          amount: '2833267',
          assets: [],
        },
      ],
    },
  },
  {
    description: 'stake delegation',
    utxos: [utxo1],
    outputs: [],
    changeAddress: changeAddress,
    certificates: [
      {
        type: 2 as const,
        stakingKeyHash: dummyStakingKeyHash,
        pool: '0f292fcaa02b8b2f9b3c8f9fd8e0bb21abedb692a6d5058df3ef2735',
      },
    ] as Certificate[],
    withdrawals: [],
    options: { byron: false },
    result: {
      totalSpent: '172497',
      fee: '172497',
      inputs: [utxo1],
      outputs: [
        {
          addressParameters: {
            addressType: 0,
            path: "m/1852'/1815'/0'/1/0",
            stakingPath: "m/1852'/1815'/0'/2/0",
          },
          amount: '4827503',
          assets: [],
        },
      ],
    },
  },
  {
    description: 'stake deregistration',
    utxos: [utxo1],
    outputs: [],
    changeAddress: changeAddress,
    certificates: [
      {
        type: 1,
        stakingKeyHash: dummyStakingKeyHash,
      },
    ] as Certificate[],
    withdrawals: [],
    options: { byron: false },
    result: {
      totalSpent: '171177',
      fee: '171177',
      inputs: [utxo1],
      outputs: [
        {
          addressParameters: {
            addressType: 0,
            path: "m/1852'/1815'/0'/1/0",
            stakingPath: "m/1852'/1815'/0'/2/0",
          },
          amount: '6828823',
          assets: [],
        },
      ],
    },
  },
  {
    description:
      'multiple utxos (including multi asset), 2 user defined outputs (ADA only) + 1 change output (with an asset)',
    utxos: [
      {
        address:
          'addr1q9vf2uqwv9cx23rsfeqqa4g9rv8s2ha464sycdwpzdhm7ana9nxu0t6xjurg0qqcwwdulh56uglsp8z2uw9wuzjtfuaqka2l2d',
        txHash:
          '1bfb8b1d06bd28fb33493afaa5b22dec02bb8e292bbd7a6965c9037b5964a808',
        outputIndex: 1,
        amount: [
          {
            quantity: '3831173306',
            unit: 'lovelace',
          },
          {
            quantity: '998900',
            unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
          },
        ],
      },
      {
        address:
          'addr1qydd8kf2vtzv05y703kvsq0tcrgnwynqemxkp7rw4nwnq2ma9nxu0t6xjurg0qqcwwdulh56uglsp8z2uw9wuzjtfuaqqdz40d',
        txHash:
          '064ebc7096680b94de4e1c014938ea44886829c08ec01025578104b7b60d6bcf',
        outputIndex: 1,
        amount: [
          {
            quantity: '848035104',
            unit: 'lovelace',
          },
        ],
      },
      {
        address:
          'addr1q80vvrk4syazwl6w706ah9rgzvr5heq6hq2tjqxxu3x8wnma9nxu0t6xjurg0qqcwwdulh56uglsp8z2uw9wuzjtfuaqvmacgp',
        txHash:
          'd49c08164d3f2abc1a2e1b16a2c81122240a99bb6bd2f8d33628048df7529adc',
        outputIndex: 1,
        amount: [
          {
            quantity: '1180285694',
            unit: 'lovelace',
          },
        ],
      },
      {
        address:
          'addr1q984228shp7a6m0xrj39k7uuvcpsqt2dkjn8r6lvrpnmdfna9nxu0t6xjurg0qqcwwdulh56uglsp8z2uw9wuzjtfuaq77p62n',
        txHash:
          'ca0bad48270c5345bbcce7a850f545be5582a780d5a0337385d1b7413dfc60e3',
        outputIndex: 0,
        amount: [
          {
            quantity: '2000000',
            unit: 'lovelace',
          },
        ],
      },
    ],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: '1000000',
        assets: [],
        setMax: false,
      },
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: '2000000',
        assets: [],
        setMax: false,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    options: { byron: false },
    result: {
      totalSpent: '3172761',
      fee: '172761',
      inputs: [
        {
          address:
            'addr1q9vf2uqwv9cx23rsfeqqa4g9rv8s2ha464sycdwpzdhm7ana9nxu0t6xjurg0qqcwwdulh56uglsp8z2uw9wuzjtfuaqka2l2d',
          txHash:
            '1bfb8b1d06bd28fb33493afaa5b22dec02bb8e292bbd7a6965c9037b5964a808',
          outputIndex: 1,
          amount: [
            {
              quantity: '3831173306',
              unit: 'lovelace',
            },
            {
              quantity: '998900',
              unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
            },
          ],
        },
      ],
      outputs: [
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '1000000',
          assets: [],
          setMax: false,
        },
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '2000000',
          assets: [],
          setMax: false,
        },
        {
          amount: '3828000545',
          addressParameters: {
            path: "m/1852'/1815'/0'/1/0",
            addressType: 0,
            stakingPath: "m/1852'/1815'/0'/2/0",
          },
          assets: [
            {
              unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
              quantity: '998900',
            },
          ],
        },
      ],
    },
  },
];

export const exceptions = [
  {
    description: 'Not enough utxos to cover an output amount',
    utxos: [utxo1],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: '10000000',
        assets: [],
        setMax: false,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    options: { byron: false },
    result: 'UTXO_BALANCE_INSUFFICIENT',
  },
  {
    description:
      'Not enough utxos to cover mandatory change output (multi asset utxo)',
    utxos: [utxo2],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: '4800000',
        assets: [],
        setMax: false,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    options: { byron: false },
    result: 'UTXO_BALANCE_INSUFFICIENT',
  },
  {
    description: 'Computed max output amount is lower than minUtxoVal',
    // utxos: 3.544443 ADA, outputs: 1 ADA + 1.443 ADA in change output + fee. This leaves less than 1 ADA which would be set as "max"
    utxos: [
      {
        address:
          'addr1q860vxljhadqxnrrsr2j6yxnwpdkyquq74lmghx502aj0r28d2kd47hsre5v9urjyu8s0ryk38dxzw0t5jesncw4v90sp0878u',
        txHash:
          'b5d1abd05c1eb0564a34c5daa4a71185aa11568c375ab7f946da889ebcb23a01',
        outputIndex: 1,
        amount: [
          {
            quantity: '2100000',
            unit: 'lovelace',
          },
          {
            quantity: '90',
            unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
          },
        ],
      },
      {
        address:
          'addr1q860vxljhadqxnrrsr2j6yxnwpdkyquq74lmghx502aj0r28d2kd47hsre5v9urjyu8s0ryk38dxzw0t5jesncw4v90sp0878u',
        txHash:
          'b5d1abd05c1eb0564a34c5daa4a71185aa11568c375ab7f946da889ebcb23a01',
        outputIndex: 0,
        amount: [
          {
            quantity: '1444443',
            unit: 'lovelace',
          },
          {
            quantity: '10',
            unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
          },
        ],
      },
    ],
    outputs: [
      {
        address:
          'addr1q860vxljhadqxnrrsr2j6yxnwpdkyquq74lmghx502aj0r28d2kd47hsre5v9urjyu8s0ryk38dxzw0t5jesncw4v90sp0878u',
        amount: undefined,
        assets: [],
        setMax: true,
      },
      {
        address:
          'addr1q860vxljhadqxnrrsr2j6yxnwpdkyquq74lmghx502aj0r28d2kd47hsre5v9urjyu8s0ryk38dxzw0t5jesncw4v90sp0878u',
        amount: '1000000',
        assets: [],
        setMax: false,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    options: { byron: false },
    result: 'UTXO_BALANCE_INSUFFICIENT',
  },
];
