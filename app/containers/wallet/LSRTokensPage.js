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
    const { wallets } = this.props.stores.lux;
    const { actions } = this.props;
    const activeWallet = wallets.active;

    return (
      <LSRTokensForm>
      </LSRTokensForm>
    );
  }

}
