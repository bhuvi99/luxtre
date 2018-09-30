import React from 'react';
import PropTypes from 'prop-types';

import { SFC_ROW, SFC_COLUMN } from './SplitFrameConstants';

const SplitResizer = ({ orientation, onMouseDown, onTouchStart }) => (
  <span
    orientation={orientation}
    onMouseDown={onMouseDown}
    onTouchStart={onTouchStart}
    data-ci="Pane-Resizer"
  />
);

SplitResizer.propTypes = {
  orientation: PropTypes.oneOf([SFC_ROW, SFC_COLUMN]).isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onTouchStart: PropTypes.func.isRequired
};

export default SplitResizer;
