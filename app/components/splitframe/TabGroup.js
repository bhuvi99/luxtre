import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import partial from 'lodash/partial';
import cloneDeep from 'lodash/cloneDeep';
import styles from './SplitStyle.scss';

import { defaultTab, defaultTabContent } from './SplitFrameHelpers';
import TabBar from './TabBar';
import TabContent from './TabContent';

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
    const { node, onUpdateContent, dropDownMenu } = this.props;
    const content = node.content;
    const handleNewTab = partial(newTab, content, onUpdateContent);
    const handleFocusTab = partial(focusTab, content, onUpdateContent);
    const handleCloseTab = partial(closeTab, content, onUpdateContent);
    const handleUpdateTabContent = partial(
      updateTabContent,
      content,
      onUpdateContent
    );
    let isTabClosable = false;
    if (!node.parent) {
      isTabClosable =
        node.content.tabs.length === 1 &&
        node.content.tabs[0].componentDisplayName ===
          defaultTab.componentDisplayName;
    }
    return (
      <div classname={styles.tabGroupWrapper} data-ci="TabGroupWrapper">
        <TabBar
          isTabClosable={isTabClosable}
          tabs={content.tabs}
          activeIndex={content.activeIndex}
          tabTitles={this.state.tabTitles}
          onNewTab={handleNewTab}
          onFocusTab={handleFocusTab}
          onCloseTab={handleCloseTab}
          dropDownMenu={dropDownMenu}
        />

        <TabContent
          node={node}
          onUpdateTabContent={handleUpdateTabContent}
          onUpdateTabTitle={this.handleUpdateTabTitle}
        />
      </div>
    );
  }
}

TabGroup.propTypes = {
  node: PropTypes.object.isRequired,
  onUpdateContent: PropTypes.func.isRequired,
  dropDownMenu: PropTypes.func
};
