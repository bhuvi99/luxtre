// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styles from './StakingChart.scss';

type State = {
  posDifficulty: number,
};

@observer
export default class StakingChart extends Component<State> {
  state = {
    posDifficulty: 10,
  };

  render() {
    const { numberOfCoinsStart, ageOfTransaction, posDifficulty } = this.state;

    return (
      <div className={styles.component}>
        <div className={styles.categoryTitle}> Staking Chart </div>
      </div>
    );
  }
}
