// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import Input from 'react-polymorph/lib/components/Input';
import SimpleInputSkin from 'react-polymorph/lib/skins/simple/raw/InputSkin';
import { defineMessages, intlShape } from 'react-intl';
import ReactToolboxMobxForm from '../../utils/ReactToolboxMobxForm';
import Dialog from '../widgets/Dialog';
import DialogCloseButton from '../widgets/DialogCloseButton';
import globalMessages from '../../i18n/global-messages';
import LocalizableError from '../../i18n/LocalizableError';
import styles from './ImportPrivateKeyDialog.scss';

export const messages = defineMessages({
  dialogTitle: {
    id: 'wallet.importPrivateKeyDialog.title',
    defaultMessage: '!!!Import Private Key',
    description: 'Title for the "Import Private Key" dialog.'
  },
  privateKeyLabel: {
    id: 'wallet.importPrivateKeyDialog.privateKeyLabel',
    defaultMessage: '!!!Type your private key',
    description: 'Label for the "Private Key" input in the Import Private Key dialog.',
  },
  privateKeyFieldPlaceholder: {
    id: 'wallet.importPrivateKeyDialog.privateKeyFieldPlaceholder',
    defaultMessage: '!!!Private Key',
    description: 'Placeholder for the "Private Key" inputs in the Import Private Key dialog.',
  },
  importButtonLabel: {
    id: 'wallet.importPrivateKeyDialog.import',
    defaultMessage: '!!!Import',
    description: 'Label for the import button in the Import Private Key dialog.'
  },
  cancelButtonLabel: {
    id: 'wallet.importPrivateKeyDialog.cancel',
    defaultMessage: '!!!Cancel',
    description: 'Label for the cancel button in the Import Private Key dialog.'
  },
});

messages.fieldIsRequired = globalMessages.fieldIsRequired;

type Props = {
  onSubmit: Function,
  onCancel: Function,
  //isSubmitting: boolean,
  error: ?LocalizableError,
};

@observer
export default class ImportPrivateKeyDialog extends Component<Props> {

  static contextTypes = {
    intl: intlShape.isRequired,
  };

  form = new ReactToolboxMobxForm({
    fields: {
      privateKey: {
        label: this.context.intl.formatMessage(messages.privateKeyLabel),
        placeholder: this.context.intl.formatMessage(messages.privateKeyFieldPlaceholder),
        value: '',
        validators: [({ field }) => {
          if (field.value === '') {
            return [false, this.context.intl.formatMessage(messages.fieldIsRequired)];
          }
          return [true];
        }],
      },
    }
  }, {
    options: {
      validateOnChange: true,
      validationDebounceWait: 250,
    },
  });

  submit() {
    this.form.submit({
      onSuccess: (form) => {
        const { privateKey } = form.values();
        this.props.onSubmit(privateKey);
      },
      onError: () => {}
    });
  }

  render() {
    const { form } = this;
    const { intl } = this.context;
    const privateKeyField = form.$('privateKey');
    const {
      onCancel,
      error
    } = this.props;

    const confirmButtonClasses = classnames([
      'confirmButton'
    ]);

    const actions = [
      {
        label: intl.formatMessage(messages.cancelButtonLabel),
        onClick: onCancel,
      },
      {
        label: intl.formatMessage(messages.importButtonLabel),
        onClick: this.submit.bind(this),
        primary: true,
        className: confirmButtonClasses
      }
    ];

    return (
      <Dialog
        title={intl.formatMessage(messages.dialogTitle)}
        actions={actions}
        closeOnOverlayClick
        onClose={onCancel}
        className={styles.dialog}
        closeButton={<DialogCloseButton />}
      >
        <div className={styles.privateKey}>
          <Input
            className="privateKey"
            {...privateKeyField.bind()}
            error={privateKeyField.error}
            skin={<SimpleInputSkin />}
            />
        </div>
        {error ? <p className={styles.error}>{intl.formatMessage(error)}</p> : null}
      </Dialog>
    );
  }

}
