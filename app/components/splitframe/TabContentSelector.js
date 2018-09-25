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
    ElementName: CHART
  },
  {
    label: 'Order Book',
    iconId: 'Order-Book',
    ElementName: ORDERBOOK
  },
  {
    label: 'Your Orders',
    iconId: 'Your-Orders',
    ElementName: MYORDERHISTORY
  }
];

export const TabContentSelector = ({ onUpdateTabContent }) => {
  return (
    <div className={styles.selectionWrapper}>
      <div className={styles.selectModule}>Select a Module</div>
      <div>
        {tabContentList.map(tabContent => {
          const { iconId, label, ElementName } = tabContent;
          return (
            <div
              key={label}
              onClick={() => onUpdateTabContent({ ElementName })}>
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

