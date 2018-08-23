import React, { Component } from 'react';
import PropTypes from 'prop-types';
import flatten from 'lodash/flatten';
import styles from './SplitStyle.scss';
import classNames from 'classnames';
import SplitResizer from './SplitResizer';
import { SFC_ROW, SFC_COLUMN, SFC_MIN_SIZE } from './SplitFrameConstants';


export const fitWithinRange = (size, maxSize) =>
  Math.min(Math.max(size, SFC_MIN_SIZE), maxSize - SFC_MIN_SIZE);

  @observer
  export default class SplitContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { isActive: false };

    // if we have persisted child flex grow values,
    // initialise our state with them
    if (props.node.children) {
      props.node.children.forEach(child => {
        //eslint-disable-next-line
        this.state[child.id] = child.flexGrow;
      });
    }

    this.handleMoveStop = this.handleMoveStop.bind(this);
    this.handleMoveStart = this.handleMoveStart.bind(this);
    this.handleMove = this.handleMove.bind(this);
  }

  // handles onMouseDown and onTouchStart
  handleMoveStart(event, targetId, counterPartId) {
    if (!event.touches) event.preventDefault();
    this.setState({
      isActive: true,
      targetId,
      counterPartId
    });
  }

  // handles onMouseMove and onTouchMove
  handleMove(event) {
    // below requirement to copy the event is required as
    // react uses SyntheticEvent https://reactjs.org/docs/events.html#event-pooling
    // which nullifies the event object for reuse hence, we cannot use the event
    // object for any purpose
    const user_event = { ...event };
    if (this.state.isActive) {
      this.setState((prevState, props) => {
        const { children, orientation } = props.node;
        const targetNode = children.find(
          node => node.id === this.state.targetId
        );
        const targetNodeFlexGrow = targetNode.flexGrow || 1;
        const targetRef = this.childRefs[prevState.targetId];
        const targetWidth = targetRef.getBoundingClientRect().width;
        const targetHeight = targetRef.getBoundingClientRect().height;
        const counterPartNode = children.find(
          node => node.id === prevState.counterPartId
        );
        const counterPartNodeFlexGrow = counterPartNode.flexGrow || 1;
        const counterPartRef = this.childRefs[prevState.counterPartId];
        const counterPartWidth = counterPartRef.getBoundingClientRect().width;
        const counterPartHeight = counterPartRef.getBoundingClientRect().height;

        const currentClientPosition =
          orientation === SFC_ROW
            ? user_event.touches
              ? user_event.touches[0].clientX
              : user_event.clientX
            : user_event.touches
              ? user_event.touches[0].clientY
              : user_event.clientY;
        const targetSize = orientation === SFC_ROW ? targetWidth : targetHeight;
        const counterPartSize =
          orientation === SFC_ROW ? counterPartWidth : counterPartHeight;
        const targetOffSet =
          orientation === SFC_ROW
            ? targetRef.getBoundingClientRect().left
            : targetRef.getBoundingClientRect().top;
        const pairSize = targetSize + counterPartSize;

        const newTargetSize = fitWithinRange(
          currentClientPosition - targetOffSet,
          pairSize
        );
        const newCounterPartSize = fitWithinRange(
          pairSize - newTargetSize,
          pairSize
        );
        const totalScale = targetNodeFlexGrow + counterPartNodeFlexGrow;
        const targetFlexGrow = (newTargetSize * totalScale) / pairSize; // prettier-ignore
        const counterPartFlexGrow = (newCounterPartSize * totalScale) / pairSize; // prettier-ignore

        // This is the fitDimensions HoC for react-stock-charts
        // Could consider resizing the pane as resizing the window...
        const resizeEvent = new Event('resize');
        window.dispatchEvent(resizeEvent);

        return {
          [this.state.targetId]: targetFlexGrow,
          [this.state.counterPartId]: counterPartFlexGrow
        };
      });
    }
  }

  // handles onMouseUp and onTouchEnd
  handleMoveStop() {
    if (this.state.isActive) {
      this.setState(prevState => {
        this.props.onResize(this.props.node, {
          [prevState.targetId]: prevState[prevState.targetId],
          [prevState.counterPartId]: prevState[prevState.counterPartId]
        });
        return { isActive: false };
      });
    }
  }

  render() {
    this.childRefs = {};
    let children = this.props.children;
    const childrenCount = React.Children.count(this.props.children);
    if (childrenCount > 1) {
      const resizerOrientation =
        this.props.node.orientation === SFC_ROW ? SFC_COLUMN : SFC_ROW;
      const childrenArray = React.Children.toArray(this.props.children);
      const interleavedChildren = childrenArray.map((child, index) => {
        const nodeId = child.props.node.id;
        const flexGrow = this.state[nodeId];
        const clonedChild = React.cloneElement(child, {
          flexGrow,
          innerRef: ref => {
            if (ref) {
              this.childRefs[nodeId] = ref;
            }
          }
        });
        const pair = [clonedChild];
        if (index < childrenCount - 1) {
          const counterPartId = childrenArray[index + 1].props.node.id;
          const resizer = (
            <SplitResizer
              key={`resizer${index}`} // eslint-disable-line
              orientation={resizerOrientation}
              onMouseDown={e => this.handleMoveStart(e, nodeId, counterPartId)}
              onTouchStart={e => this.handleMoveStart(e, nodeId, counterPartId)}
            />
          );
          pair.push(resizer);
        }
        return pair;
      });

      children = flatten(interleavedChildren);
    }

    const flexGrow = this.props.flexGrow || this.props.node.flexGrow;
    const flexDirection = { flexDirection: this.props.orientation };
    const resizableStyles = classNames([
      styles.resizableContainer,
      flexGrow,
      flexDirection
    ]);
    var style = {
      color: 'white',
      fontSize: 200
    };

    return (
      <div
        className={resizableStyles}
        innerRef={this.props.innerRef}
        orientation={this.props.node.orientation}
        onMouseMove={this.handleMove}
        onTouchMove={this.handleMove}
        onMouseUp={this.handleMoveStop}
        onTouchEnd={this.handleMoveStop}>
        {children}
        
      </div>
    );
  }
}

SplitContainer.propTypes = {
  children: PropTypes.node.isRequired,
  orientation: PropTypes.oneOf([SFC_ROW, SFC_COLUMN]),
  innerRef: PropTypes.func,
  node: PropTypes.object.isRequired,
  onResize: PropTypes.func.isRequired,
  flexGrow: PropTypes.number
};

SplitContainer.defaultProps = {
  orientation: SFC_ROW,
  innerRef: null,
  flexGrow: null
};
