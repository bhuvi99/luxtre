// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { defineMessages, intlShape } from 'react-intl';
import Dialog from '../widgets/Dialog';
import styles from './ImportPrivateKeySuccessDialog.scss';

export const messages = defineMessages({
  dialogTitle: {
    id: 'wallet.importPrivateKeySuccessDialog.title',
    defaultMessage: '!!!Success',
    description: 'Title for the "Import Private Key Success" dialog.'
  },
  okButtonLabel: {
    id: 'wallet.importPrivateKeySuccessDialog.ok',
    defaultMessage: '!!!OK',
    description: 'Label for the ok button in the Import Private Key Success dialog.'
  },
});

type Props = {
    onCancel: Function,
  };

@observer
export default class ImportPrivateKeySuccessDialog extends Component<Props> {

  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const { intl } = this.context;

    const {
        onCancel,
    } = this.props;

    const actions = [
      {
        label: intl.formatMessage(messages.okButtonLabel),
        onClick: onCancel
      }
    ];

    return (
      <Dialog
        title={intl.formatMessage(messages.dialogTitle)}
        actions={actions}
        className={styles.dialog}
      >
      <div>
          {<p className={styles.warning}>{'Please restart your wallet. Otherwise, transaction data or address book entries might be missing or incorrect.'}</p>}
      </div>
      </Dialog>
    );
  }

}
