import React, { Component } from 'react';
import { defineMessages, intlShape } from 'react-intl';
import classNames from 'classnames';
import consoleIcon from '../../assets/images/top-bar/core-console.png';
import ConsoleWindowDialog from "./ConsoleWindowDialog";
import styles from './ConsoleWindowIcon.scss';

const messages = defineMessages({
  consoleWindow: {
    id: 'luxcoin.node.sync.status.consoleWindow',
    defaultMessage: '!!!Debug Console Window',
    description: 'Label for the console Window on Debug icon.'
  },
});

type Props = {
  openDialogAction: Function,
};

export default class ConsoleWindowIcon extends Component<Props> {

  static contextTypes = {
    intl: intlShape.isRequired
  };

  render() {
    const { openDialogAction } = this.props;
    const { intl } = this.context;
    const componentClasses = classNames([
      styles.component,
    ]);
    return (
      <div className={componentClasses}>
        <button onClick={() => openDialogAction({dialog: ConsoleWindowDialog})}>
          <img className={styles.icon} src={consoleIcon} role="presentation" />
          <div className={styles.info}>
            {intl.formatMessage(messages.consoleWindow)}
          </div>
        </button>
      </div>
    );
  }
}
