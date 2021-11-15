import { Certificate } from '../../../src/types/types';
import {
  changeAddress,
  utxo1,
  utxo2,
  utxo3,
  utxo4,
  utxo5,
  utxo6,
  utxo7,
} from '../../fixtures/constants';

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
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
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
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
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
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: {
      totalSpent: '2170869',
      fee: '170869',
    },
  },
];

export const coinSelection = [
  //   // TODO set max token, without amount
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
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
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
    description: 'Prefer utxo with largest asset (token) value',
    utxos: [utxo2, utxo6],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: undefined,
        assets: [
          {
            unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
            quantity: '50',
          },
        ],
        setMax: false,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: {
      totalSpent: '1617512',
      fee: '173069',
      inputs: [utxo6],
      outputs: [
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '1444443',
          assets: [
            {
              unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
              quantity: '50',
            },
          ],
          setMax: false,
        },
        {
          isChange: true,
          address: changeAddress,
          amount: '2382488',
          assets: [
            {
              unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
              quantity: '1950',
            },
            {
              quantity: '100',
              unit: 'c6207cbbc916fa3bbb4b91cc7789c7d7ddfb84264fa76f7ee627a9d8',
            },
          ],
        },
      ],
    },
  },
  {
    description: '_maxTokensPerOutput=1 creates 2 changes',
    utxos: [utxo2, utxo6],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: undefined,
        assets: [
          {
            unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
            quantity: '50',
          },
        ],
        setMax: false,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: { _maxTokensPerOutput: 1 },
    result: {
      totalSpent: '1622044',
      fee: '177601',
      inputs: [utxo6, utxo2],
      outputs: [
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '1444443',
          assets: [
            {
              unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
              quantity: '50',
            },
          ],
          setMax: false,
        },
        {
          isChange: true,
          address: changeAddress,
          amount: '1444443',
          assets: [
            {
              unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
              quantity: '2950',
            },
          ],
        },
        {
          isChange: true,
          address: changeAddress,
          amount: '5933513',
          assets: [
            {
              quantity: '100',
              unit: 'c6207cbbc916fa3bbb4b91cc7789c7d7ddfb84264fa76f7ee627a9d8',
            },
          ],
        },
      ],
    },
  },
  {
    description:
      '2 ADA utxos (2 ADA, 1 ADA), needs both in order to return change and not to burn it as unnecessarily high fee',
    utxos: [utxo4, utxo5],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: '1000000',
        assets: [],
        setMax: false,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: {
      totalSpent: '1169593',
      fee: '169593',
      inputs: [utxo4, utxo5],
      outputs: [
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '1000000',
          assets: [],
          setMax: false,
        },
        {
          isChange: true,
          address: changeAddress,
          amount: '1830407',
          assets: [],
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
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: { feeParams: { a: '0' } },
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
          isChange: true,
          address: changeAddress,
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
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: {
      max: '14833267',
      totalSpent: '15000000',
      fee: '166733',
      inputs: [utxo3, utxo1],
      outputs: [
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '14833267',
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
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: {
      max: '8384160',
      totalSpent: '8555557', // plus 1444443 in change output = 10000000
      fee: '171397',
      inputs: [utxo1, utxo2],
      outputs: [
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '8384160',
          assets: [],
          setMax: true,
        },
        {
          isChange: true,
          address: changeAddress,
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
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: {
      max: '7381300',
      totalSpent: '8555557', // plus 1444443 in change output = 10000000
      fee: '174257',
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
          amount: '7381300',
          assets: [],
          setMax: true,
        },
        {
          isChange: true,
          address: changeAddress,
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
    utxos: [utxo1, utxo7],
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
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: {
      max: '1000',
      totalSpent: '1617556', // plus amount in change output = 5000000
      fee: '173113',
      inputs: [utxo7, utxo1],
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
          isChange: true,
          address: changeAddress,
          amount: '4792444',
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
    withdrawals: [
      {
        amount: '10000000',
        stakingPath: "m/1852'/1815'/0'/2/0",
        stakeAddress:
          'stake1u8yk3dcuj8yylwvnzz953yups6mmuvt0vtjmxl2gmgceqjqz2yfd2',
      },
    ],
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: {
      totalSpent: '171265',
      fee: '171265',
      inputs: [utxo1],
      outputs: [
        {
          isChange: true,
          address: changeAddress,
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
      {
        amount: '10000000',
        stakingPath: "m/1852'/1815'/0'/2/0",
        stakeAddress:
          'stake1u8yk3dcuj8yylwvnzz953yups6mmuvt0vtjmxl2gmgceqjqz2yfd2',
      },
      {
        amount: '10000000',
        stakingPath: "m/1852'/1815'/1'/2/0",
        stakeAddress:
          'stake1u8yk3dcuj8yylwvnzz953yups6mmuvt0vtjmxl2gmgceqjqz2yfd2',
      },
    ],
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: {
      totalSpent: '171265',
      fee: '171265',
      inputs: [utxo1],
      outputs: [
        {
          isChange: true,
          address: changeAddress,
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
      },
    ] as Certificate[],
    withdrawals: [],
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: {
      totalSpent: '2166733',
      fee: '166733',
      inputs: [utxo1],
      outputs: [
        {
          isChange: true,
          address: changeAddress,
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

        pool: '0f292fcaa02b8b2f9b3c8f9fd8e0bb21abedb692a6d5058df3ef2735',
      },
    ] as Certificate[],
    withdrawals: [],
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: {
      totalSpent: '172497',
      fee: '172497',
      inputs: [utxo1],
      outputs: [
        {
          isChange: true,
          address: changeAddress,
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
      },
    ] as Certificate[],
    withdrawals: [],
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: {
      totalSpent: '171177',
      fee: '171177',
      inputs: [utxo1],
      outputs: [
        {
          isChange: true,
          address: changeAddress,
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
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
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
          isChange: true,
          address: changeAddress,
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
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
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
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
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
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: 'UTXO_BALANCE_INSUFFICIENT',
  },
];
