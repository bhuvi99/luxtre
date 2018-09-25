/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import styles from './SplitStyle.scss'; 

import TabController from './TabController';

@observer
export default class TabContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initiated: false,
      dimensions: null
    };
    this.tabTitles = [];
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    clearTimeout(this.handleResize);
    window.removeEventListener('resize', this.handleResize);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.node !== nextProps.node || this.state !== nextState;
  }

  handleUpdateTabTitle(text, index) {
    if (!text) {
      this.tabTitles.splice(index, 1);
    } else {
      this.tabTitles[index] = text;
    }
    this.props.onUpdateTabTitle(this.tabTitles);
  }

  handleResize() {
    this.timer = setTimeout(() => {
      if (this.wrapper_element) {
        this.setState({
          dimensions: this.wrapper_element.getBoundingClientRect(),
          initiated: true
        });
      }
    }, 50);
  }

  render() {
    const { node: { content }, onUpdateTabContent } = this.props;
    return (
      <div
        className={styles.tabContentWrapper}
        innerRef={wrapper_element => (this.wrapper_element = wrapper_element)}
      >
        {this.state.initiated && this.state.dimensions
          ? content.tabs.map((tab, index) => {
              const isActive = content.activeIndex === index;
              const props = {
                ...tab.props,
                onUpdateTabContent,
                onUpdateTabTitle: text =>
                  this.handleUpdateTabTitle(text, index),
                dimensions: this.state.dimensions
              };
              return (
                <TabController
                  {...props}
                  key={index}
                  isActive={isActive}
                  displayName={tab.componentDisplayName}
                />
              );
            })
          : ''}
      </div>
    );
  }
}

TabContent.propTypes = {
  node: PropTypes.object.isRequired,
  onUpdateTabContent: PropTypes.func.isRequired,
  onUpdateTabTitle: PropTypes.func.isRequired
};

