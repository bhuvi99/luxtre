// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { defineMessages, intlShape } from 'react-intl';
import SvgInline from 'react-svg-inline';
import luxSymbolBig from '../../../assets/images/lux-logo.inline.svg';
import luxSymbolSmallest from '../../../assets/images/lux-logo.inline.svg';
import { DECIMAL_PLACES_IN_LUX, DECIMAL_SPLACES_IN_LUX } from '../../../config/numbersConfig';
import type { UnconfirmedAmount } from '../../../types/unconfirmedAmountType';
import styles from './WalletSummary.scss';

const messages = defineMessages({
  totalBalance : {
    id: 'wallet.summary.page.totalBalance',
    defaultMessage: '!!!Total Balance',
    description: '"Total Balance" label on Wallet summary page'
  },
  pendingOutgoingConfirmationLabel: {
    id: 'wallet.summary.page.pendingOutgoingConfirmationLabel',
    defaultMessage: '!!!Outgoing',
    description: '"Outgoing" label on Wallet summary page'
  },
  pendingIncomingConfirmationLabel: {
    id: 'wallet.summary.page.pendingIncomingConfirmationLabel',
    defaultMessage: '!!!Incoming',
    description: '"Incoming" label on Wallet summary page'
  },
  transactionsLabel: {
    id: 'wallet.summary.page.transactionsLabel',
    defaultMessage: '!!!Number of transactions',
    description: '"Number of transactions" label on Wallet summary page'
  }
});

type Props = {
  walletName: string,
  amount: string,
  numberOfTransactions: number,
  pendingAmount: UnconfirmedAmount,
  isLoadingTransactions: boolean,
  children: Node
};

@observer
export default class WalletSummary extends Component<Props> {

  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const {
      walletName,
      amount,
      pendingAmount,
      numberOfTransactions,
      isLoadingTransactions,
      children
    } = this.props;
    const { intl } = this.context;
    return (
      <div>
        <div className={styles.component}>
          <div className={styles.balanceLabel}>
            <div className={styles.descriptionLabel}>
              {amount}
              <SvgInline svg={luxSymbolBig} className={styles.currencySymbolBig} />
            </div>
            <div>{intl.formatMessage(messages.totalBalance)}</div>
          </div>
          <div className={styles.numberLabel}>
            <div className={styles.descriptionLabel}>
              {!isLoadingTransactions ? numberOfTransactions : 0}
            </div>
            <div>{intl.formatMessage(messages.transactionsLabel)}</div>
          </div>
          <div className={styles.numberLabel}>
            <div className={styles.descriptionLabel}>
              {pendingAmount.incoming.greaterThan(0) ? pendingAmount.incoming.toFormat(DECIMAL_SPLACES_IN_LUX) : 0}
            </div>
            <div>{intl.formatMessage(messages.pendingIncomingConfirmationLabel)}</div>
          </div>
          <div className={styles.numberLabel}>
            <div className={styles.descriptionLabel}>
              {pendingAmount.outgoing.greaterThan(0) ? pendingAmount.outgoing.toFormat(DECIMAL_SPLACES_IN_LUX) : 0}
            </div>
            <div>{intl.formatMessage(messages.pendingOutgoingConfirmationLabel)}</div>
          </div>
        </div>
        <div className={styles.transactionList}>
          {children}
        </div>
      </div>
    );
  }
}
