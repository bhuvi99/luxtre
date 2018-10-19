// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { ellipsis } from '../../../utils/strings';
import config from '../../../config';
import { defineMessages, FormattedHTMLMessage } from 'react-intl';
import ConsoleWindowDialog from '../../../components/widgets/ConsoleWindowDialog';
import environment from '../../../environment';
import type { InjectedDialogContainerProps } from '../../../types/injectedPropsType';

type Props = InjectedDialogContainerProps;

export const messages = defineMessages({
  message: {
    id: 'wallet.receive.page.addressCopyNotificationMessage',
    defaultMessage: '!!!You have successfully copied wallet address',
    description: 'Message for the wallet address copy success notification.',
  },
});

@inject('actions', 'stores') @observer
export default class ConsoleWindowContainer extends Component<Props> {

  static defaultProps = { actions: null, stores: null, children: null, onClose: () => {} };

  componentWillUnmount() {
  }

  render() {
    const { actions, error } = this.props;
    const dconsole = this.props.stores.lux.dconsole;

    const { consoleHistory, commandHistory } = dconsole;

    return (
      <ConsoleWindowDialog
        onRequestConsoleCommand={(command, param) => {
          actions.lux.dconsole.debugConsole.trigger({command: command, param: param});
        }}
        error = {error}
        onCancel={() => {
          actions.dialogs.closeActiveDialog.trigger();
        }}
        consoleHistory={consoleHistory}
        commandHistory={commandHistory}
      >
      </ConsoleWindowDialog>
    );
  }

}
