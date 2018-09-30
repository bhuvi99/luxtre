/* eslint-disable react/no-array-index-key */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SplitStyle.scss'; 

const TabBar = ({
  isTabClosable,
  tabs,
  tabTitles,
  activeIndex,
  onCloseTab,
  onNewTab,
  onFocusTab,
  dropDownMenu
}) => (
  <div data-ci="tabs-bar">
    {tabs.map((tab, index) => (
      <div
        className={styles.tabDiv}
        key={index}
        role="button"
        onClick={() => onFocusTab(index)}>
        {tabTitles && tabTitles.length && <span>{tabTitles[index]}</span>}

        {!isTabClosable && (
          <div
            onClick={e => {
              onCloseTab(index);
              e.stopPropagation();
            }}
          />
        )}
      </div>
    ))}
    <div role="button" onClick={() => onNewTab()}>
    </div>
    {dropDownMenu && <div className={styles.dropDownMenu}>{dropDownMenu()}</div>}
  </div>
);

TabBar.propTypes = {
  isTabClosable: PropTypes.bool.isRequired,
  tabs: PropTypes.array.isRequired,
  tabTitles: PropTypes.array.isRequired,
  activeIndex: PropTypes.number,
  onNewTab: PropTypes.func.isRequired,
  onFocusTab: PropTypes.func.isRequired,
  onCloseTab: PropTypes.func.isRequired,
  dropDownMenu: PropTypes.func
};

TabBar.defaultProps = { activeIndex: 0 };

export default TabBar;
