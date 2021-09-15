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
};

export const MIN_UTXO_VALUE = '1000000';
