// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import type { StoresMap } from '../../../stores/index';
import type { ActionsMap } from '../../../actions/index';
import environment from '../../../environment';
import resolver from '../../../utils/imports';
import LocalizableError from '../../../i18n/LocalizableError';

const ImportPrivateKeyDialog = resolver('components/wallet/ImportPrivateKeyDialog');

type Props = {
  importPrivateKey: Function,
  stores: any | StoresMap,
  actions: any | ActionsMap,
  error: ?LocalizableError
};

@inject('actions', 'stores') @observer
export default class ImportPrivateKeyDialogContainer extends Component<Props> {

  static defaultProps = { actions: null, stores: null };

  handleImportPrivateKeySubmit = (privateKey: string) => {
      this.props.importPrivateKey(privateKey);
  };

  handleImportPrivateKeyCancel = () => {
    const { walletSettings } = this.props.stores[environment.API];
    const {importPrivateKeyRequest} = walletSettings;
     
    importPrivateKeyRequest.reset();
  }

  render() {
    const { actions, error } = this.props;
    const { wallets } = this.props.stores[environment.API];
    const activeWallet = wallets.active;

    if (!activeWallet) throw new Error('Active wallet required for WalletSendPage.');

    return (
      <ImportPrivateKeyDialog
        onSubmit={this.handleImportPrivateKeySubmit}
        error={error}
        onCancel={() => {
          actions.dialogs.closeActiveDialog.trigger();
          this.handleImportPrivateKeyCancel();
        }}
      />
    );
  }

}
