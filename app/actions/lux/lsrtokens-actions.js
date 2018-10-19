// @flow
import Action from '../lib/Action';

// ======= CONTRACT ACTIONS =======

export default class LsrTokensActions {
  saveToken: Action<{
    payto: string,
    amount: number,
    description: string,
    gasLimit: number,
    gasprice: number,
    receiveaddress: string,
    contractaddress: string,
    tokenname: string,
    tokensymbol: string,
    decimals: string,
    senderaddress: string,
  }> = new Action();
}
