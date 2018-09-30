import React, { Component } from 'react';
import { observer } from 'mobx-react';

type Props = {
    coinPrice: number,
  };

@observer
export default class Chart extends Component<Props> {

    render() {
        return (
            <div>
                Here is Chart Page
            </div>   
        );
    }
}


