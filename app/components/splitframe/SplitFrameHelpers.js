import React from 'react';
import cloneDeep from 'lodash/cloneDeep';

import ElementName from '../../utils/ElementNames';
import getNodeId from './getNodeId';
import TabContentSelector from './TabGroup/TabContentSelector'; // eslint-disable-line
import { SFC_COLUMN, SFC_DOWN, SFC_LEFT, SFC_RIGHT, SFC_ROW } from './SplitFrameConstants';

export const defaultTab = {
  ElementName: ElementName.TABCONTENTSELECTOR
};
const chartTab = { ElementName: ElementName.CHART };
const orderBookTab = { ElementName: ElementName.ORDERBOOK };
const orderHistoryTab = {
  ElementName: ElementName.MYORDERHISTORY
};

export const defaultTabContent = {
  activeIndex: 0,
  tabs: [defaultTab]
};

export const hasChildren = ({ children }) =>
  children !== null && Array.isArray(children);

export const orientationFromDirection = direction => {
  if (direction === SFC_LEFT || direction === SFC_RIGHT) return SFC_ROW;
  return SFC_COLUMN;
};

export const createNode = orientation => {
  const node = {
    id: getNodeId(),
    orientation
  };
  return node;
};

export const createNodeWithParent = parent => {
  const node = {
    id: getNodeId(),
    parent,
    flexGrow: 1,
    content: cloneDeep(defaultTabContent)
  };
  return node;
};

export const createRootNode = orientation => {
  const root = createNode(orientation);
  return root;
};

export const createContainerNode = (direction, splitFromNode) => {
  const orientation = orientationFromDirection(direction);
  const container = createNode(orientation);
  container.flexGrow = splitFromNode.flexGrow;
  const newNode = createNodeWithParent(container);
  const replantedNode = {
    ...splitFromNode,
    parent: container,
    flexGrow: 1
  };
  if (direction === SFC_RIGHT || direction === SFC_DOWN) {
    container.children = [replantedNode, newNode];
  } else {
    container.children = [newNode, replantedNode];
  }
  return container;
};

const desktopDefaultRoot = () => {
  const root = createNode(SFC_COLUMN);
  root.children = [createNodeWithParent(root), createNodeWithParent(root)];

  root.children[0] = createContainerNode(SFC_RIGHT, root.children[0]);
  root.children[0].parent = root;
  root.children[0].flexGrow = 1.4;
  root.children[0].children[0].content.tabs[0] = chartTab;
  root.children[0].children[0].flexGrow = 1.32;

  root.children[0].children[1] = createContainerNode(
    SFC_RIGHT,
    root.children[0].children[1]
  );
  root.children[0].children[1].parent = root.children[0];
  root.children[0].children[1].flexGrow =
    2 - root.children[0].children[0].flexGrow;

  root.children[0].children[1].children[0].content.tabs[0] = orderBookTab;
  root.children[0].children[1].children[0].flexGrow = 0.55;
  root.children[0].children[1].children[1].flexGrow =
    1 - root.children[0].children[1].children[0].flexGrow;

  root.children[1].content.tabs[0] = orderHistoryTab;
  root.children[1].flexGrow = 2 - root.children[0].flexGrow;

  return root;
};

export const createDefaultRoot = breakpoint => {
  let root = desktopDefaultRoot();
  return root;
};

export const findNodePath = node => {
  if (node) {
    const path = [];
    const find = n => {
      const parent = n.parent;
      if (parent && parent.children) {
        const myIndex = parent.children.indexOf(n);
        path.unshift(myIndex);
        find(parent);
      }
    };
    find(node);
    return path;
  }
  return false;
};

export const findParentFromIndexedPath = (node, path) => {
  if (path && node) {
    if (path.length === 1) {
      return node;
    }
    const nextNode = node.children[path.shift()];
    return findParentFromIndexedPath(nextNode, path);
  }
  return false;
};

export const findNodeFromIndexedPath = (node, path) => {
  if (node && path) {
    if (!path || path.length === 0) {
      return node;
    }
    const nextNode = node.children[path.shift()];
    return findNodeFromIndexedPath(nextNode, path);
  }
  return false;
};

export const addContainerNodeByMutation = (
  direction,
  nodeIndex,
  state,
  path
) => {
  if (
    typeof nodeIndex === 'number' &&
    state &&
    Array.isArray(path) &&
    path.length >= 1
  ) {
    const parent = findParentFromIndexedPath(state.root, path);
    const splitFromNode = parent.children[nodeIndex];
    const containerNode = createContainerNode(direction, splitFromNode);
    containerNode.parent = parent;
    parent.children[nodeIndex] = containerNode;
    return state;
  }
  return false;
};

export const addPaneNodeByMutation = (direction, nodeIndex, state, path) => {
  if (
    typeof nodeIndex === 'number' &&
    state &&
    Array.isArray(path) &&
    path.length >= 1
  ) {
    const parent = findParentFromIndexedPath(state.root, path);
    let insertionIndex = nodeIndex;
    if (direction === SFC_RIGHT || direction === SFC_DOWN)
      insertionIndex = nodeIndex + 1;
    parent.children.splice(insertionIndex, 0, createNodeWithParent(parent));
    return state;
  }
  return false;
};

