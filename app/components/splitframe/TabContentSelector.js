import React from 'react';
import PropTypes from 'prop-types';
import styles from './SplitStyle.scss';

import {
  ORDERBOOK,
  MYORDERHISTORY,
  CHART,
  TABCONTENTSELECTOR
} from './SplitFrameConstants';

const tabContentList = [
  {
    label: 'Chart',
    iconId: 'Chart',
    componentDisplayName: CHART
  },
  {
    label: 'Order Book',
    iconId: 'Order-Book',
    componentDisplayName: ORDERBOOK
  },
  {
    label: 'Your Orders',
    iconId: 'Your-Orders',
    componentDisplayName: MYORDERHISTORY
  }
];

export const TabContentSelector = ({ onUpdateTabContent }) => {
  return (
    <div classname={styles.selectionWrapper}>
      <div classname={styles.selectModule}>Select a Module</div>
      <div>
        {tabContentList.map(tabContent => {
          const { iconId, label, componentDisplayName } = tabContent;
          return (
            <div
              key={label}
              onClick={() => onUpdateTabContent({ componentDisplayName })}>
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

TabContentSelector.displayName = TABCONTENTSELECTOR;
TabContentSelector.propTypes = {
  onUpdateTabContent: PropTypes.func.isRequired
};

export default TabContentSelector;

