// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { defineMessages, intlShape } from 'react-intl';
import styles from './WalletNavigation.scss';
import WalletNavButton from './WalletNavButton';
import WalletLogo from './WalletLogo';
import summaryIcon from '../../../assets/images/wallet-nav/summary-ic.inline.svg';
import sendIcon from '../../../assets/images/wallet-nav/send-ic.inline.svg';
import receiveIcon from '../../../assets/images/wallet-nav/receive-ic.inline.svg';
import transactionsIcon from '../../../assets/images/wallet-nav/transactions-ic.inline.svg';
import settingsIcon from '../../../assets/images/wallet-nav/wallet-settings-2-ic.inline.svg';
import utillityIcon from '../../../assets/images/wallet-nav/utility-ic.inline.svg';
import masternodeIcon from '../../../assets/images/wallet-nav/masternode-ic.inline.svg';
import lsrtokensIcon from '../../../assets/images/wallet-nav/lsrtokens-ic.inline.svg';
import smartcontractIcon from '../../../assets/images/wallet-nav/smartcontract-ic.inline.svg';
import 'font-awesome/css/font-awesome.min.css'

const messages = defineMessages({
  summary: {
    id: 'wallet.navigation.summary',
    defaultMessage: '!!!Overview',
    description: 'Label for the "Summary" nav button in the wallet navigation.'
  },
  send: {
    id: 'wallet.navigation.send',
    defaultMessage: '!!!Send',
    description: 'Label for the "Send" nav button in the wallet navigation.'
  },
  receive: {
    id: 'wallet.navigation.receive',
    defaultMessage: '!!!Receive',
    description: 'Label for the "Receive" nav button in the wallet navigation.'
  },
  transactions: {
    id: 'wallet.navigation.transactions',
    defaultMessage: '!!!Transactions',
    description: 'Label for the "Transactions" nav button in the wallet navigation.'
  },
  settings: {
    id: 'wallet.navigation.settings',
    defaultMessage: '!!!Settings',
    description: 'Label for the "Settings" nav button in the wallet navigation.'
  },
  utilities: {
    id: 'wallet.navigation.utilities',
    defaultMessage: '!!!Utilities',
    description: 'Label for the "Utilities" nav button in the wallet navigation.'
  },
  masternodes: {
    id: 'wallet.navigation.masternodes',
    defaultMessage: '!!!Masternodes',
    description: 'Label for the "Masternodes" nav button in the wallet navigation.'
  },
  lsrtokens: {
    id: 'wallet.navigation.lsrtokens',
    defaultMessage: '!!!LSR Tokens',
    description: 'Label for the "LSR Tokens" nav button in the wallet navigation.'
  },
  smartcontracts: {
    id: 'wallet.navigation.smartcontracts',
    defaultMessage: '!!!SmartContracts',
    description: 'Label for the "SmartContracts" nav button in the wallet navigation.'
  }
});

type Props = {
  isActiveNavItem: Function,
  onNavItemClick: Function,
  amount: string,
  isShowingLuxtre: boolean,
  onSwitchLuxgate: Function
};

@observer
export default class WalletNavigation extends Component<Props> {

  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const { isActiveNavItem, onNavItemClick, amount, isShowingLuxtre, onSwitchLuxgate} = this.props;
    const { intl } = this.context;
    const socialIconStyle = {
      fontSize:18, 
      color:'rgb(86, 115, 156)',
      marginRight: 8
    };
    return (
      <div className={styles.component}>
        <div>
          <WalletLogo 
             amount={amount}
             isShowingLuxtre = {isShowingLuxtre}
             onSwitchLuxgate = {onSwitchLuxgate}
 	        />
        </div>
        <div className={styles.navItem}>
          <WalletNavButton
            className="summary"
            label={intl.formatMessage(messages.summary)}
            icon={summaryIcon}
            isActive={isActiveNavItem('summary')}
            onClick={() => onNavItemClick('summary')}
          />
        </div>

        <div className={styles.navItem}>
          <WalletNavButton
            className="send"
            label={intl.formatMessage(messages.send)}
            icon={sendIcon}
            isActive={isActiveNavItem('send')}
            onClick={() => onNavItemClick('send')}
          />
        </div>

        <div className={styles.navItem}>
          <WalletNavButton
            className="receive"
            label={intl.formatMessage(messages.receive)}
            icon={receiveIcon}
            isActive={isActiveNavItem('receive')}
            onClick={() => onNavItemClick('receive')}
          />
        </div>

        <div className={styles.navItem}>
          <WalletNavButton
            label={intl.formatMessage(messages.transactions)}
            icon={transactionsIcon}
            isActive={isActiveNavItem('transactions')}
            onClick={() => onNavItemClick('transactions')}
          />
        </div>

        <div className={styles.navItem}>
          <WalletNavButton
            label={intl.formatMessage(messages.settings)}
            icon={settingsIcon}
            isActive={isActiveNavItem('settings')}
            onClick={() => onNavItemClick('settings')}
          />
        </div>

        <div className={styles.navItem}>
          <WalletNavButton
            label={intl.formatMessage(messages.utilities)}
            icon={utillityIcon}
            isActive={isActiveNavItem('utilities')}
            onClick={() => onNavItemClick('utilities')}
          />
        </div>

        <div className={styles.navItem}>
          <WalletNavButton
            label={intl.formatMessage(messages.masternodes)}
            icon={masternodeIcon}
            isActive={isActiveNavItem('masternodes')}
            onClick={() => onNavItemClick('masternodes')}
          />
        </div>
        <div className={styles.navItem}>
          <WalletNavButton
            label={intl.formatMessage(messages.lsrtokens)}
            icon={lsrtokensIcon}
            isActive={isActiveNavItem('lsrtokens')}
            onClick={() => onNavItemClick('lsrtokens')}
          />
        </div>
        <div className={styles.navItem}>
          <WalletNavButton
            label={intl.formatMessage(messages.smartcontracts)}
            icon={smartcontractIcon}
            isActive={isActiveNavItem('smartcontracts')}
            onClick={() => onNavItemClick('smartcontracts')}
          />
        </div>
        <div className={styles.social}>
            <a href="https://discord.gg/27xFP5Y" target="_blank"><i className="fa fa-comments" style={socialIconStyle}/></a>
            <a href="https://t.me/LUXcoreOfficial" target="_blank"><i className="fa fa-telegram" style={socialIconStyle}/></a>
            <a href="https://twitter.com/LUX_Coin" target="_blank"><i className="fa fa-twitter" style={socialIconStyle}/></a>
            <a href="https://www.reddit.com/r/LUXCoin/" target="_blank"><i className="fa fa-reddit" style={socialIconStyle}/></a>
            <a href="https://bitcointalk.org/index.php?topic=2422372" target="_blank"><i className="fa fa-bitcoin" style={socialIconStyle}/></a>
            <a href="https://www.youtube.com/channel/UCzaqwEZCAQ2zUwbD6syuvgw" target="_blank"><i className="fa fa-youtube" style={socialIconStyle}/></a>
          </div>
      </div>
    );
  }
}
