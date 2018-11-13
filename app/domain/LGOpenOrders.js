// @flow
import { observable } from 'mobx';

export type LGOpenOrder = {
  bid: number,
  ask: number,
  base: string,
  rel: string
};

export default class LGOpenOrders {
  @observable
  openOrders: Array<LGOpenOrder>;

  constructor(data: { openOrders: Array<LGOpenOrder> }) {
    Object.assign(this, data);
  }
}
