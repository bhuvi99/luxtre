import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styles from './SplitStyle.scss';
import SplitPane from './SplitPane';
import SplitContainer from './SplitContainer';

import { cloneDeep } from 'lodash';

import {
  hasChildren,
  findNodePath,
  findParentFromIndexedPath,
  findNodeFromIndexedPath,
  addContainerNodeByMutation,
  createContainerNode,
  addPaneNodeByMutation,
  orientationFromDirection,
} from './SplitFrameHelpers';

@observer
export default class SplitWindow extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { root: props.root };
    this.handleSplit = this.handleSplit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleUpdateContent = this.handleUpdateContent.bind(this);
  }

  handleSplit(node, direction) {
    this.setState(prevState => {
      const updatedState = cloneDeep(prevState);
      const orientation = orientationFromDirection(direction);
      const { parent } = node;
      if (parent) {
        const nodeIndex = parent.children.indexOf(node);
        const path = findNodePath(node);
        if (orientation !== parent.orientation) {
          addContainerNodeByMutation(direction, nodeIndex, updatedState, path);
        } else {
          addPaneNodeByMutation(direction, nodeIndex, updatedState, path);
        }
        return updatedState;
      }
      
      const newRoot = createContainerNode(direction, node);
      return { root: newRoot };
    });
  }

  handleClose(node) {
    if (!node.parent) 
      return; 

    this.setState(prevState => {
      const updatedState = cloneDeep(prevState);
      const parent = node.parent;
      const nodeIndex = parent.children.indexOf(node);
      const path = findNodePath(node);
      const clonedParent = findParentFromIndexedPath(updatedState.root, path);
      clonedParent.children.splice(nodeIndex, 1);

      if (hasChildren(clonedParent) && clonedParent.children.length === 1) {
        const lastChild = clonedParent.children[0];

        if (hasChildren(lastChild) && lastChild.children.length > 1) {
          const parentParent = clonedParent.parent;
          if (parentParent) {
            lastChild.children.forEach(child => (child.parent = parentParent)); // eslint-disable-line
            const clonedParentIndex = parentParent.children.indexOf(
              clonedParent
            );
            parentParent.children.splice(
              clonedParentIndex,
              1,
              ...lastChild.children
            );
          } else {
            delete lastChild.parent;
            updatedState.root = lastChild;
          }
        } else {
          delete clonedParent.children;
          delete clonedParent.orientation;
          clonedParent.content = lastChild.content;
        }
      }
      return updatedState;
    });
  }

  handleResize(containerNode, childSizes) {
    this.setState(prevState => {
      const updatedState = cloneDeep(prevState);
      const path = findNodePath(containerNode);
      const updatedContainerNode = findNodeFromIndexedPath(
        updatedState.root,
        path
      );
      Object.keys(childSizes)
        .map(id => parseInt(id, 10))
        .forEach(id => {
          const childNode = updatedContainerNode.children.find(
            node => node.id === id
          );
          childNode.flexGrow = childSizes[id];
        });
      return updatedState;
    });
  }

  handleUpdateContent(node, content) {
    if (content === null) {
      this.handleClose(node); // As not content to update, Close the Pane/Node
    } else {
      this.setState(prevState => {
        const updatedState = cloneDeep(prevState);
        const { parent } = node;
        if (!parent) {
          updatedState.root.content = content;
        } else {
          const nodeIndex = parent.children.indexOf(node);
          const path = findNodePath(node);
          const clonedParent = findParentFromIndexedPath(
            updatedState.root,
            path
          );
          clonedParent.children[nodeIndex].content = content;
        }
        return updatedState;
      });
    }
  }

  render() {
    return <div className={styles.window}></div>;
  }
}

export const renderFromRoot = (
  root,
  handleSplit,
  handleClose,
  handleResize,
  handleUpdateContent
) => {
  const render = node => {
    if (hasChildren(node)) {
      return (
        <SplitContainer key={node.id} node={node} onResize={handleResize}>
          {node.children.map(child => render(child))}
        </SplitContainer>
      );
    }
    return (
      <SplitPane
        key={node.id}
        node={node}
        onSplit={handleSplit}
        onUpdateContent={handleUpdateContent}
      />
    );
  };
  return render(root);
};