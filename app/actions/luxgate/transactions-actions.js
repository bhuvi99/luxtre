// @flow
import Action from '../lib/Action';

// ======= WALLET ACTIONS =======

export default class TransactionsActions {
  getLGOpenOrders: Action<*> = new Action();
  getLGTransactions: Action<{ coin: string, address: string }> = new Action();
  getLGSwapStatus: Action<{ requestid?: string, quoteid?: string }> = new Action();
}
