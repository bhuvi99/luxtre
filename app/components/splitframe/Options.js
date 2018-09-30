// @flow
import React, { Component } from 'react';
import SvgInline from 'react-svg-inline';
import { observer } from 'mobx-react';
import styles from './SplitStyle.scss'; 

type Props = {
  label: string,
  icon: string,
  isActive: boolean,
  onClick: Function,
  className?: string,
};

@observer
export default class Options extends Component<Props> {

  render() {
    const { icon } = this.props;
    return (
      <li {...props} className={styles.optli}>
        {icon && (
          <div className={styles.iconWrapper}>
            <SvgInline svg={icon} />
          </div>
        )}
        {label}
      </li>
    );
  }
}
