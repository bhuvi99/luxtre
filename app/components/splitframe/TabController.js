import React from 'react';
import { observer } from 'mobx-react';
import SvgInline from 'react-svg-inline';
import styles from './SplitStyle.scss'; 
import componentNameMap from './SplitFrameConstants';
import closeCross from '../../assets/images/close-cross.inline.svg';

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
      this.props.onUpdateTabTitle(<SvgInline svg={closeCross}/>);
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
      <div className={styles.tabComponentWrapper}>
        <div className={styles.scrollBarWrapper}>
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
