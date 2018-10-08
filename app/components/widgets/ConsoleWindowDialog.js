// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import { defineMessages, intlShape, FormattedHTMLMessage } from 'react-intl';
import DialogCloseButton from './DialogCloseButton';
import Dialog from './Dialog';
import styles from './ConsoleWindowDialog.scss';
import Input from 'react-polymorph/lib/components/Input';
import SimpleInputSkin from 'react-polymorph/lib/skins/simple/InputSkin';
import Button from 'react-polymorph/lib/components/Button';
import ButtonSkin from 'react-polymorph/lib/skins/simple/raw/ButtonSkin';
import DialogBackButton from './DialogBackButton';
import luxgateIcon from '../../assets/images/luxgate-icon.png';

export const messages = defineMessages({
    dialogTitle: {
      id: 'debug.window.dialog.title',
      defaultMessage: '!!!Console Window',
      description: 'Title "Welcome to Luxgate, Please Login" in the luxgate login form.'
    },
    backupInstructions: {
      id: 'debug.window.dialog.enter',
      defaultMessage: `!!!    ￼
      Welcome to the LUX RPC console.
      Use up and down arrows to navigate history, and Ctrl-L to clear screen.
      Type help for an overview of available commands.
      `,
      description: 'Instructions for backing up recovery phrase on dialog that displays recovery phrase.'
    },
});

type Props = {
    error: ?LocalizableError,
    onCancel: Function,
    children: Node
};

type State = {
    account: string,
}

@observer
export default class ConsoleWindowDialog extends Component<Props, State> {

    static defaultProps = {
        newPhrase: '',
        error: null,
        children: null
    };
 
    state = {
        account: '',
    };

    static contextTypes = {
        intl: intlShape.isRequired,
    };

    render() {
        const { intl } = this.context;
        const {
            error,
            onCancel,
            children
        } = this.props;

        const {
            isMatched,
        } = this.state;

        const actions = [];

        return (
            <Dialog
                closeOnOverlayClick
                actions={actions}
                className={styles.dialog}
                onClose={onCancel}
                closeButton={<DialogCloseButton onClose={onCancel} />}
            //    backButton={isNewPhrase ? <DialogBackButton onBack={() => {this.switchNewPhrase(false)}} /> : null}
              >
                Console Window
            </Dialog>
        );
    }

}
