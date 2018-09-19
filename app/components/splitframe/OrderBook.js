import React, { Component } from 'react';
import { observer } from 'mobx-react';

type Props = {
    coinPrice: number,
  };  

@observer
export default class OrderBook extends Component<Props> {

    render() {
        return (
            <div>
                Here is OrderBook Page
            </div>   
        );
    }
}


