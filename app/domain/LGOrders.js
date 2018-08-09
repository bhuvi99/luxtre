// @flow
import { observable } from 'mobx';

export type LGBid = {
  coin: string,
  address: string,
  price: number,
  numutxos: number,
  minvolume: number,
  maxvolume: number,
  pubkey: string,
  age: number
};

export type LGAsk = LGBid;

export default class LGOrders {
  @observable
  asks: Array<LGAsk>;
  @observable
  numasks: number;
  @observable
  bids: Array<LGBid>;
  @observable
  numbids: number;

  constructor(data: { bids: Array<LGBid>, numbids: number, asks: Array<LGAsk>, numasks: number }) {
    Object.assign(this, data);
  }
}
