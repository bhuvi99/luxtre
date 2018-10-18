// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import { defineMessages, intlShape, FormattedHTMLMessage } from 'react-intl';
import DialogCloseButton from './DialogCloseButton';
import Dialog from './Dialog';
import styles from './ConsoleWindowDialog.scss';

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
    onRequestConsoleCommand: Function,
    onCancel: Function,
    children: Node,
    consoleHistory: Array<any>,
    commandHistory: Array<any>
};

type State = {
    consoleCommand: string,
    commandArray: Array<string>;
    selectedCmdIndex: number;
}

@observer
export default class ConsoleWindowDialog extends Component<Props, State> {

    static defaultProps = {
        consoleHistory: [],
        commandHistory: [],
        error: null,
        children: null,
        timer:null
    };
 
    state = {
        consoleCommand: '',
        commandArray: [],
        selectedCmdIndex: 0,
    };

    static contextTypes = {
        intl: intlShape.isRequired,
    };

    componentDidUpdate() {
        this.timer=setTimeout(this.scrollToBottom.bind(this),1000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    onKeydownCommandInput(event) {
        if (event.keyCode === 13) { // tab was pressed
            event.preventDefault();

            let cmd = this.state.consoleCommand.trim();
            if(cmd != '') {
                let command, param;
                if(cmd.indexOf(' ') > 0) {
                    command = cmd.substr(0, cmd.indexOf(' '));
                    param = cmd.substr(cmd.indexOf(' ') + 1); 
                } else {
                    command = cmd;
                    param = '';
                }
                this.props.onRequestConsoleCommand(command, param);
                this.setState({selectedCmdIndex: this.state.commandArray.length + 1});
                this.setState({commandArray: [...this.state.commandArray, cmd]});
            }
            this.setState({consoleCommand: ''});
            
        } else if(event.keyCode === 38) {
            if(this.state.selectedCmdIndex > 0) {
                this.setState({consoleCommand: this.state.commandArray[this.state.selectedCmdIndex - 1]});
                this.setState({selectedCmdIndex: this.state.selectedCmdIndex-1});
            }
        } else if(event.keyCode === 40) {
            if(this.state.selectedCmdIndex < this.state.commandArray.length - 1) 
                this.setState({consoleCommand: this.state.commandArray[this.state.selectedCmdIndex + 1]});
            else 
                this.setState({consoleCommand: ''});
            if(this.state.selectedCmdIndex < this.state.commandArray.length) 
                this.setState({selectedCmdIndex: this.state.selectedCmdIndex+1});
        }
      }

      scrollToBottom() {
          if(this.consoleWindow)
          {
            const scrollHeight = this.consoleWindow.scrollHeight;
            const height = this.consoleWindow.clientHeight;
            const maxScrollTop = scrollHeight - height;
            this.consoleWindow.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
          }

          clearTimeout(this.timer);
      }

    render() {
        const { intl } = this.context;
        const {
            consoleHistory,
            commandHistory,
            error,
            onCancel,
            children
        } = this.props;

        const {
            consoleCommand,
        } = this.state;

        return (
            <Dialog
                closeOnOverlayClick
                className={styles.dialog}
                onClose={onCancel}
                closeButton={<DialogCloseButton onClose={onCancel} />}
            //    backButton={isNewPhrase ? <DialogBackButton onBack={() => {this.switchNewPhrase(false)}} /> : null}
            >
                <div className={styles.title}>
                    Debug Console
                </div>   
                <div className={styles.consoleWindow} ref={(div) => {this.consoleWindow = div;}}>
                    <div>Welcome to the <span className={styles.luxcore}>LUX Core RPC </span> console</div>
                    <div>Type help for an overview of available commands.</div>
                    {consoleHistory.map((element, ei) => {
                        return (
                            <div key={`element-${ei}`} className={styles.consoleElement}>
                                <span className={styles.commandTitle}>
                                    {commandHistory[ei]}
                                </span>
                                <hr/>
                                {element.map((cell, ci) => {
                                    return (
                                        <div key={`cell-${ci}`} dangerouslySetInnerHTML={{__html: cell}} >
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
                <div className={styles.commandInput}>
                    <input 
                        value={consoleCommand} 
                        type="text" 
                        placeholder="Enter LUX commands or help for an overview available commands"
                        onChange={event => this.setState({consoleCommand: event.target.value})}
                        onKeyDown={this.onKeydownCommandInput.bind(this)}
                    />
                </div>
            </Dialog>
        );
    }
}
