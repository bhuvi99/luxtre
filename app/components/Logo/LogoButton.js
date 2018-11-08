// @flow
import React, { Component } from 'react';
import SvgInline from 'react-svg-inline';
import type { Node } from 'react';
import { observer } from 'mobx-react';
import styles from './LogoButton.scss';

type Props = {
  color: string,
  width: number,
  height: number,
  fontSize: number,
  borderWidth: number,
  firstButtonText: string,
  secondButtonText: string,
  firstLogoIcon: any,
  firstLogoIcon: any,
  onSwitchLuxgate:Function
};

@observer
export default class LogoButton extends Component<Props> {

  static defaultProps = {     
    color: '#FFFFFF',     
    width: 250,
    height: 100,
    fontSize: 20,
    borderWidth: 15,
    firstButtonText: 'LUXTRE',
    secondButtonText: 'LUXGATE'
  }; 

  render() {
    const buttonStyle = {
      width: this.props.width,
      height: this.props.height
    }; 
    
    const fancyFrontStyle = {
      transform: 'rotateX(0deg) translateZ(' + this.props.height / 2 + 'px )'
    };  		

    const fancyBackStyle = {
      transform: 'rotateX(90deg) translateZ( ' + this.props.height / 2 + 'px )'
    };

    return (
      <div 
        className={styles.rotateButton}
        style={buttonStyle}
        ref="totateButton"
        onClick={this.props.onSwitchLuxgate}
      >
        <div className={styles.rotateFlipper} >
          <div className={styles.rotateBack} style={fancyBackStyle}>
            <SvgInline svg={this.props.firstLogoIcon} className={styles.icon} />
            <div> <span className={styles.logo_name}> {this.props.firstButtonText} </span> </div>
          </div>
          <div className={styles.rotateFront} style={fancyFrontStyle}>
            <SvgInline svg={this.props.secondLogoIcon} className={styles.icon} />
            <div> <span className={styles.logo_name}> {this.props.secondButtonText} </span> </div> 
          </div>
        </div>
      </div> 
    );
  }
}

