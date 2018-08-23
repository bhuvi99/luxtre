let nid = 0;

export const resetNodeId = newNodeId => {
  nid = newNodeId;
};

export default () => {
  const currentNodeId = nid;
  nid += 1;
  return currentNodeId;
};
