import { BigNum } from '@emurgo/cardano-serialization-lib-browser';
import { CertificateType } from '../constants';

export interface Utxo {
  address: string; // address to which the utxo belongs to (necessary only for calculating correct cost of an input, maybe could be replaced by a dummy address)
  txHash: string;
  outputIndex: number;
  amount: {
    unit: string;
    quantity: string;
  }[];
}

export interface ChangeAddress {
  address: string;
  path: string;
  stakingPath: string;
}

export interface CardanoCertificatePointer {
  blockIndex: number;
  txIndex: number;
  certificateIndex: number;
}

export interface BaseOutput {
  setMax?: boolean;
  assets: {
    unit: string;
    quantity: string;
  }[];
}

export interface ExternalOutput extends BaseOutput {
  amount: string;
  address: string;
  setMax?: false;
  addressParameters?: never;
}

export interface ExternalOutputIncomplete extends BaseOutput {
  amount?: string | undefined;
  address?: string;
  setMax: boolean;
  addressParameters?: never;
}

export interface ChangeOutput extends BaseOutput {
  // address?: never;
  amount: string;
  address?: string;
  addressParameters: {
    addressType: CardanoAddressType;
    path: string | number[];
    stakingPath?: string | number[];
    stakingKeyHash?: string;
    certificatePointer?: CardanoCertificatePointer;
  };
}

export type FinalOutput = ExternalOutput | ChangeOutput;
export type UserOutput = ExternalOutput | ExternalOutputIncomplete;
export type Output = FinalOutput | ExternalOutputIncomplete;

export interface OutputCost {
  output: Output;
  outputFee: BigNum;
  minOutputAmount: BigNum;
}

export enum CardanoAddressType {
  BASE = 0,
  BASE_SCRIPT_KEY = 1,
  BASE_KEY_SCRIPT = 2,
  BASE_SCRIPT_SCRIPT = 3,
  POINTER = 4,
  POINTER_SCRIPT = 5,
  ENTERPRISE = 6,
  ENTERPRISE_SCRIPT = 7,
  BYRON = 8,
  REWARD = 14,
  REWARD_SCRIPT = 15,
}

export interface CoinSelectionResult {
  inputs: Utxo[];
  outputs: Output[];
  fee: string;
  totalSpent: string;
  deposit: string;
  withdrawal: string;
  max?: string;
}

export type PrecomposedTransaction =
  | {
      type: 'final';
      inputs: Utxo[];
      outputs: FinalOutput[];
      fee: string;
      totalSpent: string;
      deposit: string;
      withdrawal: string;
      max?: string;
    }
  | {
      type: 'nonfinal';
      fee: string;
      totalSpent: string;
      deposit: string;
      withdrawal: string;
      max?: string;
    };

export interface Withdrawal {
  stakingAddress?: string;
  amount: string;
}

export type CertificateTypeType = typeof CertificateType;

export interface CertificateStakeRegistration {
  type:
    | CertificateTypeType['STAKE_REGISTRATION']
    | CertificateTypeType['STAKE_DEREGISTRATION'];
  stakingKeyHash?: string;
}

export interface CertificateStakeDelegation {
  type: CertificateTypeType['STAKE_DELEGATION'];
  stakingKeyHash?: string;
  pool: string;
}

export interface CertificateStakePoolRegistration {
  type: CertificateTypeType['STAKE_POOL_REGISTRATION'];
  pool_parameters: Record<string, unknown>;
}

export type Certificate =
  | CertificateStakeRegistration
  | CertificateStakeDelegation
  | CertificateStakePoolRegistration;

export interface Options {
  byron?: boolean;
  feeParams?: { a: string };
}
