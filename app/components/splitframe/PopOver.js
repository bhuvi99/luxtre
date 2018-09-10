import React from 'react';
import PropTypes from 'prop-types';
import styles from './SplitStyle.scss'; 

import Icon from 'components/Icon';
import { observable } from 'mobx';
import { KEYCODES } from './SplitFrameConstants';

export const ANY_POPOVERS_OPEN = observable.box(false);

@observer
export default class PopOver extends React.PureComponent {
  state = { isPopOverOpen: false };

  render() {
    const { css, children, clickableLabel, showArrow } = this.props;
    const { isPopOverOpen } = this.state;

    const dropdownIcon = (
      <Icon iconId={isPopOverOpen ? 'Dropdown-Selected' : 'Dropdown-caret'} />
    );

    return (
      <div
        classname={styles.popOverWrapper}
        innerRef={node => {
          this.popOverWrapper = node;
        }}
        // eslint-disable-next-line react/jsx-handler-names
        onBlur={this.closePopOver}>
        <button
          onClickCapture={e => {
            e.stopPropagation();
            e.preventDefault();
            this.togglePopOver(!isPopOverOpen);
          }}
          aria-label={this.props.ariaLabel}
          innerRef={node => {
            this.popOverIcon = node
              ? node.querySelector('[data-popover-icon]') || node
              : null;
          }}>
          {clickableLabel ? clickableLabel(dropdownIcon) : dropdownIcon}
        </button>
      </div>
    );
  }
}

PopOver.propTypes = {
  children: PropTypes.node.isRequired,
  disableCloseInsideContent: PropTypes.bool,
  ariaLabel: PropTypes.string.isRequired,
  shouldCloseOnEsc: PropTypes.bool,
  shouldCloseOnBlur: PropTypes.bool,
  showArrow: PropTypes.bool,
  clickableLabel: PropTypes.func
};

PopOver.defaultProps = {
  shouldCloseOnEsc: false,
  shouldCloseOnBlur: false,
  showArrow: false,
  disableCloseInsideContent: false
};

