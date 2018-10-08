import React, { Component } from 'react';
import { defineMessages, intlShape } from 'react-intl';
import classNames from 'classnames';
import consoleIcon from '../../assets/images/top-bar/core-console.png';
import styles from './ConsoleWindowIcon.scss';

const messages = defineMessages({
  consoleWindow: {
    id: 'luxcoin.node.sync.status.consoleWindow',
    defaultMessage: '!!!Debug Console Window',
    description: 'Label for the console Window on Debug icon.'
  },
});

type Props = {
  isMainnet: boolean,
};

export default class ConsoleWindowIcon extends Component<Props> {

  static contextTypes = {
    intl: intlShape.isRequired
  };
  
  render() {
    const { isMainnet } = this.props;
    const { intl } = this.context;
    const componentClasses = classNames([
      styles.component,
      isMainnet && styles.mainnet,
    ]);
    return (
      <div className={componentClasses}>
        <img className={styles.icon} src={consoleIcon} role="presentation" />
        <div className={styles.info}>
          {intl.formatMessage(messages.consoleWindow)}
        </div>
      </div>
    );
  }
}
