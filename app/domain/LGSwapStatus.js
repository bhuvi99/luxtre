// @flow
import { observable } from 'mobx';

export type LGSwap = {
  requestid: number,
  quoteid: number,
  iambob: 0,
  bob: string,
  srcamount: number,
  bobtxfee: number,
  alice: string,
  destamount: number,
  alicetxfee: number,
  sentflags: Array<string>,
  values: Array<number>,
  result: string,
  status: string,
  bobdeposit: string,
  alicepayment: string,
  bobpayment: string,
  paymentspent: string,
  Apaymentspent: string,
  depositspent: string
};

export default class LGSwapStatus {
  // [timestamp, high, low, open, close, relvolume, basevolume, aveprice, numtrades]
  @observable
  swaps: Array<LGSwap>;

  constructor(data: { swaps: Array<LGSwap> }) {
    Object.assign(this, data);
  }
}
