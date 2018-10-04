// @flow
import React, { Component } from 'react';
import SvgInline from 'react-svg-inline';
import classnames from 'classnames';
import styles from './WalletLogo.scss';
import luxicon from '../../../assets/images/lux-symbol.inline.svg';
import luxgateicon from '../../../assets/images/luxgate-logo.svg';

type Props = {
   amount: string,
   isShowingLuxtre: boolean,
}

export default class WalletLogo extends Component<Props> {

  render() {
    const {amount, isShowingLuxtre} = this.props;
    const bgClasses = classnames([
      styles.background,
      styles.normalIcon
    ]);
    const logoIcon = isShowingLuxtre ? luxicon : luxgateicon;
    const logo = isShowingLuxtre ? "LUXTRE" : "LUXGATE";
    return (
      <div className={styles.container}>
        <div><SvgInline svg={logoIcon} className={styles.icon} /> </div>
        <div><span className={styles.lux_name}> {logo} </span></div>
      </div>
    );
  }
}
