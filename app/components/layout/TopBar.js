// @flow
import React, { Component } from 'react';
import SvgInline from 'react-svg-inline';
import type { Node } from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import Wallet from '../../domain/Wallet';
import menuIconClosed from '../../assets/images/exchange-closed.inline.svg';
import menuIconOpened from '../../assets/images/exchange-opened.inline.svg';
import styles from './TopBar.scss';
import resolver from '../../utils/imports';
import { matchRoute } from '../../utils/routing';
import { ROUTES } from '../../routes-config';

const { formattedWalletAmount } = resolver('utils/formatters');

type Props = {
  onSwitchLuxgate?: ?Function,
  children?: ?Node,
  isShowingLuxtre?: ?boolean,
  pageTitle: string,
};

var pageNameList = {
  "summary" : "OVERVIEW",
  "send" : "SEND",
  "receive" : "RECEIVE", 
  "transactions" : "TRANSACTIONS",
  "settings" : "SETTINGS",
  "utilities" : "UTILITIES",
  "poscalculator" : "UTILITIES",
  "masternodes" : "MASTERNODES",
  "masternodesnet" : "MASTERNODES",
  "mymasternode" : "MASTERNODES",
  "smartcontracts" : "SMART CONTRACTS",
  "createsmartcontract" : "SMART CONTRACTS",
  "callsmartcontract" : "SMART CONTRACTS",
  "sendtosmartcontract" : "SMART CONTRACTS",
  "solcompiler" : "SMART CONTRACTS",
};

@observer
export default class TopBar extends Component<Props> {

  render() {
    const { onSwitchLuxgate, isShowingLuxtre, pageTitle } = this.props;

    const topBarStyles = classNames([
      styles.topBar,
      (isShowingLuxtre == undefined || isShowingLuxtre == true) ? styles.withoutExchange : styles.withExchange
    ]);


    const switchToggleIcon = (
      <SvgInline
        svg={isShowingLuxtre ? menuIconOpened : menuIconClosed}
        className={styles.sidebarIcon}
      />
    );
    
    const page = pageTitle ? pageTitle : "summary";

    return (
      <header className={topBarStyles}>
        {/*isShowingLuxtre != undefined ? (
          <button className={styles.leftIcon} onClick={onSwitchLuxgate}>
            {switchToggleIcon}
          </button>
        ) : (null)*/}

        {/*<button className={styles.leftIcon} onClick={onSwitchLuxgate}>
          {switchToggleIcon}
        </button>*/}
        <div className={styles.pageTitle}>
          {pageNameList[page]}
        </div>
        {this.props.children}
      </header>
    );
  }
}
