// @flow
import React, { Component } from 'react';
import SvgInline from 'react-svg-inline';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import styles from './SmartContractNavButton.scss';

type Props = {
  label: string,
  isActive: boolean,
  onClick: Function,
  className?: string,
};

@observer
export default class SmartContractNavButton extends Component<Props> {

  render() {
    const { isActive, onClick, className } = this.props;
    const componentClasses = classnames([
      className,
      styles.btn,
      styles.btnEffect,
      styles.component,
      isActive ? styles.active : null
    ]);
    return (
      <button className={componentClasses} onClick={onClick}>
        {this.props.label}
      </button>
    );
  }
}
