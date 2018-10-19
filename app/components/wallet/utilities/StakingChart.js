// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styles from './StakingChart.scss';

@observer
export default class StakingChart extends Component<State> {
  
    _isMounted = false;
  
    componentDidMount() {
      this._isMounted = true;
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

  render() {

    return (
      <div className={styles.component}>
        <div className={styles.categoryTitle}> Staking Chart </div>
      </div>
    );
  }
}
