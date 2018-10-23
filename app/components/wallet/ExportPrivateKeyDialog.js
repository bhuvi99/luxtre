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
import styles from './ExportPrivateKeyDialog.scss';

export const messages = defineMessages({
  dialogTitle: {
    id: 'wallet.exportPrivateKeyDialog.title',
    defaultMessage: 'Export Private Key',
    description: 'Title for the "Export Private Key" dialog.'
  },
  publicKeyLabel: {
    id: 'wallet.exportPrivateKeyDialog.publicKeyLabel',
    defaultMessage: 'Public Key',
    description: 'Label for the "Public Key" input in the Export Private Key dialog.',
  },
  publicKeyFieldPlaceholder: {
    id: 'wallet.exportPrivateKeyDialog.publicKeyFieldPlaceholder',
    defaultMessage: 'Wallet Address',
    description: 'Placeholder for the "Public Key" inputs in the Export Private Key dialog.',
  },
  privateKeyLabel: {
    id: 'wallet.exportPrivateKeyDialog.privateKeyLabel',
    defaultMessage: 'Private Key',
    description: 'Label for the "Private Key" input in the Export Private Key dialog.',
  },
  privateKeyFieldPlaceholder: {
    id: 'wallet.exportPrivateKeyDialog.privateKeyFieldPlaceholder',
    defaultMessage: 'Generated Private Key of above Wallet Address',
    description: 'Placeholder for the "Private Key" inputs in the Export Private Key dialog.',
  },
  generateButtonLabel: {
    id: 'wallet.exportPrivateKeyDialog.generate',
    defaultMessage: 'Generate',
    description: 'Label for the ok button in the Export Private Key dialog.'
  },
  cancelButtonLabel: {
    id: 'wallet.exportPrivateKeyDialog.cancel',
    defaultMessage: 'Cancel',
    description: 'Label for the cancel button in the Export Private Key dialog.'
  },
  invalidAddress: {
    id: 'wallet.exportPrivateKeyDialog.form.errors.invalidAddress',
    defaultMessage: 'Please enter a valid address.',
    description: 'Error message shown when invalid address was entered.'
  },
});

messages.fieldIsRequired = globalMessages.fieldIsRequired;

type Props = {
  onSubmit: Function,
  onCancel: Function,
  addressValidator: Function,
  //isSubmitting: boolean,
  error: ?LocalizableError,
};

@observer
export default class ExportPrivateKeyDialog extends Component<Props> {

  static contextTypes = {
    intl: intlShape.isRequired,
  };

  form = new ReactToolboxMobxForm({
    fields: {
      publicKey: {
        label: this.context.intl.formatMessage(messages.publicKeyLabel),
        placeholder: this.context.intl.formatMessage(messages.publicKeyFieldPlaceholder),
        value: '',
        validators: [({ field }) => {
          const value = field.value;
          if (value === '') {
            return [false, this.context.intl.formatMessage(messages.fieldIsRequired)];
          }
          return this.props.addressValidator(value)
            .then(isValid => {
              return [isValid, this.context.intl.formatMessage(messages.invalidAddress)];
            });
        }],
      },
      privateKey: {
        label: this.context.intl.formatMessage(messages.privateKeyLabel),
        placeholder: this.context.intl.formatMessage(messages.privateKeyFieldPlaceholder),
        value: '',
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
        const { publicKey } = form.values();
        this.props.onSubmit(publicKey);
      },
      onError: () => {}
    });
  }

  render() {
    const { form } = this;
    const { intl } = this.context;
    const publicKeyField = form.$('publicKey');
    const privateKeyField = form.$('privateKey');
    const {
      onCancel,
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
        label: intl.formatMessage(messages.generateButtonLabel),
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
        <div className={styles.publicKey}>
          <Input
            className="publicKey"
            {...publicKeyField.bind()}
            error={publicKeyField.error}
            skin={<SimpleInputSkin />}
            />
        </div>
        <div className={styles.privateKey}>
          <Input
            className="privateKey"
            {...privateKeyField.bind()}
            disabled
            skin={<SimpleInputSkin />}
            />
        </div>
        {/* {error ? <p className={styles.error}>{intl.formatMessage(error)}</p> : null} */}
      </Dialog>
    );
  }

}
