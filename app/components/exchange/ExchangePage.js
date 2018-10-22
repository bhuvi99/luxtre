import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import ExchangeSettingPage from './ExchangeSettingPage';
import styles from './ExchangePage.scss';
import { CoinInfo } from '../../domain/CoinInfo';
import { LuxgateLog } from '../../types/LuxgateLogType';
import type { LGOrdersData } from '../../domain/LGOrders';
import type { LGPrice } from '../../domain/LGPriceArray';

type Props = {
  coinPrice: number,
  ordersData: LGOrdersData,
  coinInfoList: Array<CoinInfo>,
  logbuff: Array<LuxgateLog>,
  openDialogAction: Function,
  isDialogOpen: Function,
  onChangeCoin: Function,
  onSwapCoin: Function,
  onSwitchLuxgate: Function,
  lgPriceArrayList: Array<LGPrice>
};

@observer
export default class ExchangePage extends Component<Props> {
  render() {
    const {
      coinPrice,
      ordersData,
      coinInfoList,
      logbuff,
      openDialogAction,
      isDialogOpen,
      onChangeCoin,
      onSwapCoin,
      onSwitchLuxgate,
      lgPriceArrayList
    } = this.props;

    return (
      <div className={styles.component}>
        <ExchangeSettingPage
          coinPrice={coinPrice}
          ordersData={ordersData}
          lgPriceArrayList={lgPriceArrayList}
          coinInfoList={coinInfoList}
          logbuff={logbuff}
          openDialogAction={openDialogAction}
          isDialogOpen={isDialogOpen}
          onChangeCoin={onChangeCoin}
          onSwapCoin={onSwapCoin}
          onSwitchLuxgate={onSwitchLuxgate}
        />
      </div>
    );
  }
}
