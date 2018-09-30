// @flow
import { observable } from 'mobx';

export type LGBalance = {
  coin: string,
  balance: number
};

export default class LGBalances {
  @observable
  balances: Array<LGBalance>;

  constructor(data: { balances: Array<LGBalance> }) {
    Object.assign(this, data);
  }
}
