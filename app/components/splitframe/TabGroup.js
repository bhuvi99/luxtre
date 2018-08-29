import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';

import { defaultTab, defaultTabContent } from '../splitLayoutHelpers';

export const getNextActiveTabIndex = (
  indexToRemove,
  currentActiveIndex,
  numberOfTabs
) => {
  let newActiveIndex = currentActiveIndex;
  if (indexToRemove === currentActiveIndex) {
    if (numberOfTabs - 1 === indexToRemove) {
      newActiveIndex = indexToRemove - 1;
    }
  } else if (indexToRemove < currentActiveIndex) {
    newActiveIndex = currentActiveIndex - 1;
  }
  return newActiveIndex;
};

export const updateTabContent = (content, onUpdateContent, tabContent) => {
  const updatedContent = cloneDeep(content);
  updatedContent.tabs[content.activeIndex] = tabContent;
  onUpdateContent(updatedContent);
};

export const newTab = (content, onUpdateContent) => {
  const updatedContent = cloneDeep(content);
  updatedContent.tabs.push(defaultTab);
  updatedContent.activeIndex = updatedContent.tabs.length - 1;
  onUpdateContent(updatedContent);
};

export const focusTab = (content, onUpdateContent, index) => {
  const updatedContent = cloneDeep(content);
  updatedContent.activeIndex = index;
  onUpdateContent(updatedContent);
};

export const closeTab = (content, onUpdateContent, index) => {
  if (index === 0 && content.tabs.length === 1) {
    if (
      content.tabs[0].componentDisplayName === defaultTab.componentDisplayName
    ) {
      onUpdateContent(null);
    } else {
      onUpdateContent(defaultTabContent);
    }
  } else {
    const nextActiveIndex = getNextActiveTabIndex(
      index,
      content.activeIndex,
      content.tabs.length
    );
    const updatedContent = cloneDeep(content);
    updatedContent.activeIndex = nextActiveIndex;
    updatedContent.tabs.splice(index, 1);
    onUpdateContent(updatedContent);
  }
};

@observer
export default class TabGroup extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      tabTitles: props.node.content.tabs.map(tab => tab.componentDisplayName)
    };
    this.handleUpdateTabTitle = this.handleUpdateTabTitle.bind(this);
  }

  handleUpdateTabTitle(tabTitles) {
    this.setState({ tabTitles });
  }

  render() {
    return (
      <div classname={styles.tabGroupWrapper} data-ci="TabGroupWrapper">
      </div>
    );
  }
}

TabGroup.propTypes = {
  node: PropTypes.object.isRequired,
  onUpdateContent: PropTypes.func.isRequired,
  dropDownMenu: PropTypes.func
};
