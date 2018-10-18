// @flow
import React, { Component } from 'react';
import SvgInline from 'react-svg-inline';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import styles from './UtitliyNavButton.scss';

type Props = {
  label: string,
  isActive: boolean,
  onClick: Function,
  className?: string,
};

@observer
export default class UtitliyNavButton extends Component<Props> {

  render() {
    const { isActive, onClick, className } = this.props;
    const componentClasses = classnames([
      className,
      styles.component,
      styles.btn,
      styles.btnEffect,
      isActive ? styles.active : null
    ]);
    const iconClasses = classnames([
      isActive ? styles.activeIcon : styles.normalIcon
    ]);
    return (
      <button className={componentClasses} onClick={onClick}>
        {this.props.label}
      </button>
    );
  }
}
