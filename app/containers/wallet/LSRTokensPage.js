// @flow
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import LSRTokensForm from '../../components/wallet/LSRTokensForm';
import type { InjectedContainerProps } from '../../types/injectedPropsType';

type Props = InjectedContainerProps;

@inject('stores', 'actions')
@observer
export default class LSRTokensPage extends Component<Props> {

  static defaultProps = { actions: null, stores: null };

  render() {
    const actions = this.props.actions;
    const { lsrtokens } = this.props.stores.lux;
    const {       
      payto,
      amount,
      description,
      gaslimit,
      gasprice,
      receiveaddress,
      contractaddress,
      tokenname,
      tokensymbol,
      decimals,
      senderaddress
    } = lsrtokens;

    return (
      <LSRTokensForm
        payto={payto}
        amount={amount}
        description={description}
        gaslimit={gaslimit}
        gasprice={gasprice}
        receiveaddress={receiveaddress}
        contractaddress={contractaddress}
        tokenname={tokenname}
        tokensymbol={tokensymbol}
        decimals={decimals}
        senderaddress={senderaddress}
        saveToken={(
          payto,
          amount,
          description,
          gaslimit,
          gasprice,
          receiveaddress,
          contractaddress,
          tokenname,
          tokensymbol,
          decimals,
          senderaddress
        ) => (
          actions.lux.lsrtokens.saveToken.trigger({
            payto: payto,
            amount: amount,
            description: description,
            gasLimit: gaslimit,
            gasprice: gasprice,
            receiveaddress: receiveaddress,
            contractaddress: contractaddress,
            tokenname: tokenname,
            tokensymbol: tokensymbol,
            decimals: decimals,
            senderaddress: senderaddress
          })
        )}
      />
    );
  }

}
