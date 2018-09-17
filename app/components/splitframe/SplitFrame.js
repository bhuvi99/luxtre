import React, { Component } from 'react';
import { observer } from 'mobx-react';
import SplitWindow from './SplitWindow';

@observer
export default class SplitFrame extends Component {

  render() {
    return (
      <SplitWindow/>
    );
  }
}
