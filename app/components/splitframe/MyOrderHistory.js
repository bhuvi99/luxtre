import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { MYORDERHISTORY } from './SplitFrameConstants';

type Props = {
    coinPrice: number,
  };

const MyOrderHistory = observer(() => {
  const order = "OrderList";
  return (
    <React.Fragment>
        <div>My Order</div>
    </React.Fragment>
  );
});

MyOrderHistory.displayName = MYORDERHISTORY;
export default MyOrderHistory;
