import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import styles from './SplitStyle.scss'; 
import classnames from 'classnames';

import SvgInline from 'react-svg-inline';
import { observable } from 'mobx';
import { KEYCODES } from './SplitFrameConstants';
import arrowIcon from '../../assets/images/arrow.inline.svg';

export const ANY_POPOVERS_OPEN = observable.box(false);

@observer
export default class PopOver extends React.PureComponent {
  state = { isPopOverOpen: false };

  addEventListeners() {
    if (this.props.shouldCloseOnEsc) {
      document.addEventListener('keydown', this.handleKeyDown);
    }
    if (this.props.shouldCloseOnBlur) {
      document.addEventListener('mousedown', this.handleMouseDown);
    }
    window.addEventListener('resize', this.closePopOver);
  }

  removeEventListeners() {
    if (this.props.shouldCloseOnEsc) {
      document.removeEventListener('keydown', this.handleKeyDown);
    }
    if (this.props.shouldCloseOnBlur) {
      document.removeEventListener('mousedown', this.handleMouseDown);
    }
    window.removeEventListener('resize', this.closePopOver);
  }

  componentWillUnmount() {
    this.removeEventListeners();
  }

  closePopOver = () => this.togglePopOver(false);

  handleKeyDown = evt => {
    if (evt.keyCode === KEYCODES.ESCAPE && this.state.isPopOverOpen) {
      this.closePopOver();
    }
  };

  handleMouseDown = evt => {
    if (this.state.isPopOverOpen) {
      const isTargetInsideToolTip = document
        .querySelector('.ToolTipPortal')
        .contains(evt.target);

      if (this.props.disableCloseInsideContent && isTargetInsideToolTip) {
        evt.preventDefault();
        return;
      } else if (
        !this.popOverWrapper ||
        this.popOverWrapper.contains(evt.target)
      ) {
        return;
      } else {
        this.closePopOver();
      }
    }
  };

  togglePopOver = isPopOverOpen => {
    if (isPopOverOpen) {
      this.addEventListeners();
    } else {
      this.removeEventListeners();
    }
    this.setState({ isPopOverOpen });
    ANY_POPOVERS_OPEN.set(isPopOverOpen);
  };

  render() {
    const { css, children, clickableLabel, showArrow } = this.props;
    const { isPopOverOpen } = this.state;

    const arrowClasses = classnames([
      isPopOverOpen ? styles.arrow : styles.arrowCollapsed
    ]);

    return (
      <div
        className={styles.popOverWrapper}
        ref={node => {
          this.popOverWrapper = node;
        }}
        // eslint-disable-next-line react/jsx-handler-names
        onBlur={this.closePopOver}>
        <button
          className={styles.btnPopOver}
          onClickCapture={e => {
            e.stopPropagation();
            e.preventDefault();
            this.togglePopOver(!isPopOverOpen);
          }}
          aria-label={this.props.ariaLabel}
          ref={node => {
            this.popOverIcon = node
              ? node.querySelector('[data-popover-icon]') || node
              : null;
          }}>
          { !isPopOverOpen ? (
            <SvgInline svg={arrowIcon} className={arrowClasses} />
          ) : (
            <SvgInline svg={arrowIcon} className={arrowClasses} />
          ) }
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

