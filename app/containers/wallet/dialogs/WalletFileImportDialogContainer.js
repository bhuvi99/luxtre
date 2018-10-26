// @flow
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import WalletFileImportDialog from '../../../components/wallet/file-import/WalletFileImportDialog';
import type { InjectedDialogContainerProps } from '../../../types/injectedPropsType';

type Props = InjectedDialogContainerProps;

@inject('stores', 'actions') @observer
export default class WalletFileImportDialogContainer extends Component<Props> {

  static defaultProps = { actions: null, stores: null, children: null, onClose: () => {} };

  onSubmit = ( filePath: string ) => {
    this.props.actions.lux.wallets.importWalletFromFile.trigger(filePath);
  };

  onCancel = () => {
    this.props.actions.dialogs.closeActiveDialog.trigger();
    this.props.stores.lux.wallets.importFromFileRequest.reset();
  };

  render() {
    const { wallets } = this.props.stores.lux;
    const { importFromFileRequest } = wallets;

    return (
      <WalletFileImportDialog
        isSubmitting={importFromFileRequest.isExecuting}
        onSubmit={this.onSubmit}
        onClose={this.onCancel}
        error={importFromFileRequest.error}
      />
    );
  }
}
