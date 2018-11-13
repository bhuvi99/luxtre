// @flow
import { observable } from 'mobx';
import BigNumber from 'bignumber.js';

export default class WalletAddress {

  @observable address: string = '';
  @observable balance: BigNumber;
  @observable isUsed: boolean = false;

  constructor(data: {
    address: string,
    balance: BigNumber,
    isUsed: boolean,
  }) {
    Object.assign(this, data);
  }

}
