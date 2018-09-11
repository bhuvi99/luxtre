import React from 'react';
import { observer } from 'mobx-react';

import styles from './SplitStyle.scss'; 
import componentNameMap from './SplitFrameConstants';
import Icon from 'components/Icon';

@observer
export default class TabController extends React.Component {
  state = {
    hasError: false
  };

  componentWillMount() {
    this.props.onUpdateTabTitle(this.props.displayName);
  }

  componentDidMount() {
    if (this.state.hasError) {
      this.props.onUpdateTabTitle(<Icon iconId="Cancel" />);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.props.onUpdateTabTitle(nextProps.displayName);
    }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    window.Raven.captureException(error, { extra: errorInfo });
  }

  render() {
    const { displayName, isActive } = this.props;

    return (
      <div isActive={isActive} classname={styles.tabComponentWrapper}>
        <div classname={styles.scrollBarWrapper}>
          {this.state.hasError ? (
            <div/>
          ) : (
            React.createElement(componentNameMap[displayName], {
              ...this.props
            })
          )}
        </div>
      </div>
    );
  }
}
