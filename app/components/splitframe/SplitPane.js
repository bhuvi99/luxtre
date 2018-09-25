import React from 'react';
import PropTypes from 'prop-types';
import PopOver from './PopOver';
import { isEqual } from 'lodash';
import styles from './SplitStyle.scss';

import TabGroup from './TabGroup';
import { defaultTabContent } from './SplitFrameHelpers';
import { SFC_LEFT, SFC_DOWN, SFC_RIGHT, SFC_UP } from './SplitFrameConstants';
import Options from './Options';
import SplitLeftIcon from '../../assets/images/split-left.svg';
import SplitRightIcon from '../../assets/images/split-right.svg';
import SplitUpIcon from '../../assets/images/split-up.svg';
import SplitDownIcon from '../../assets/images/split-down.svg';

const SplitPane = ({ node, onSplit, onUpdateContent, innerRef, flexGrow }) => {
  const flexGrowValue = flexGrow || node.flexGrow;
  const style = flexGrowValue ? { flexGrow: flexGrowValue } : {};
  return (
    <div className={styles.paneWrapper} ref={innerRef} style={style}>
      <TabGroup
        node={node}
        onUpdateContent={content => onUpdateContent(node, content)}
        dropDownMenu={() => (
          <PopOver ariaLabel="Pane Options" shouldCloseOnEsc shouldCloseOnBlur>
            <ul>
              <Options
                icon={SplitLeftIcon}
                label="Split Left"
                onMouseDown={() => onSplit(node, SFC_LEFT)}
              />
              <Options
                icon={SplitRightIcon}
                label="Split Right"
                onMouseDown={() => onSplit(node, SFC_RIGHT)}
              />
              <Options
                icon={SplitUpIcon}
                label="Split Up"
                onMouseDown={() => onSplit(node, SFC_UP)}
              />
              <Options
                icon={SplitDownIcon}
                label="Split Down"
                onMouseDown={() => onSplit(node, SFC_DOWN)}
              />
              <hr/>
              <Options
                icon="Close-No-Circle"
                label="Close All Tabs"
                disabled={isEqual(node.content, defaultTabContent)}
                onMouseDown={e => {
                  onUpdateContent(node, defaultTabContent);
                  e.stopPropagation();
                }}
              />
              <Options
                icon="Close"
                label="Close Pane"
                disabled={!node.parent}
                onMouseDown={e => {
                  onUpdateContent(node, null);
                  e.stopPropagation();
                }}
              />
            </ul>
          </PopOver>
        )}
      />
    </div>
  );
};

SplitPane.propTypes = {
  node: PropTypes.object.isRequired,
  onSplit: PropTypes.func.isRequired,
  onUpdateContent: PropTypes.func.isRequired,
  innerRef: PropTypes.func,
  flexGrow: PropTypes.number
};

SplitPane.defaultProps = {
  innerRef: null,
  flexGrow: null
};

export default SplitPane;
