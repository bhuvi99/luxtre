// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import type { StoresMap } from '../../../stores/index';
import type { ActionsMap } from '../../../actions/index';
import resolver from '../../../utils/imports';

const ImportPrivateKeySuccessDialog = resolver('components/wallet/ImportPrivateKeySuccessDialog');

type Props = {
  actions: any | ActionsMap,
};

@inject('actions', 'stores') @observer
export default class ImportPrivateKeySuccessDialogContainer extends Component<Props> {

  static defaultProps = { actions: null, stores: null };

  render() {
    const { actions } = this.props;

    return (
      <ImportPrivateKeySuccessDialog
        onCancel={() => {
          actions.dialogs.closeActiveDialog.trigger();
        }}
      />
    );
  }

}
