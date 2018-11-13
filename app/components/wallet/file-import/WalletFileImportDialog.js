// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import { defineMessages, intlShape } from 'react-intl';
// import Input from 'react-polymorph/lib/components/Input';
// import SimpleInputSkin from 'react-polymorph/lib/skins/simple/raw/InputSkin';
// import Checkbox from 'react-polymorph/lib/components/Checkbox';
// import SimpleSwitchSkin from 'react-polymorph/lib/skins/simple/raw/SwitchSkin';
import DialogCloseButton from '../../widgets/DialogCloseButton';
import Dialog from '../../widgets/Dialog';
import ReactToolboxMobxForm from '../../../utils/ReactToolboxMobxForm';
import FileUploadWidget from '../../widgets/forms/FileUploadWidget';
import { isValidWalletName, isValidWalletPassword, isValidRepeatPassword } from '../../../utils/validations';
import globalMessages from '../../../i18n/global-messages';
import LocalizableError from '../../../i18n/LocalizableError';
import styles from './WalletFileImportDialog.scss';

const messages = defineMessages({
  headline: {
    id: 'wallet.file.import.dialog.headline',
    defaultMessage: '!!!Import Wallet',
    description: 'headline for "Import wallet from file" dialog.'
  },
  walletFileLabel: {
    id: 'wallet.file.import.dialog.walletFileLabel',
    defaultMessage: '!!!Import file',
    description: 'Label "Import file" on the dialog for importing a wallet from a file.'
  },
  walletFileHint: {
    id: 'wallet.file.import.dialog.walletFileHint',
    defaultMessage: '!!!Drop file here or click to choose',
    description: 'Hint for the file upload field on the dialog for importing a wallet from a file.'
  },
  submitLabel: {
    id: 'wallet.file.import.dialog.submitLabel',
    defaultMessage: '!!!Import wallet',
    description: 'Label "Import wallet" submit button on the dialog for importing a wallet from a file.'
  },
});

type Props = {
  onSubmit: Function,
  onClose: Function,
  isSubmitting: boolean,
  error: ?LocalizableError,
};

@observer
export default class WalletFileImportDialog extends Component<Props, State> {

  static contextTypes = {
    intl: intlShape.isRequired,
  };

  form = new ReactToolboxMobxForm({
    fields: {
      walletFile: {
        label: this.context.intl.formatMessage(messages.walletFileLabel),
        placeholder: this.context.intl.formatMessage(messages.walletFileHint),
        type: 'file',
      },
    },
  }, {
    options: {
      validateOnChange: true,
      validationDebounceWait: 250,
    },
  });

  submit = () => {
    this.form.submit({
      onSuccess: (form) => {
        const { walletFile } = form.values();
        this.props.onSubmit(walletFile.path);
      },
      onError: () => {}
    });
  };

  render() {
    const { intl } = this.context;
    const { form } = this;
    const { isSubmitting, error, onClose } = this.props;

    const walletFile = form.$('walletFile');
    const dialogClasses = classnames([
      styles.component,
      'WalletFileImportDialog',
    ]);

    const actions = [
      {
        className: isSubmitting ? styles.isSubmitting : null,
        label: intl.formatMessage(messages.submitLabel),
        primary: true,
        disabled: isSubmitting || !(walletFile.value instanceof File),
        onClick: this.submit,
      }
    ];

    return (
      <Dialog
        className={dialogClasses}
        title={intl.formatMessage(messages.headline)}
        actions={actions}
        closeOnOverlayClick
        onClose={onClose}
        closeButton={<DialogCloseButton />}
      >

        <div className={styles.fileUpload}>
          <FileUploadWidget
            {...walletFile.bind()}
            acceptedFileTypes={".dat"}
            selectedFile={walletFile.value}
            onFileSelected={(file) => {
              walletFile.set(file);
            }}
          />
        </div>

        {error && <p className={styles.error}>{intl.formatMessage(error)}</p>}

      </Dialog>
    );
  }

}
