import React, { Component } from 'react';
import styles from './SplitStyle.scss';

@observer
export default class SplitWindow extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { root: props.root };
  }

  render() {
    return <div className={styles.window}></div>;
  }
}

