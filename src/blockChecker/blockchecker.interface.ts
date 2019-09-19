interface IBlockCheckerAdd {
  amount: number;
  transactionId: number;
  trackedWalletId: string;
  otherWalletId: string;
  numberOfConfirmations: number;
  date: number;
  transactionType: boolean;
}

interface IBlockCheckerUpdate {
  transactionId: string;
  trackedWalletId: string;
}

interface IBlockFoundBy {
  description: string;
  ip: string;
  link: string;
  time: number;
}

export type IBlockChecker = IBlockCheckerAdd | IBlockCheckerUpdate;

export interface IBlockResponse {
  txIndexes: number[];
  nTx: number;
  estimatedBTCSent: number;
  totalBTCSent: number;
  reward: number;
  weight: number;
  blockIndex: number;
  prevBlockIndex: number;
  height: number;
  hash: string;
  mrklRoot: string;
  difficulty: number;
  version: number;
  time: number;
  bits: number;
  nonce: number;
  foundBy: IBlockFoundBy;
}
