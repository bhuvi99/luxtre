// @flow
import React, { Component } from 'react';
import type { Node } from 'react';
import { observer } from 'mobx-react';
import WalletNavigation from '../navigation/WalletNavigation';
import styles from './WalletWithNavigation.scss';

type Props = {
  children?: Node,
  topbar: Node,
  isActiveScreen: Function,
  onWalletNavItemClick: Function,
  amount: string,
  isShowingLuxtre: boolean
};

@observer
export default class WalletWithNavigation extends Component<Props> {

  render() {
    const { children, topbar, isActiveScreen, onWalletNavItemClick, amount, isShowingLuxtre} = this.props;
    return (
      <div className={styles.component}>
        <div className={styles.navigation}>
          <WalletNavigation
            isActiveNavItem={isActiveScreen}
            onNavItemClick={onWalletNavItemClick}
            amount={amount}
            isShowingLuxtre={isShowingLuxtre}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.topbar}>
            {topbar}
          </div>
          <div className={styles.page}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
