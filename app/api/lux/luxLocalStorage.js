// @flow
import localStorage from 'electron-json-storage';
import { set, unset } from 'lodash';
import type { AssuranceModeOption } from '../../types/transactionAssuranceTypes';
import environment from '../../environment';

const networkForLocalStorage = String(environment.NETWORK);
const localStorageKeys = {
  WALLETS: networkForLocalStorage + '-LUX-WALLETS',
  STAKINGS: networkForLocalStorage + '-LUX-STAKINGS'
};

/**
 * This api layer provides access to the electron local storage
 * for account/wallet properties that are not synced with LUX backend.
 */

export type LuxWalletData = {
  id: string,
  name: string,
  assurance: AssuranceModeOption,
  passwordUpdateDate: ?Date,
};

export type LuxWalletsData = {
  wallets: Array<LuxWalletData>,
};

export type LuxStakingData = {
  stakingweight: number,
  netstakingweight: number,
  difficulty: number,
  time: number
};

export type LuxStaingsData = {
  stakings: Array<LuxStakingData>,
};

export const getLuxWalletsData = (): Promise<LuxWalletsData> => new Promise((resolve, reject) => {
  localStorage.get(localStorageKeys.WALLETS, (error, response) => {
    if (error) return reject(error);
    if (!response.wallets) return resolve({ wallets: [] });
    resolve(response.wallets);
  });
});

export const setLuxWalletsData = (
  walletsData: Array<LuxWalletData>
): Promise<void> => new Promise((resolve, reject) => {
  const wallets = {};
  walletsData.forEach(walletData => {
    wallets[walletData.id] = walletData;
  });
  localStorage.set(localStorageKeys.WALLETS, { wallets }, (error) => {
    if (error) return reject(error);
    resolve();
  });
});

export const getLuxWalletData = (
  walletId: string
): Promise<LuxWalletData> => new Promise(async (resolve) => {
  const walletsData = await getLuxWalletsData();
  resolve(walletsData[walletId]);
});

export const setLuxWalletData = (
  walletData: LuxWalletData
): Promise<void> => new Promise(async (resolve, reject) => {
  const walletsData = await getLuxWalletsData();
  set(walletsData, walletData.id, walletData);
  localStorage.set(localStorageKeys.WALLETS, { wallets: walletsData }, (error) => {
    if (error) return reject(error);
    resolve();
  });
});

export const updateLuxWalletData = (
  walletData: {
    id: string,
    name?: string,
    assurance?: AssuranceModeOption,
    passwordUpdateDate?: ?Date,
  }
): Promise<void> => new Promise(async (resolve, reject) => {
  const walletsData = await getLuxWalletsData();
  const walletId = walletData.id;
  Object.assign(walletsData[walletId], walletData);
  localStorage.set(localStorageKeys.WALLETS, { wallets: walletsData }, (error) => {
    if (error) return reject(error);
    resolve();
  });
});

export const unsetLuxWalletData = (
  walletId: string
): Promise<void> => new Promise(async (resolve, reject) => {
  const walletsData = await getLuxWalletsData();
  unset(walletsData, walletId);
  localStorage.set(localStorageKeys.WALLETS, { wallets: walletsData }, (error) => {
    if (error) return reject(error);
    resolve();
  });
});

export const unsetLuxWalletsData = (): Promise<void> => new Promise((resolve) => {
  localStorage.remove(localStorageKeys.WALLETS, () => {
    resolve();
  });
});

export const getLuxStakingsData = (): Promise<LuxStakingsData> => new Promise((resolve, reject) => {
  localStorage.get(localStorageKeys.STAKINGS, (error, response) => {
    if (error) return reject(error);
    if (!response.stakings) return resolve({ stakings: [] });
    resolve(response.stakings);
  });
});

export const setLuxStakingsData = (
  stakingsData: Array<LuxStakingData>
): Promise<void> => new Promise((resolve, reject) => {
  const stakings = {};
  stakingsData.forEach(stakingData => {
    stakings[stakingData.id] = stakingData;
  });
  localStorage.set(localStorageKeys.STAKINGS, { stakings }, (error) => {
    if (error) return reject(error);
    resolve();
  });
});

export const getLuxStakingData = (
  walletId: string
): Promise<LuxStakingData> => new Promise(async (resolve) => {
  const stakingDataSet = await getLuxStakingsData();
  resolve(stakingDataSet[walletId]);
});

export const setLuxStakingData = (
  walletId: string, stakingStatus: LuxStakingData
): Promise<void> => new Promise(async (resolve, reject) => {
  
  var stakingsData = [];
  const stakingDataSet = await getLuxStakingsData();
  const result = stakingDataSet[walletId];
  if(result != null && result.length > 0)
  {
    stakingsData = result.filter(stakingData => stakingData.time > currentTime - LUX_STAKE_RECORD_DEEP * 1000)
  }
  
  stakingsData.push(stakingStatus);
  set(stakingDataSet, walletId, stakingsData);
  localStorage.set(localStorageKeys.STAKINGS, { stakings: stakingDataSet }, (error) => {
    if (error) return reject(error);
    resolve();
  });
});