import React from 'react';
import PropTypes from 'prop-types';
import PopOver from './PopOver';
import { isEqual } from 'lodash';
import styles from './SplitStyle.scss';

import TabGroup from '../TabGroup';
import { defaultTabContent } from './SplitFrameHelpers';
import { SFC_LEFT, SFC_DOWN, SFC_RIGHT, SFC_UP } from './SplitFrameConstants';
import Options from 'components/Options';

const SplitPane = ({ node, onSplit, onUpdateContent, innerRef, flexGrow }) => {
  const flexGrowValue = flexGrow || node.flexGrow;
  const style = flexGrowValue ? { flexGrow: flexGrowValue } : {};
  return (
    <div classname={styles.paneWrapper} innerRef={innerRef} style={style}>
      <TabGroup
        node={node}
        onUpdateContent={content => onUpdateContent(node, content)}
        dropDownMenu={() => (
          <PopOver ariaLabel="Pane Options" shouldCloseOnEsc shouldCloseOnBlur>
            <Options.Group style={{ minWidth: '200px' }}>
              <Options.Item
                icon="Split-Left"
                label="Split Left"
                onMouseDown={() => onSplit(node, SFC_LEFT)}
              />
              <Options.Item
                icon="Split-Right"
                label="Split Right"
                onMouseDown={() => onSplit(node, SFC_RIGHT)}
              />
              <Options.Item
                icon="Split-Up"
                label="Split Up"
                onMouseDown={() => onSplit(node, SFC_UP)}
              />
              <Options.Item
                icon="Split-Down"
                label="Split Down"
                onMouseDown={() => onSplit(node, SFC_DOWN)}
              />
              <Options.Separator />
              <Options.Item
                icon="Close-No-Circle"
                label="Close All Tabs"
                disabled={isEqual(node.content, defaultTabContent)}
                onMouseDown={e => {
                  onUpdateContent(node, defaultTabContent);
                  e.stopPropagation();
                }}
              />
              <Options.Item
                icon="Close"
                label="Close Pane"
                disabled={!node.parent}
                onMouseDown={e => {
                  onUpdateContent(node, null);
                  e.stopPropagation();
                }}
              />
            </Options.Group>
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
