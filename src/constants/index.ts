import * as CardanoWasm from '@emurgo/cardano-serialization-lib-browser';
import { NetworkInfo } from '@emurgo/cardano-serialization-lib-browser';

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
  UTXO_VALUE_TOO_SMALL: {
    code: 'UTXO_VALUE_TOO_SMALL',
    message: 'UTxO value too small',
  },
  UNSUPPORTED_CERTIFICATE_TYPE: {
    code: 'UNSUPPORTED_CERTIFICATE_TYPE',
    message: 'Unsupported certificate type',
  },
  UTXO_NOT_FRAGMENTED_ENOUGH: {
    code: 'UTXO_NOT_FRAGMENTED_ENOUGH',
    message: 'UTxO Not fragmented enough.',
  },
} as const;

export const CARDANO_PARAMS = {
  PROTOCOL_MAGICS: {
    mainnet: NetworkInfo.mainnet().protocol_magic(),
    testnet: NetworkInfo.testnet().protocol_magic(),
  },
  NETWORK_IDS: {
    mainnet: NetworkInfo.mainnet().network_id(),
    testnet: NetworkInfo.testnet().network_id(),
  },
  COINS_PER_UTXO_WORD: '34482',
  MAX_TX_SIZE: 16384,
  MAX_VALUE_SIZE: 5000,
} as const;

// https://github.com/vacuumlabs/adalite/blob/d8ba3bb1ff439ae8e02abd99163435a989d97961/app/frontend/wallet/shelley/transaction/constants.ts
// policyId is 28 bytes, assetName max 32 bytes, together with quantity makes
// max token size about 70 bytes, max output size is 4000 => 4000 / 70 ~ 50
export const MAX_TOKENS_PER_OUTPUT = 50;

// Current minimal utxo value (the minimal amount that needs to be sent in a smallest transaction possible)
export const MIN_UTXO_VALUE = CardanoWasm.min_ada_required(
  CardanoWasm.Value.new(CardanoWasm.BigNum.from_str('0')),
  false,
  CardanoWasm.BigNum.from_str(CARDANO_PARAMS.COINS_PER_UTXO_WORD),
);
