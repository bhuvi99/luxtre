// @flow
import { observable, computed, action, runInAction } from 'mobx';
import Store from '../lib/Store';
import Request from '../lib/LocalizedRequest';
import type {
  CallLuxContractResponse
} from '../../api/common';

export default class LuxLSRTokensStore extends Store {

  // REQUESTS
  @observable payto: string = '';
  @observable amount: number  = 0;
  @observable description: string = '';
  @observable gaslimit: number = 2500000;
  @observable gasprice: number = 0.0000004;

  @observable receiveaddress: string = '';

  @observable contractaddress: string = '';
  @observable tokenname: string = '';
  @observable tokensymbol: string = '';
  @observable decimals: string = '';
  @observable senderaddress: string = '';
  
  setup() {
    super.setup();
    const { router, lux } = this.actions;
    const { contracts } = lux;
  }

  saveToken = (
    params: {
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
    }) => {
      if(params.payto != undefined) this.payto = params.payto;
      if(params.amount != undefined) this.amount = params.amount;
      if(params.description != undefined) this.description = params.description;
      if(params.gaslimit != undefined) this.gaslimit = params.gaslimit;
      if(params.gasprice != undefined) this.gasprice = params.gasprice;
      if(params.receiveaddress != undefined) this.receiveaddress = params.receiveaddress;
      if(params.contractaddress != undefined) this.contractaddress = params.contractaddress;
      if(params.tokenname != undefined) this.tokenname = params.tokenname;
      if(params.tokensymbol != undefined) this.tokensymbol = params.tokensymbol;
      if(params.decimals != undefined) this.decimals = params.decimals;
      if(params.senderaddress != undefined) this.senderaddress = params.senderaddress;
    }

}
