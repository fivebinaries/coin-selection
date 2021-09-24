export const dummyAddress =
  'addr_test1qz2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3jcu5d8ps7zex2k2xt3uqxgjqnnj83ws8lhrn648jjxtwq2ytjqp';

export const CertificateType = {
  STAKE_REGISTRATION: 0,
  STAKE_DEREGISTRATION: 1,
  STAKE_DELEGATION: 2,
  STAKE_POOL_REGISTRATION: 3,
} as const;

export const ERROR = {
  UTXO_BALANCE_INSUFFICIENT: {
    code: 'UTXO_BALANCE_INSUFFICIENT',
    message: 'UTxO balance insufficient',
  },
  UNSUPPORTED_CERTIFICATE_TYPE: {
    code: 'UNSUPPORTED_CERTIFICATE_TYPE',
    message: 'Unsupported certificate type',
  },
} as const;

export const CARDANO_PARAMS = {
  PROTOCOL_MAGICS: {
    mainnet: 764824073,
    testnet: 1097911063,
  },
  NETWORK_IDS: {
    mainnet: 1,
    testnet: 0,
  },
  MIN_UTXO_VALUE: '1000000',
  MAX_TX_SIZE: 16384,
  MAX_VALUE_SIZE: 5000,
} as const;

// https://github.com/vacuumlabs/adalite/blob/d8ba3bb1ff439ae8e02abd99163435a989d97961/app/frontend/wallet/shelley/transaction/constants.ts
// policyId is 28 bytes, assetName max 32 bytes, together with quantity makes
// max token size about 70 bytes, max output size is 4000 => 4000 / 70 ~ 50
export const MAX_TOKENS_PER_OUTPUT = 50;
