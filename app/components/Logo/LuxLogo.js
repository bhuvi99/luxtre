// @flow
import React, { Component } from 'react';
import SvgInline from 'react-svg-inline';
import classnames from 'classnames';
import styles from './LuxLogo.scss';
import luxicon from '../../assets/images/lux-symbol.inline.svg';
import luxgateicon from '../../assets/images/luxgate-logo.inline.svg';
import LogoButton from './LogoButton';

type Props = {
   amount: string,
   isShowingLuxtre: boolean,
   onSwitchLuxgate: Function
}

export default class LuxLogo extends Component<Props> {

  render() {
    const {amount, isShowingLuxtre, onSwitchLuxgate} = this.props;
    const bgClasses = classnames([
      styles.background,
      styles.normalIcon
    ]);
    
    return (
      <div className={styles.container}>
        { isShowingLuxtre ? (
          <LogoButton
            firstLogoIcon={luxicon}
            secondLogoIcon={luxgateicon}
            firstButtonText={"LUXTRE"}
            secondButtonText={"LUXGATE"}
            onSwitchLuxgate={onSwitchLuxgate}
            /> 
        ) : (
          <LogoButton
            firstLogoIcon={luxgateicon}
            secondLogoIcon={luxicon}
            firstButtonText={"LUXGATE"}
            secondButtonText={"LUXTRE"}
            onSwitchLuxgate={onSwitchLuxgate}
            /> 
        )}
        {/*<div><SvgInline svg={logoIcon} className={styles.icon} /> </div>
        <div><span className={styles.lux_name}> {logo} </span></div>*/}
      </div>
    );
  }
}

