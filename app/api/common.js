import { defineMessages } from 'react-intl';
import LocalizableError from '../i18n/LocalizableError';
import { WalletTransaction } from '../domain/WalletTransaction';
import { Wallet } from '../domain/Wallet';
import { Masternode } from '../domain/Masternode';
import { CoinInfo } from '../domain/CoinInfo';

const messages = defineMessages({
  genericApiError: {
    id: 'api.errors.GenericApiError',
    defaultMessage: '!!!An error occurred, please try again later.',
    description: 'Generic error message.'
  },
  incorrectWalletPasswordError: {
    id: 'api.errors.IncorrectPasswordError',
    defaultMessage: '!!!Incorrect wallet password.',
    description: '"Incorrect wallet password." error message.'
  },
  walletAlreadyRestoredError: {
    id: 'api.errors.WalletAlreadyRestoredError',
    defaultMessage: '!!!Wallet you are trying to restore already exists.',
    description: '"Wallet you are trying to restore already exists." error message.'
  },
});

export const ELECTRUM_PORT = 50001;
export const ELECTRUM_ADDRESS = "45.76.144.46";

export class GenericApiError extends LocalizableError {
  constructor() {
    super({
      id: messages.genericApiError.id,
      defaultMessage: messages.genericApiError.defaultMessage,
    });
  }
}

export class IncorrectWalletPasswordError extends LocalizableError {
  constructor() {
    super({
      id: messages.incorrectWalletPasswordError.id,
      defaultMessage: messages.incorrectWalletPasswordError.defaultMessage,
    });
  }
}

export class WalletAlreadyRestoredError extends LocalizableError {
  constructor() {
    super({
      id: messages.walletAlreadyRestoredError.id,
      defaultMessage: messages.walletAlreadyRestoredError.defaultMessage,
    });
  }
}

export type CreateTransactionResponse = WalletTransaction;
export type CreateWalletResponse = Wallet;
export type RenameWalletResponse = boolean;
export type UnlockWalletResponse = boolean;
export type LockWalletResponse = boolean;
export type ImportPrivateKeyResponse = boolean;
export type ExportPrivateKeyResponse = string;
export type BackupWalletResponse = boolean;
export type GetWalletsResponse = Array<Wallet>;
export type GetWalletRecoveryPhraseResponse = Array<string>;
export type RestoreWalletResponse = Wallet;
export type UpdateWalletResponse = Wallet;
export type UpdateWalletPasswordResponse = boolean;
export type CreateMasternodeResponse = string;
export type GetMasternodeGenkeyResponse = string;
export type GetMasternodeListResponse = Array<Masternode>;
export type GetMasternodeOutputsResponse = string;
export type CallLuxContractResponse = boolean;

export type CreateWalletRequest = {
  name: string,
  mnemonic: string,
  password: ?string
};

export type UpdateWalletPasswordRequest = {
  walletId: string,
  oldPassword: ?string,
  newPassword: ?string
};

export type RenameWalletRequest = {
  walletId: string
};

export type UnlockWalletRequest = {
  password: string
};

export type RestoreWalletRequest = {
  recoveryPhrase: string,
  walletName: string,
  walletPassword: ?string
};

export type GetSyncProgressResponse = {
  localDifficulty: ?number,
  networkDifficulty: ?number
};

export type GetTransactionsRequest = {
  walletId: string,
  searchTerm: string,
  skip: number,
  limit: number
};

export type GetTransactionsResponse = {
  transactions: Array<WalletTransaction>,
  total: number
};

export type CreateLuxContractRequest = {
  bytecode: string,
  gasLimit: number,
  gasPrice: number,
  senderaddress: string,
  broadcast: boolean,
  changeToSender: boolean
};

export type CreateLuxContractResponse = {
  txid: string,
  sender: string,
  hash160: string,
  address: string
};

export type CallLuxContractRequest = {
  address: string,
  data: string,
  senderaddress: string,
  gasLimit: string
};

export type SendToLuxContractRequest = {
  contractaddress: string,
  datahex: string,
  amount: number,
  gasLimit: number,
  gasPrice: number,
  senderaddress: string,
  broadcast: boolean,
  changeToSender: boolean
};

export type SendToLuxContractResponse = {
  txid: string,
  sender: string,
  hash160: string
};

export type StartMasternodeRequest = {
  alias: string,
  password: string
};

export type StartMasternodeResponse = {
  alias: string,
  result: string
};

export type StartManyMasternodeResponse = Array<StartMasternodeResponse>;

export type StopMasternodeRequest = {
  alias: string,
  password: string
};

export type StopMasternodeResponse = {
  alias: string,
  result: string
};

export type StopManyMasternodeResponse = Array<StopMasternodeResponse>;

export type SendCommandToConsoleRequest = {
  command: string,
  param: string,
};

export type SendCommandToConsoleResponse = {
  txid: string,
  sender: string,
  hash160: string
};


//////////////////////////////////////////////////////////////////////////////
//Luxgate type

export type GetCoinInfoResponse = CoinInfo
export type GetCoinBalanceResponse = number;
export type SendCoinResponse = boolean;
export type SwapCoinResponse = boolean;
export type GetLGOrdersResponse = Array;
export type GetLGTransactionsResponse = string;
export type GetLGTradeArrayResponse = string;
export type GetLGPriceArrayResponse = string;
export type GetAccountNewPhraseResponse = Array<string>;
export type GetPasswordInfoResponse = string;
export type SetCoinSettingResponse = string;
export type GetCoinPriceResponse = number;




