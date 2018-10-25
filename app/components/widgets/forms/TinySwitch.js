import React, { Component } from 'react';
import Checkbox from 'react-polymorph/lib/components/Checkbox';
import SwitchSkin from 'react-polymorph/lib/skins/simple/SwitchSkin';
import { SWITCH } from 'react-polymorph/lib/skins/simple/identifiers';
import styles from './TinySwitch.scss';

type Props = {
  checked: boolean,
  label: string,
};

export default class TinySwitch extends Component<Props> {

  render() {

    return (
      <Checkbox
        className={styles.component}
        themeId={SWITCH}
        skin={<SwitchSkin/>}
        checked={this.props.checked}
        onChange={this.props.onChange}
        label={this.props.label}
      />
    );
  }

}