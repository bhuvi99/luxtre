// @flow
import { split, get } from 'lodash';
import { action } from 'mobx';
import environment from '../../environment';
import patchLuxApi from './mocks/patchLuxApi';
import CoinKey from 'coinkey';
import BigNumber from 'bignumber.js';
import { ipcRenderer, remote } from 'electron';
import { getLuxInfo } from './getLuxInfo';
import { getLuxPeerInfo } from './getLuxPeerInfo';
import { LOVELACES_PER_LUX } from '../../config/numbersConfig';
import Wallet from '../../domain/Wallet';
import Masternode from '../../domain/Masternode';
import getLuxPath from './lib/getLuxPath';

import { getLuxAccounts } from './getLuxAccounts';
import { getLuxAccountBalance } from './getLuxAccountBalance';
import { getLuxAccountRecoveryPhrase } from './getLuxAccountRecoveryPhrase';
import { sendLuxTransaction } from './sendLuxTransaction';
import { getLuxTransactionByHash } from './getLuxTransaction';
import { lockLuxWallet } from './lockLuxWallet';
import { unlockLuxWallet } from './unlockLuxWallet';
import { changeLuxWalletPassphrase } from './changeLuxWalletPassphrase';
import { getLuxTransactions } from './getLuxTransactions';
import { getLuxBlockNumber } from './getLuxBlockNumber';
import { getLuxAddressesByAccount } from './getLuxAddressesByAccount';
import { importLuxPrivateKey } from './importLuxPrivateKey';
import { exportLuxPrivateKey } from './exportLuxPrivateKey';
import { setLuxAccount } from './setLuxAccount';
import { getLuxAccountAddress } from './getLuxAccountAddress';
import { isValidLuxAddress } from './isValidLuxAddress';
import { isValidMnemonic } from '../../../lib/decrypt';
import WalletAddress from '../../domain/WalletAddress';
import { newLuxWallet } from './newLuxWallet';
import { getLuxNewAddress } from './getLuxNewAddress';
import { backupLuxWallet } from './backupLuxWallet';
import { restoreLuxWallet } from './restoreLuxWallet';
import { updateLuxWallet } from './updateLuxWallet';
import { exportLuxBackupJSON } from './exportLuxBackupJSON';
import { importLuxBackupJSON } from './importLuxBackupJSON';
import { importLuxWallet } from './importLuxWallet';
import { getLuxWalletAccounts } from './getLuxWalletAccounts';
import { luxTxFee } from './luxTxFee';
import {getLuxUnspentTransactions} from './getLuxUnspentTransactions';
import {getLuxEstimatedFee} from './getLuxEstimatedFee';
import {getLuxMasternodeGenkey} from './getLuxMasternodeGenkey';
import {getLuxMasternodeList} from './getLuxMasternodeList';
import {startLuxMasternode} from './startLuxMasternode';
import {startManyLuxMasternode} from './startManyLuxMasternode';
import {stopLuxMasternode} from './stopLuxMasternode';
import {stopManyLuxMasternode} from './stopManyLuxMasternode';
import {getLuxMasternodeOutputs} from './getLuxMasternodeOutputs';
import {isLuxWalletEncrypted} from './isLuxWalletEncrypted';
import {isLuxWalletLocked} from './isLuxWalletLocked';
import {getLuxStakingStatus} from './getLuxStakingStatus';
import {createLuxContract} from './createLuxContract';
import {callLuxContract} from './callLuxContract';
import {sendToLuxContract} from './sendToLuxContract';
import {sendCommandToConsole} from './sendCommandToConsole';
import {closeLocalNetwork} from './closeLocalNetwork';

const fs = require('fs');

//masternode
import {encryptLuxWallet} from './encryptLuxWallet';


import WalletTransaction, { 
  transactionStates,
  transactionTypes,
  TransactionType 
} from '../../domain/WalletTransaction';

import type {
  LuxSyncProgressResponse,
  LuxAddress,
  LuxAccounts,
  LuxWalletBalance,
  LuxTransaction,
  LuxTransactionFee,
  LuxTransactions,
  LuxBlockNumber,
  LuxRecoveryPassphrase,
  LuxTxHash,
  LuxWalletId,
  LuxWallet,
  LuxWallets,
  LuxWalletRecoveryPhraseResponse,
  LuxStakingStatus
} from './types';

import { 
  Logger, 
  stringifyData, 
  stringifyError
} from '../../utils/logging';

import type {
  CreateWalletRequest,
  CreateWalletResponse,
  CreateTransactionResponse,
  RenameWalletRequest,
  RenameWalletResponse,
  UnlockWalletRequest,
  UnlockWalletResponse,
  LockWalletResponse,
  ImportPrivateKeyResponse,
  ExportPrivateKeyResponse,
  BackupWalletResponse,
  GetSyncProgressResponse,
  GetTransactionsRequest,
  GetTransactionsResponse,
  GetWalletRecoveryPhraseResponse,
  GetWalletsResponse,
  RestoreWalletRequest,
  RestoreWalletResponse,
  UpdateWalletResponse,
  UpdateWalletPasswordRequest,
  UpdateWalletPasswordResponse,
  CreateMasternodeResponse,
  GetMasternodeGenkeyResponse,
  GetMasternodeListResponse,
  StartMasternodeRequest,
  StartMasternodeResponse,
  StartManyMasternodeResponse,
  StopMasternodeRequest,
  StopMasternodeResponse,
  StopManyMasternodeResponse,
  GetMasternodeOutputsResponse,
  CreateLuxContractRequest,
  CreateLuxContractResponse,
  CallLuxContractRequest,
  CallLuxContractResponse,
  SendCommandToConsoleRequest,
  SendCommandToConsoleResponse
} from '../common';

import {
  GenericApiError,
  IncorrectWalletPasswordError,
  WalletAlreadyRestoredError,
} from '../common';

import { 
  mnemonicToSeedHex, 
  quantityToBigNumber, 
  unixTimestampToDate 
} from './lib/utils';

import {
  getLuxWalletData,
  setLuxWalletData,
  unsetLuxWalletData,
  updateLuxWalletData
} from './luxLocalStorage';


import {
  AllFundsAlreadyAtReceiverAddressError,
  NotAllowedToSendMoneyToRedeemAddressError,
  NotAllowedToSendMoneyToSameAddressError,
  NotEnoughFundsForTransactionFeesError,
  NotEnoughMoneyToSendError,
  RedeemLuxError,
  WalletAlreadyImportedError,
  WalletFileImportError,
} from './errors';

/**
 * The api layer that is used for all requests to the
 * luxcoin backend when working with the LUX coin.
 */

//const ca = remote.getGlobal('ca');

export const LUX_API_HOST = 'localhost';
export const LUX_API_PORT = 9888;
export const LUX_API_USER = 'rpcuser';
export let LUX_API_PWD = 'rpcpwd';

// LUX specific Request / Response params

export type ImportWalletResponse = Wallet;
export type UpdateWalletRequest = Wallet;

export type ImportWalletRequest = {
  name: string,
  privateKey: string,
  password: ?string
};

export type CreateTransactionRequest = {
  from: string,
  to: string,
  value: BigNumber,
  password: string
};

export type GetAddressesResponse = {
  accountId: ?string,
  addresses: Array<WalletAddress>,
};
export type GetAddressesRequest = {
  walletId: string,
};
export type CreateAddressResponse = WalletAddress;
export type CreateAddressRequest = {
  accountId: string,
  password: ?string,
};

/*export type RedeemLuxRequest = {
  redemptionCode: string,
  accountId: string,
  walletPassword: ?string,
};
export type RedeemLuxResponse = Wallet;
export type RedeemPaperVendedLuxRequest = {
  shieldedRedemptionKey: string,
  mnemonics: string,
  accountId: string,
  walletPassword: ?string,
};
export type RedeemPaperVendedLuxResponse = RedeemPaperVendedLuxRequest;
*/

export type ImportWalletFromKeyRequest = {
  filePath: string,
  walletPassword: ?string,
};
export type ImportWalletFromKeyResponse = Wallet;
export type ImportWalletFromFileRequest = {
  filePath: string,
  walletPassword: ?string,
  walletName: ?string,
};
export type ImportWalletFromFileResponse = Wallet;
export type NextUpdateResponse = ?{
  version: ?string,
};
//export type PostponeUpdateResponse = Promise<void>;
//export type ApplyUpdateResponse = Promise<void>;

export type TransactionFeeRequest = {
  sender: string,
  receiver: string,
  amount: string,
};
export type TransactionFeeResponse = BigNumber;
export type ExportWalletToFileRequest = {
  walletId: string,
  filePath: string,
  password: ?string
};

export type GetWalletBalanceResponse = Promise<Number>;
export type ExportWalletToFileResponse = [];
// const notYetImplemented = () => new Promise((_, reject) => {
//   reject(new ApiMethodNotYetImplementedError());
// });

// Commented out helper code for testing async APIs
// (async () => {
//   const result = await ClientApi.nextUpdate();
//   console.log('nextUpdate', result);
// })();

// Commented out helper code for testing sync APIs
// (() => {
//   const result = ClientApi.isValidRedeemCode('HSoXEnt9X541uHvtzBpy8vKfTo1C9TkAX3wat2c6ikg=');
//   console.log('isValidRedeemCode', result);
// })();


export default class LuxApi {

  constructor() {
    if (environment.isTest()) {
    //  patchLuxApi(this);
    }
    
	  let luxpath = getLuxPath(environment.PLATFORM, environment.ENV);
    luxpath = luxpath + '/lux.conf';
    
    let contents = fs.readFileSync(luxpath, 'utf8');
    const settings = contents.split("\n");
    settings.forEach((setting) => {
      if(setting.indexOf("rpcpassword") != -1)
      {
        setting = setting.split(' ').join('');
        setting = setting.replace(/(\r?\n|\r)/gm, '');
        LUX_API_PWD = setting.substring(12);
        return;
      }
    });

    /*const rpc = require(rpcjson);
    fetch('/home/.lux/rpc.json')
	  .then((res) => res.json())
	  .then((data) => {
	    console.log('data:', data);
	  })
    if(rpc.pid) LUX_API_PWD = rpc.id;
  	console.log(LUX_API_PWD);*/
  }

  async getSyncProgress(): Promise<GetSyncProgressResponse> {
    Logger.debug('LuxApi::getSyncProgress called');
    try {

      const response: LuxInfo = await getLuxInfo();
      //console.log('LuxApi::getLuxInfo success: ' + stringifyData(response));
      const peerInfos: LuxPeerInfos = await getLuxPeerInfo();
      //console.log('LuxApi::getLuxPeerInfo success: ' + stringifyData(peerInfos));
      var totalBlocks = peerInfos.sort(function(a, b){
        return b.startingheight - a.startingheight;
      })[0].startingheight;

      return {
        localDifficulty: response ? response.blocks : 100,
        networkDifficulty: peerInfos ? totalBlocks : 100
      };
    } catch (error) {
      const errStr = stringifyError(error);
      const errObj = JSON.parse(errStr);
      if(errObj.message) {
        return {
          errorMessage: errObj.message
        }
      }
      Logger.error('LuxApi::getSyncProgress error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }

 async closeConnection(): Promise<string> {
    console.log("closeConnection");
    try {
	const resc  = await closeLocalNetwork();
	console.log(resc);
      return resc;

    } catch (error) {
      console.log("closeConnection Error");
      throw new GenericApiError();
    }
  }  


  getWallets = async (): Promise<GetWalletsResponse> => {
    Logger.debug('LuxApi::getWallets called');
    try {
      let response = await isLuxWalletEncrypted();
      const hasPassword = response.indexOf('unknown command') !== -1 ? false : true;

      const walletId = '';
      const confirmations = 0;
      let amount = await getLuxAccountBalance({
        walletId,
        confirmations
      });
      amount = quantityToBigNumber(amount);
      const address = await getLuxAccountAddress({ walletId });

      let isLocked = false;
      if(hasPassword)
      {
        try{
          response = await isLuxWalletLocked({address});
          isLocked = false;
        }catch (error) {
          if (error.message.includes('walletpassphrase')) {
            isLocked = true;
          }
        }
      }
      
      const stakingStatus: LuxStakingStatus = await getLuxStakingStatus();
      
      const isStaking = stakingStatus && stakingStatus.validtime == true && 
        stakingStatus.haveconnections == true && 
        stakingStatus.walletunlocked == true && 
        stakingStatus.mintablecoins == true &&
        stakingStatus.enoughcoins == 'yes';

      const id = 'Main';
      let Wallets = [];
      try {
        // use wallet data from local storage
        const walletData = await getLuxWalletData(id); // fetch wallet data from local storage
        const { name, assurance, passwordUpdateDate } = walletData;
        Wallets.push(new Wallet({
          id,
          address,
          name,
          amount,
          assurance,
          hasPassword,
          isLocked,
          isStaking,
          passwordUpdateDate
        }));
      } catch (error) {
        // there is no wallet data in local storage - use fallback data
        const fallbackWalletData = {
          id,
          name: 'Main',
          assurance: 'CWANormal',
          passwordUpdateDate: new Date()
        };
        const { name, assurance, passwordUpdateDate } = fallbackWalletData;
        await setLuxWalletData({
          id,
          name,
          assurance,
          passwordUpdateDate
        });
        Wallets.push(new Wallet({
          id,
          address,
          name,
          amount,
          assurance,
          hasPassword,
          isLocked,
          isStaking,
          passwordUpdateDate
        }));
      }
      return Wallets;
    } catch (error) {
      Logger.error('LuxApi::getWallets error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  };

  async getAccountBalance(walletId: string): Promise<GetTransactionsResponse> {
    Logger.debug('LuxApi::getAccountBalance called');
    try {
      const confirmations = 0;
      const response: LuxWalletBalance = await getLuxAccountBalance({
        walletId,
        confirmations
      });
      Logger.debug('LuxApi::getAccountBalance success: ' + stringifyData(response));
      return response;
    } catch (error) {
      Logger.error('LuxApi::getAccountBalance error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }

  getTransactions = async (request: GetTransactionsRequest): Promise<GetTransactionsResponse> => {
    Logger.debug('LuxApi::getTransactions called: ' + stringifyData(request));
    try {
      //const walletId = request.walletId;
      const walletId = '';//default account
      const { count, skip} = request;
      //const mostRecentBlockNumber: LuxBlockNumber = await getLuxBlockNumber();

      let transactions: LuxTransactions = await getLuxTransactions({
        walletId,
        count,
        skip
      });
      /*const sendTransactions: LuxTransactions = await getLuxTransactions({
        walletId: '',
        fromBlock: Math.max(mostRecentBlockNumber - 10000, 0),
        toBlock: mostRecentBlockNumber
      });*/
      //transactions = transactions.concat(...sendTransactions);
      const allTxs = await Promise.all(
        transactions.filter( (tx: LuxTransaction) => tx.category !== 'move').map(async (tx: LuxTransaction) => {
          if(tx.generated)
          {
            return _createWalletTransactionFromServerData(transactionTypes.GENERATE, tx);
          }

          if (tx.category === 'receive') {
            return _createWalletTransactionFromServerData(transactionTypes.INCOME, tx);
          }

          if (tx.category === 'send') {
            return _createWalletTransactionFromServerData(transactionTypes.EXPEND, tx);
          }
        })
      );

      allTxs.sort((a,b) => b.date - a.date);
      return {
        transactions: allTxs,
        total: allTxs.length
      };
    } catch (error) {
      Logger.error('LuxApi::getTransactions error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  };

  async importWallet(request: ImportWalletRequest): Promise<ImportWalletResponse> {
    Logger.debug('LuxApi::importWallet called: ');
    const { name, privateKey, password } = request;
    Logger.debug('LuxApi::importWallet called: ' + privateKey);
    let ImportWallet = null;
    try {
      const account = '';
      const oldAddresses: LuxAddresses = await getLuxAddressesByAccount({account});
      const label = '';
      const rescan = false;
      await importLuxPrivateKey({privateKey, label, rescan});
      const newAddresses: LuxAddresses = await getLuxAddressesByAccount({account});
      Logger.debug('LuxApi::getLuxAddressesByAccount success: ' + name);

      let newAddress = null;
      if(newAddresses.length - oldAddresses.length==1){
        newAddresses.forEach(async function(currUnAssAdd,indexUnAssAdd,arrUnAssAdd){
            var newUnAssAdd=oldAddresses.find(function(currUnAssAddOld,indexUnAssAddOld,arrUnAssAddOld){
                return currUnAssAddOld===currUnAssAdd;
            })
            if(!newUnAssAdd){
              newAddress = newAddresses[indexUnAssAdd];
            }
        })
      }

      if (newAddress) {
        const address = newAddress;
        const walletId = newAddress;
        await setLuxAccount({ address, walletId });
        Logger.debug('LuxApi::importWallet success');
        const id = address;
        const amount = quantityToBigNumber('0');
        const assurance = 'CWANormal';
        const hasPassword = password !== null;
        const passwordUpdateDate = hasPassword ? new Date() : null;
        await setLuxWalletData({
          id,
          name,
          assurance,
          passwordUpdateDate
        });
        ImportWallet = new Wallet({
          id,
          address,
          name,
          amount,
          assurance,
          hasPassword,
          passwordUpdateDate
        });
      }

    } catch (error) {
      Logger.error('LuxApi::importWallet error: ' + stringifyError(error));
      throw error; // Error is handled in parent method (e.g. createWallet/restoreWallet)
    }

    return ImportWallet;
  }

  createWallet = async (request: CreateWalletRequest): Promise<CreateWalletResponse> => {
    Logger.debug('LuxApi::createWallet called');
    const { name, mnemonic, password } = request;
    const privateKeyHex = mnemonicToSeedHex(mnemonic);

    // var ck = CoinKey.fromWif('Q1mY6nVLLkV2LyimeMCViXkPZQuPMhMKq8HTMPAiYuSn72dRCP4d')
    // Logger.error('LuxApi::createWallet private: ' + ck.versions.private.toString());
    // Logger.error('LuxApi::createWallet public: ' + ck.versions.public.toString());

    Logger.debug('LuxApi::createWallet success: ' + privateKeyHex);
    const coinkey = new CoinKey(new Buffer(privateKeyHex, 'hex'), { private: 155, public: 27 });
    const privateKey = coinkey.privateWif;
    Logger.debug('LuxApi::createWallet success: ' + privateKey);
    try {
      const response: ImportWalletResponse = await this.importWallet({
        name,
        privateKey,
        password
      });
      Logger.debug('LuxApi::createWallet success: ' + stringifyData(response));
      return response;
    } catch (error) {
      Logger.error('LuxApi::createWallet error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  };

  getWalletRecoveryPhrase(): Promise<GetWalletRecoveryPhraseResponse> {
    Logger.debug('LuxApi::getWalletRecoveryPhrase called');
    try {
      const response: Promise<LuxWalletRecoveryPhraseResponse> = new Promise(
        (resolve) => resolve(getLuxAccountRecoveryPhrase())
      );
      Logger.debug('LuxApi::getWalletRecoveryPhrase success');
      return response;
    } catch (error) {
      Logger.error('LuxApi::getWalletRecoveryPhrase error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }

  async createTransaction(request: CreateTransactionRequest): Promise<CreateTransactionResponse> {
    Logger.debug('LuxApi::createTransaction called');
    try {
      const senderAccount = request.from;
      const { from, to, value, password } = request;
      if(password !== '')
      {
        await unlockLuxWallet({ password, timeout: 20 });
      }
      Logger.debug('LuxApi::createTransaction value : ' + value.toNumber() );
      const txHash: LuxTxHash = await sendLuxTransaction({
        from,
        to,
        value: value.toNumber()
      });

      if(password !== '')
      {
        await lockLuxWallet();
      }

      Logger.debug('LuxApi::createTransaction success: ' + stringifyData(txHash));
      return _createTransaction(senderAccount, txHash);
    } catch (error) {
      console.error(error);
      Logger.error('LuxApi::createTransaction error: ' + stringifyError(error));
      if (error.message.includes('passphrase')) {
        throw new IncorrectWalletPasswordError();
      }
      throw new GenericApiError();
    }
  }

  async updateWallet(request: UpdateWalletRequest): Promise<UpdateWalletResponse> {
    Logger.debug('LuxApi::updateWallet called: ' + stringifyData(request));
    const { id, name, amount, assurance, hasPassword, passwordUpdateDate } = request;
    try {
      await setLuxWalletData({
        id,
        name,
        assurance,
        passwordUpdateDate
      });
      Logger.debug('LuxApi::updateWallet success: ' + stringifyData(request));
      return new Wallet({ id, name, amount, assurance, hasPassword, passwordUpdateDate });
    } catch (error) {
      Logger.error('LuxApi::updateWallet error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }

  async updateWalletPassword(
    request: UpdateWalletPasswordRequest
  ): Promise<UpdateWalletPasswordResponse> {
    Logger.debug('LuxApi::updateWalletPassword called');
    const { walletId, oldPassword, newPassword } = request;
    //console.log('walletId: ' + walletId);
    //console.log('oldPassword: ' + oldPassword);
    //console.log('newPassword: ' + newPassword);
    try {
      if(oldPassword !== null)
      {
        await changeLuxWalletPassphrase({
          walletId,
          oldPassword,
          newPassword
        });
      }
      else{
        await encryptLuxWallet({
          newPassword
        });
      }
      
      Logger.debug('LuxApi::updateWalletPassword success');
      console.log('LuxApi::updateWalletPassword success');
      const hasPassword = newPassword !== null;
      const passwordUpdateDate = hasPassword ? new Date() : null;
      await updateLuxWalletData({
        id: walletId,
        passwordUpdateDate
      });
      return true;
    } catch (error) {
      Logger.error('LuxApi::updateWalletPassword error: ' + stringifyError(error));
      if (error.message.includes('passphrase')) {
        throw new IncorrectWalletPasswordError();
      }
      throw new GenericApiError();
    }
  }

  async lockWallet(): Promise<LockWalletResponse> {
    Logger.debug('LuxApi::lockWallet called');
    try {
      await lockLuxWallet();
      Logger.debug('LuxApi::lockWallet success');
      return true;
    } catch (error) {
      Logger.error('LuxApi::lockWallet error: ' + stringifyError(error));
      throw new GenericApiError();
    }
    return false;
  }

  async unlockWallet(
    request: UnlockWalletRequest
  ): Promise<UnlockWalletResponse> {
    Logger.debug('LuxApi::unlockWallet called');
    const { password } = request;
    const timeout = 0;
    //console.log('password: ' + password);
    try {
        await unlockLuxWallet({
          password,
          timeout
        });
      Logger.debug('LuxApi::unlockWallet success');
      return true;
    } catch (error) {
      Logger.error('LuxApi::unlockWallet error: ' + stringifyError(error));
      if (error.message.includes('passphrase')) {
        throw new IncorrectWalletPasswordError();
      }
      throw new GenericApiError();
    }
    return false;
  }
/*
  async renameWallet(request: RenameWalletRequest): Promise<RenameWalletResponse> {
    Logger.debug('LuxApi::renameWallet called: ' + stringifyData(request));
    const { walletId } = request;
    try {
      await deleteLuxAccount({ ca, walletId });
      Logger.debug('LuxApi::renameWallet success: ' + stringifyData(request));
      await unsetLuxWalletData(walletId); // remove wallet data from local storage
      return true;
    } catch (error) {
      Logger.error('LuxApi::renameWallet error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }
*/
  restoreWallet = async (request: RestoreWalletRequest): Promise<RestoreWalletResponse> => {
    Logger.debug('LuxApi::restoreWallet called');
    const { recoveryPhrase: mnemonic, walletName: name, walletPassword: password } = request;
    const privateKey = mnemonicToSeedHex(mnemonic);
    try {
      const wallet: ImportWalletResponse = await this.importWallet({ name, privateKey, password });
      Logger.debug('LuxApi::restoreWallet success: ' + stringifyData(wallet));
      return wallet;
    } catch (error) {
      Logger.error('LuxApi::restoreWallet error: ' + stringifyError(error));
      if (error.message.includes('account already exists')) {
        throw new WalletAlreadyRestoredError();
      }
      throw new GenericApiError();
    }
  };

  async getWalletBalance(walletId: string): Promise<GetWalletBalanceResponse> {
    let balance = [];
    try {
      const account = walletId;
      const bodyAddresses: LuxAddresses = await getLuxAddressesByAccount({account});

      var addresses = [];
      bodyAddresses.forEach(function(add){
        if(add.charAt(0)=='L'||add.charAt(0)=='S'){
            //addsWithoutBech.addresses.push(add);
            addresses.push(add);
        }
      })
  
      const minconf = 1;
      const maxconf = 9999999;
      const unspent: LuxTransactions = await getLuxUnspentTransactions({minconf, maxconf, addresses});
      Logger.debug('LuxApi::getWalletBalance success: ' + walletId + ' ' + stringifyData(unspent));

      addresses.forEach(function (currAdd, indexAdd, arrayAdd) {
        let sum = 0.0;
        if(unspent.length>0){
            unspent.forEach(function (currTra, indexTra, arrayTra) {
                if (currTra.address == currAdd) {
                    sum += currTra.amount;
                }
                if (indexTra == unspent.length - 1) {
                  balance.push(sum);
                }
            });
        }
      });

    } catch (error)
    {
      Logger.error('LuxApi::getWalletBalance error: ' + stringifyError(error));
      throw error;
    }
    return balance.reduce((a, b) => a + b, 0);
  }

  async getAddresses(request: GetAddressesRequest): Promise<GetAddressesResponse> {
    Logger.debug('LuxApi::getAddresses called: ' + stringifyData(request));
    try {
      /*const walletId = '';//default account
      const count = 100; const skip = 0;
      let transactions: LuxTransactions = await getLuxTransactions({
        walletId,
        count,
        skip
      });*/
      
      const account = '';
      let bodyAddresses: LuxAddresses = await getLuxAddressesByAccount({account});
      Logger.debug('LuxApi::getAddresses success: ' + stringifyData(bodyAddresses));

      var addresses = [];
      bodyAddresses.forEach(function(add){
        if(add.charAt(0)=='L'||add.charAt(0)=='S'){
            //addsWithoutBech.addresses.push(add);
            addresses.push(add);
        }
      })

      const minconf = 1;
      const maxconf = 9999999;
      let unspent: LuxTransactions = await getLuxUnspentTransactions({minconf, maxconf, addresses});
      Logger.debug('LuxApi::getWalletBalance success: ' + stringifyData(unspent));

      /*if (transactions.length > 0) {
        transactions.sort((a, b) => b.confirmations - a.confirmations);
      }

      if (transactions.length > 0) {
        transactions.sort(function (a, b) {
          return b.confirmations - a.confirmations
        }).forEach((tx,indextx,arrtx)=>{


          if(((tx.generated&&(tx.confirmations>10))||tx.confirmations<3) && req.query.exact){
            unspent.push({confirmations:tx.confirmations,amount:tx.amount,address:tx.address,spendable:false})
          }

          if(indextx==arrtx.length-1){
              calcBalance(values[1]);
          }
        })
      }*/

      var balances = [];
      addresses.forEach(function (currAdd, indexAdd, arrayAdd) {
        var sum = 0.0;
        if (unspent.length > 0) {
            unspent.forEach(function (currTra, indexTra, arrayTra) {
              if (currTra.address == currAdd) {
                  if(currTra.spendable){
                      sum += currTra.amount;
                  }
              }
              if (indexTra == unspent.length - 1) {
                  var existingAdd = balances.find(function (address) {
                      return address.address == currAdd
                  });
                  if (existingAdd) {
                      existingAdd.balance += sum;
                  } else {
                      balances.push({address: currAdd, balance: sum});
                  }
                  //balances.push({address: currAdd, balance: sum});
              }
            })
        } else if (unspent.length == 0) {
            balances.push({address: currAdd, balance: sum});
        }
      });

      balances.sort((a, b) => b.balance - a.balance);

      return new Promise((resolve) => resolve({
        addresses: balances.map(data => _createAddressFromServerData(data))
      }));

    } catch (error) {
      Logger.error('LuxApi::getAddresses error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }

  async calculateTransactionFee(request: TransactionFeeRequest): Promise<TransactionFeeResponse> {
    Logger.debug('LuxApi::calculateTransactionFee called');
    const { sender, receiver, amount } = request;
    
    try {
      //const { blocks } = request;
      const blocks = 25;
      //const estimatedFee: LuxFee = await getLuxEstimatedFee({
      //  blocks,
      //});
      const estimatedFee = 0.0001;
      Logger.debug('LuxApi::getEstimatedResponse success: ' + estimatedFee);
      return quantityToBigNumber(estimatedFee);
    } catch (error) {
      if (error.message.includes('Insufficient funds')) {
        throw new NotEnoughFundsForTransactionFeesError();
      }
      Logger.error('LuxApi::getEstimatedFeeResponse error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }

  async createAddress(request: CreateAddressRequest): Promise<CreateAddressResponse> {
    Logger.debug('LuxApi::createAddress called');
    const { accountId, password } = request;
    try {
      const response: LuxAddress = await getLuxNewAddress(
        { password, accountId }
      );
      Logger.debug('LuxApi::createAddress success: ' + stringifyData(response));
      //return _createAddressFromServerData(response);
      return response;
    } catch (error) {
      Logger.error('LuxApi::createAddress error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }

  isValidMnemonic(mnemonic: string): Promise<boolean> {
    return isValidMnemonic(mnemonic, 12);
  }

  isValidAddress(address: string): Promise<boolean> {
    return Promise.resolve(isValidLuxAddress({ address }));
  }
/*
  async importWalletFromKey(
    request: ImportWalletFromKeyRequest
  ): Promise<ImportWalletFromKeyResponse> {
    Logger.debug('LuxApi::importWalletFromKey called');
    const { filePath, walletPassword } = request;
    try {
      const importedWallet: LuxWallet = await importLuxWallet(
        { ca, walletPassword, filePath }
      );
      Logger.debug('LuxApi::importWalletFromKey success');
      return _createWalletFromServerData(importedWallet);
    } catch (error) {
      Logger.error('LuxApi::importWalletFromKey error: ' + stringifyError(error));
      if (error.message.includes('already exists')) {
        throw new WalletAlreadyImportedError();
      }
      throw new WalletFileImportError();
    }
  }

  async importWalletFromFile(
    request: ImportWalletFromFileRequest
  ): Promise<ImportWalletFromFileResponse> {
    Logger.debug('LuxApi::importWalletFromFile called');
    const { filePath, walletPassword } = request;
    const isKeyFile = filePath.split('.').pop().toLowerCase() === 'key';
    try {
      const importedWallet: LuxWallet = isKeyFile ? (
        await importLuxWallet({ ca, walletPassword, filePath })
      ) : (
        await importLuxBackupJSON({ ca, filePath })
      );
      Logger.debug('LuxApi::importWalletFromFile success');
      return _createWalletFromServerData(importedWallet);
    } catch (error) {
      Logger.error('LuxApi::importWalletFromFile error: ' + stringifyError(error));
      if (error.message.includes('already exists')) {
        throw new WalletAlreadyImportedError();
      }
      throw new WalletFileImportError();
    }
  }
*/
  async importPrivateKey(privateKey: string): Promise<ImportPrivateKeyResponse> {
    Logger.debug('LuxApi::importPrivateKey called');
    try {
      const label = '';
      const rescan = false;
      await importLuxPrivateKey({privateKey, label, rescan});
      Logger.debug('LuxApi::importPrivateKey success');
      return true;
    } catch (error) {
      Logger.error('LuxApi::importPrivateKey error: ' + stringifyError(error));
      throw new GenericApiError();
    }
    return false;
  }

  async exportPrivateKey(address: string): Promise<ExportPrivateKeyResponse> {
    Logger.debug('LuxApi::exportPrivateKey called');
    try {
      const privateKey = await exportLuxPrivateKey({address});
      Logger.debug('LuxApi::exportPrivateKey success');
      return privateKey;
    } catch (error) {
      Logger.error('LuxApi::exportPrivateKey error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }

  async backupWallet(destination: string): Promise<BackupWalletResponse> {
    Logger.debug('LuxApi::backupWallet called');
    try {
      await backupLuxWallet({destination});
      Logger.debug('LuxApi::backupWallet success');
      return true;
    } catch (error) {
      Logger.error('LuxApi::backupWallet error: ' + stringifyError(error));
      throw new GenericApiError();
    }
    return false;
  }

  async nextUpdate(): Promise<NextUpdateResponse> {
    Logger.debug('LuxApi::nextUpdate called');
    let nextUpdate = null;
    return nextUpdate;
  }
/*
  async exportWalletToFile(
    request: ExportWalletToFileRequest
  ): Promise<ExportWalletToFileResponse> {
    const { walletId, filePath } = request;
    Logger.debug('LuxApi::exportWalletToFile called');
    try {
      const response: Promise<[]> = await exportLuxBackupJSON({ ca, walletId, filePath });
      Logger.debug('LuxApi::exportWalletToFile success: ' + stringifyData(response));
      return response;
    } catch (error) {
      Logger.error('LuxApi::exportWalletToFile error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }

  async testReset(): Promise<void> {
    Logger.debug('LuxApi::testReset called');
    try {
      const response: Promise<void> = await luxTestReset({ ca });
      Logger.debug('LuxApi::testReset success: ' + stringifyData(response));
      return response;
    } catch (error) {
      Logger.error('LuxApi::testReset error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }
*/
  /////////////////////////////// MASTERNODE API ///////////////////////////////////

  async createMasternode(alias: string): Promise<CreateMasternodeResponse> {
    Logger.debug('LuxApi::createMasternode called');
    try {
      const walletId = alias;
      const response: LuxAddress = await getLuxAccountAddress({ walletId });
      return response;
    } catch (error) {
      Logger.error('LuxApi::createMasternode error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }

  async getMasternodeGenkey(): Promise<GetMasternodeGenkeyResponse> {
    Logger.debug('LuxApi::getMasternodeGenkey called');
    try {
      const response = await getLuxMasternodeGenkey();
      return response;
    } catch (error) {
      Logger.error('LuxApi::getMasternodeGenkey error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }

  async getMasternodeList(): Promise<GetMasternodeListResponse> {
    Logger.debug('LuxApi::getMasternodeList called');
    try {
      let attribute = 'rank'
      const masterNodesRank = await getLuxMasternodeList({attribute});
      attribute = 'active'
      const masterNodesActive = await getLuxMasternodeList({attribute});
      attribute = 'activeseconds'
      const masterNodesActiveSeconds = await getLuxMasternodeList({attribute});
      attribute = 'lastseen'
      const masterNodesLastSeen = await getLuxMasternodeList({attribute});
      attribute = 'pubkey'
      const masterNodesPubkey = await getLuxMasternodeList({attribute});
      
      const allMasternodes = await Promise.all(
        Object.keys(masterNodesRank).map(async id => {
            const address = id;
            const rank = masterNodesRank[id];
            const active = masterNodesActive[id];
            const activeSeconds = masterNodesActiveSeconds[id];
            const lastSeen = masterNodesLastSeen[id];
            const pubKey = masterNodesPubkey[id];
            return new Masternode({
              address,
              rank,
              active,
              activeSeconds,
              lastSeen,
              pubKey
            });
        })
      );

      return {
        masternodes: allMasternodes,
        total: allMasternodes.length
      };
    } catch (error) {
      Logger.error('LuxApi::getMasternodeList error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }

  async startMasternode(request: StartMasternodeRequest): Promise<StartMasternodeResponse> {
    Logger.debug('LuxApi::startMasternode called');
    try {
      const {alias, password} = request;
      const result = await startLuxMasternode({alias, password});
      return new Promise((resolve) => resolve({
        alias: alias,
        result: result
      }));
    } catch (error) {
      Logger.error('LuxApi::startMasternode error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }

  async startManyMasternode(password: string): Promise<StartManyMasternodeResponse> {
    Logger.debug('LuxApi::startManyMasternode called');
    try {
      const response = await startManyLuxMasternode({password});
      const details = response.detail;
      return await Promise.all(
        Object.entries(details).map(async detail => {
            const alias = detail[1].alias;
            const result = detail[1].result;
            return new Promise((resolve) => resolve({
              alias: alias,
              result: result
            }));
        })
      );
    } catch (error) {
      Logger.error('LuxApi::startManyMasternode error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }

  async stopMasternode(request: StopMasternodeRequest): Promise<StopMasternodeResponse> {
    Logger.debug('LuxApi::stopMasternode called');
    try {
      const {alias, password} = request;
      const result = await stopLuxMasternode({alias, password});
      return new Promise((resolve) => resolve({
        alias: alias,
        result: result
      }));
    } catch (error) {
      Logger.error('LuxApi::stopMasternode error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }

  async stopManyMasternode(password: string): Promise<StopManyMasternodeResponse> {
    Logger.debug('LuxApi::stopManyMasternode called');
    try {
      const response = await stopManyLuxMasternode({password});
      const details = response.detail;
      
      return await Promise.all(
        Object.entries(details).map(async detail => {
            const alias = detail[1].alias;
            const result = detail[1].result;
            return new Promise((resolve) => resolve({
              alias: alias,
              result: result
            }));
        })
      );
    } catch (error) {
      Logger.error('LuxApi::stopManyMasternode error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }

  async getMasternodeOutputs(): Promise<GetMasternodeOutputsResponse> {
    Logger.debug('LuxApi::getMasternodeOutputs called');
    try {
      const response = await getLuxMasternodeOutputs();
      return stringifyData(response);
    } catch (error) {
      Logger.error('LuxApi::getMasternodeOutputs error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }

  async createContract(request: CreateLuxContractRequest): Promise<CreateLuxContractResponse> {
    Logger.debug('LuxApi::createContract called');
    try {
      const {bytecode, gasLimit, gasPrice, senderaddress} = request;
      const result = await createLuxContract({bytecode, gasLimit, gasPrice, senderaddress});
      return new Promise((resolve) => resolve({
        txid: result.txid,
        sender: result.sender,
        hash160: result.hash160,
        address: result.address
      }));
    } catch (error) {
      Logger.error('LuxApi::createContract error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }

  async callContract(request: CallLuxContractRequest): Promise<CallLuxContractResponse> {
    Logger.debug('LuxApi::callContract called');
    try {
      const {address, data, senderaddress } = request;
      const response = await callLuxContract({address, data, senderaddress});
      return true;
    } catch (error) {
      Logger.error('LuxApi::callContract error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }

  async sendToContract(request: SendToLuxContractRequest): Promise<SendToLuxContractResponse> {
    Logger.debug('LuxApi::sendToContract called');
    try {
      const {contractaddress, datahex, amount, gasLimit, gasPrice, senderaddress} = request;
      const result = await sendToLuxContract({contractaddress, datahex, amount, gasLimit, gasPrice, senderaddress});
      return new Promise((resolve) => resolve({
        txid: result.txid,
        sender: result.sender,
        hash160: result.hash160
      }));
    } catch (error) {
      Logger.error('LuxApi::sendToContract error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }

  async sendToConsoleCommand(request: SendCommandToConsoleRequest): Promise<SendCommandToConsoleResponse> {
    Logger.debug('LuxApi::sendToConsoleCommand called');
    try {
      const command = request.command;
      const param = request.param ? request.param.split(' ') : [];
      const result = await sendCommandToConsole({command, param});
      return result;
    } catch (error) {
      Logger.error('LuxApi::sendCommandToConsole error: ' + stringifyError(error));
      throw new GenericApiError();
    }
  }
}
// ========== TRANSFORM SERVER DATA INTO FRONTEND MODELS =========

const _createWalletTransactionFromServerData = async (
  type: TransactionType,
  txData: LuxTransaction
): Promise<WalletTransaction> => {
  const { txid, blockHash, amount, address, confirmations, time } = txData;
  // const txBlock: ?LuxBlock = blockHash ? await getLuxBlockByHash({
  //  blockHash,
  // }) : null;

  //blocktime isn't returned right after a transaction is sent
  //const blockDate = blocktime !== null && blocktime !== undefined ? unixTimestampToDate(blocktime) : unixTimestampToDate(Date.now() / 1000 | 0);
  return new WalletTransaction({
    id: txid,
    type,
    title: '',
    description: '',
    amount: type === transactionTypes.GENERATE ? quantityToBigNumber(0.8) : quantityToBigNumber(amount),
    date: unixTimestampToDate(time),
    numberOfConfirmations: confirmations,
    address,
    addresses: null,
    state: confirmations < 3 ? transactionStates.PENDING : transactionStates.OK
  });
};

const _createTransaction = async (senderAccount: LuxWalletId, txHash: LuxTxHash) => {
  const txData: LuxTransaction = await getLuxTransactionByHash({
    txHash
  });
  if(txData.confirmations < 0) //Negative confirmations indicate the transaction conflicts with the block chain
  {
    return null;
  } 
  const type = senderAccount === txData.from ? transactionTypes.EXPEND : transactionTypes.INCOME;
  return _createWalletTransactionFromServerData(type, txData);
};

const _createWalletFromServerData = action(
  'LuxApi::_createWalletFromServerData', (data: LuxWallet) => (
    new Wallet({
      id: data.cwId,
      amount: new BigNumber(data.cwAmount.getCCoin).dividedBy(LOVELACES_PER_LUX),
      name: data.cwMeta.cwName,
      assurance: data.cwMeta.cwAssurance,
      hasPassword: data.cwHasPassphrase,
      passwordUpdateDate: unixTimestampToDate(data.cwPassphraseLU),
    })
  )
);

const _createAddressFromServerData = action(
  'LuxApi::_createAddressFromServerData', (data: Object) => (
    new WalletAddress({
      address: data.address,
      balance: new BigNumber(data.balance),
      isUsed: true,
    })
  )
);

const _conditionToTxState = (condition: string) => {
  switch (condition) {
    case 'CPtxApplying': return 'pending';
    case 'CPtxWontApply': return 'failed';
    default: return 'ok'; // CPtxInBlocks && CPtxNotTracked
  }
};

const _createTransactionFromServerData = action(
  'LuxApi::_createTransactionFromServerData', (data: LuxTransaction) => {
    const coins = data.ctAmount.getCCoin;
    const { ctmTitle, ctmDescription, ctmDate } = data.ctMeta;
    return new WalletTransaction({
      id: data.ctId,
      title: ctmTitle || data.ctIsOutgoing ? 'Lux sent' : 'Lux received',
      type: data.ctIsOutgoing ? transactionTypes.EXPEND : transactionTypes.INCOME,
      amount: new BigNumber(data.ctIsOutgoing ? -1 * coins : coins).dividedBy(LOVELACES_PER_LUX),
      date: unixTimestampToDate(ctmDate),
      description: ctmDescription || '',
      numberOfConfirmations: data.ctConfirmations,
      addresses: {
        from: data.ctInputs.map(address => address[0]),
        to: data.ctOutputs.map(address => address[0]),
      },
      state: _conditionToTxState(data.ctCondition),
    });
  }
);

const _createTransactionFeeFromServerData = action(
  'LuxApi::_createTransactionFeeFromServerData', (data: LuxTransactionFee) => {
    const coins = data.getCCoin;
    return new BigNumber(coins).dividedBy(LOVELACES_PER_LUX);
  }
);
