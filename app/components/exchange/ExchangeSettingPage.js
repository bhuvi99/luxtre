import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import classnames from 'classnames';
import Select from 'react-polymorph/lib/components/Select';
import SelectSkin from 'react-polymorph/lib/skins/simple/SelectSkin';
import NumericInput from 'react-polymorph/lib/components/NumericInput';
import InputSkin from 'react-polymorph/lib/skins/simple/raw/InputSkin';
import Button from 'react-polymorph/lib/components/Button';
import ButtonSkin from 'react-polymorph/lib/skins/simple/raw/ButtonSkin';
import Checkbox from 'react-polymorph/lib/components/Checkbox';
import TogglerSkin from 'react-polymorph/lib/skins/simple/TogglerSkin';
import LuxgateLoginDialog from './LuxgateLoginDialog';
import LuxgateSettingsDialog from './LuxgateSettingsDialog';
import LuxgateLoginDialogContainer from '../../containers/wallet/dialogs/LuxgateLoginDialogContainer';
import LuxgateSettingsDialogContainer from '../../containers/wallet/dialogs/LuxgateSettingsDialogContainer';
import ReceiveAddressDialog from './ReceiveAddressDialog';
import ReceiveAddressDialogContainer from '../../containers/wallet/dialogs/ReceiveAddressDialogContainer';
import SendCoinDialog from './SendCoinDialog';
import SendCoinDialogContainer from '../../containers/wallet/dialogs/SendCoinDialogContainer';
import { CoinInfo } from '../../domain/CoinInfo';
import COINS from './coins';
import sendImage from '../../assets/images/wallet-nav/send.png';
import recvImage from '../../assets/images/wallet-nav/receive.png';
import switchCoinImage from '../../assets/images/wallet-nav/switch-coin.png';
import { formattedAmountToBigNumber, formattedAmountToNaturalUnits } from '../../utils/formatters';
import { LuxgateLog } from '../../types/LuxgateLogType';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import ExchangeChartPage from './ExchangeChartPage';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import styles from './ExchangeSettingPage.scss';
import type { LGPrice } from '../../domain/LGPriceArray';
import type { LGOrdersData } from '../../domain/LGOrders';
import type { InjectedContainerProps } from '../../types/injectedPropsType';

type Props = {
  coinPrice: number,
  ordersData: LGOrdersData,
  coinInfoList: Array<CoinInfo>,
  logbuff: Array<LuxgateLog>,
  openDialogAction: Function,
  isDialogOpen: Function,
  onChangeCoin: Function,
  onSwapCoin: Function,
  lgPriceArrayList: Array<LGPrice>
} & InjectedContainerProps;

type State = {
  isBuy: boolean,
  AmountInput: string,
  ValueInput: string,
  Coin1: string,
  Coin2: string,
  recvCoin: string,
  recvAddress: string,
  isShowLog: boolean
};

@inject('stores', 'actions')
@observer
export default class ExchangeSettingPage extends Component<Props, State> {
  state = {
    isBuy: true,
    AmountInput: '',
    ValueInput: '',
    Coin1: 'BTC',
    Coin2: 'LUX',
    recvCoin: '',
    sendCoin: '',
    recvAddress: '',
    balance: '',
    isShowLog: true
  };

  componentDidMount() {
    this.props.onChangeCoin('all', 0);
  }

  toggleLogAndHistory() {
    const isLogined = this.props.stores.luxgate.loginInfo.isLogined;
    if (this.state.isShowLog && !isLogined) {
      return this.props.actions.luxgate.logger.addLog.trigger({
        content: 'Please login first to view history',
        type: 'info'
      });
    }
    this.setState({ isShowLog: !this.state.isShowLog });
  }

  changeAmountInput(value) {
    this.setState({ AmountInput: value });
  }

  changeValueInput(value) {
    this.setState({ ValueInput: value });
  }

  changeCoin1(value) {
    if (value == this.state.Coin2) return;
    this.setState({ Coin1: value });
    this.props.onChangeCoin(value, 1);
  }

  changeCoin2(value) {
    if (value == this.state.Coin1) return;
    this.setState({ Coin2: value });
    this.props.onChangeCoin(value, 2);
  }

  swapCoin() {
    if (this.state.AmountInput == 0 || this.state.ValueInput == 0) return;

    const buy_coin = this.state.Coin1;
    const sell_coin = this.state.Coin2;
    const amount = this.state.AmountInput;
    const value = this.state.ValueInput;
    this.props.onSwapCoin(buy_coin, sell_coin, parseFloat(amount), parseFloat(value));
  }

  handleSwitchCoin() {
    const coin1 = this.state.Coin1;
    const coin2 = this.state.Coin2;
    this.setState({ Coin1: coin2 });
    this.props.onChangeCoin(coin2, 1);
    this.setState({ Coin2: coin1 });
    this.props.onChangeCoin(coin1, 2);
  }

  calculateTotal(amount, value) {
    const a = formattedAmountToBigNumber(amount);
    const v = formattedAmountToBigNumber(value);
    if (a == 0 || v == 0) return 0;
    return a * v;
  }

  getCoinBalance(coin) {
    if (this.props.coinInfoList.length != 0) {
      const element = this.props.coinInfoList.find(info => info.coin == coin);
      if (element !== undefined) return element.balance;
    }
  }

  getCoinAddress(coin) {
    if (this.props.coinInfoList.length != 0) {
      const element = this.props.coinInfoList.find(info => info.coin == coin);
      if (element !== undefined) return element.address;
    }
  }

  openReceiveDialog(coin) {
    const address = this.getCoinAddress(coin);

    this.setState({ recvCoin: coin });
    this.setState({ recvAddress: address });

    this.props.openDialogAction({ dialog: ReceiveAddressDialog });
  }

  openSendDialog(coin) {
    this.setState({
      sendCoin: coin,
      balance: this.getCoinBalance(coin)
    });

    this.props.openDialogAction({ dialog: SendCoinDialog });
  }

  sendReceivePanel = () => {
    const { Coin1, Coin2 } = this.state;

    return (
      <div className={styles.sendReceivePanel}>
        <div className={styles.coinbalance}>
          <div className={styles.coin}>{Coin1}</div>
          <div className={styles.balance}>{this.getCoinBalance(Coin1)}</div>
          <div className={styles.recv}>
            <Button
              onClick={() => this.openReceiveDialog(Coin1)}
              label="Receive"
              skin={<ButtonSkin />}
            />
          </div>
          <div className={styles.send}>
            <Button onClick={() => this.openSendDialog(Coin1)} label="Send" skin={<ButtonSkin />} />
          </div>
        </div>
        <div className={styles.coinbalance}>
          <div className={styles.coin}>{Coin2} </div>
          <div className={styles.balance}>{this.getCoinBalance(Coin2)}</div>
          <div className={styles.recv}>
            <Button
              onClick={() => this.openReceiveDialog(Coin2)}
              label="Receive"
              skin={<ButtonSkin />}
            />
          </div>
          <div className={styles.send}>
            <Button onClick={() => this.openSendDialog(Coin2)} label="Send" skin={<ButtonSkin />} />
          </div>
        </div>
      </div>
    );
  };

  orderBook = () => {
    const orderColumns = [
      {
        Header: 'Price',
        accessor: 'price' // String-based value accessors!
      },
      // {
      //   Header: 'Min Volume',
      //   accessor: 'minvolume'
      // },
      {
        Header: 'Volume',
        accessor: 'maxvolume'
      },
      {
        id: 'Total',
        Header: 'Sum',
        accessor: 'numutxos' // Custom value accessors!
      }
    ];

    const { ordersData } = this.props;
    const { Coin1, Coin2 } = this.state;

    return (
      <div className={styles.orderBook}>
        <div className={styles.orderTable1}>
          <div className={styles.orderTableCaptionBar}>
            <span className={styles.order}>{`${ordersData.numbids || 0} Bids`}</span>
            <div className={styles.tableCaptionPos}>
              {Coin2} &rArr; {Coin1}{' '}
            </div>
          </div>
          <ReactTable
            data={ordersData.bids}
            columns={orderColumns}
            defaultPageSize={10}
            className="-striped -highlight"
          />
        </div>
        <div className={styles.orderTable2}>
          <div className={styles.orderTableCaptionBar}>
            <span className={styles.order}>{`${ordersData.numasks || 0} Asks`}</span>
            <div className={styles.tableCaptionPos}>
              {' '}
              {Coin1} &rArr; {Coin2}{' '}
            </div>
          </div>
          <ReactTable
            data={ordersData.asks}
            columns={orderColumns}
            defaultPageSize={10}
            className="-striped -highlight"
          />
        </div>
      </div>
    );
  };

  render() {
    const {
      isBuy,
      AmountInput,
      ValueInput,
      Coin1,
      Coin2,
      recvCoin,
      sendCoin,
      recvAddress,
      balance,
      isShowLog
    } = this.state;

    const {
      coinPrice,
      ordersData,
      coinInfoList,
      logbuff,
      openDialogAction,
      isDialogOpen,
      onChangeCoin,
      lgPriceArrayList,
      stores
    } = this.props;
    const isLogined = this.props.stores.luxgate.loginInfo.isLogined;
    const {
      luxgate: { transactions }
    } = stores;

    const openOrderColumns = [
      {
        Header: 'Base Coin',
        accessor: 'base' // String-based value accessors!
      },
      {
        Header: 'Related Coin',
        accessor: 'rel'
      },
      {
        Header: 'Bid',
        accessor: 'bid'
      },
      {
        Header: 'Ask',
        accessor: 'ask' // Custom value accessors!
      }
    ];

    const swapStatusColumns = [
      {
        Header: 'Request ID',
        accessor: 'requestid' // String-based value accessors!
      },
      {
        Header: 'Quote ID',
        accessor: 'quoteid'
      },
      {
        Header: 'Source Amount',
        accessor: 'srcamount'
      },
      {
        Header: 'Status',
        accessor: 'status' // Custom value accessors!
      }
    ];

    const balancesColumns = [
      {
        Header: 'Coin',
        accessor: 'coin' // String-based value accessors!
      },
      {
        Header: 'Balance',
        accessor: 'balance' // String-based value accessors!
      }
    ];

    const loggerColumns = [
      {
        Header: 'Time',
        width: 70,
        accessor: 'time' // String-based value accessors!
      },
      {
        Header: 'Type',
        width: 50,
        accessor: 'type' // String-based value accessors!
      },
      {
        Header: 'Description',
        accessor: 'content'
      }
    ];

    const coinStyle = {
      width: 20,
      height: 20,
      borderRadius: 3,
      display: 'inline-block',
      marginRight: 10,
      position: 'relative',
      top: -2,
      verticalAlign: 'middle'
    };

    const coinImageStyle = {
      width: 30,
      height: 30,
      position: 'absolute',
      marginTop: 5,
      marginLeft: 38,
      verticalAlign: 'middle'
    };

    const swapButtonClasses = classnames(['primary']);

    const inputProps = {
      skin: <InputSkin />,
      className: styles.numericInput,
      maxBeforeDot: 5,
      maxAfterDot: 6,
      maxValue: 100000,
      minValue: 0.000001
    };

    const selectProps = {
      skin: <SelectSkin />,
      className: styles.selectWidth,
      options: COINS,
      optionRenderer: option => (
        <div>
          <img src={option.image} style={coinStyle} />
          <span>{option.label}</span>
        </div>
      )
    };

    return (
      <div className={styles.pageContainer}>
        <div className={styles.content}>
          {this.orderBook()}
          <div className={styles.graph}>
            <Tabs>
              <TabList>
                <Tab>Chart</Tab>
                <Tab>Order book</Tab>
                <Tab>Open Orders</Tab>
                <Tab>Balances</Tab>
                <li className={`${styles.divStatusTab}`}>
                  <span>
                    {Coin1}/{Coin2} Current:
                  </span>
                  <span className={styles.spanPrice}>{coinPrice}</span>
                </li>
              </TabList>

              <TabPanel>
                <ExchangeChartPage data={lgPriceArrayList} />
              </TabPanel>

              <TabPanel>{this.orderBook()}</TabPanel>

              <TabPanel>
                <div className={styles.openOrdersTable}>
                  <div className={styles.orderTableCaptionBar}>
                    <div className={styles.tableCaptionPos}>Open Orders</div>
                  </div>
                  <ReactTable
                    data={transactions.lgOpenOrders}
                    columns={openOrderColumns}
                    defaultPageSize={10}
                    className="-striped -highlight"
                  />
                </div>

                <div className={styles.openOrdersTable}>
                  <div className={styles.orderTableCaptionBar}>
                    <div className={styles.tableCaptionPos}>Personal Swaps</div>
                  </div>
                  <ReactTable
                    data={transactions.lgSwapStatus}
                    columns={swapStatusColumns}
                    defaultPageSize={10}
                    className="-striped -highlight"
                  />
                </div>
              </TabPanel>

              <TabPanel>
                <div className={styles.balancesTable}>
                  <div className={styles.balancesTableCaptionBar}>
                    <div className={styles.tableCaptionPos}>Coin Balances</div>
                  </div>
                  <ReactTable
                    data={transactions.lgBalances}
                    columns={balancesColumns}
                    defaultPageSize={10}
                    className="-striped -highlight"
                  />
                </div>
              </TabPanel>
            </Tabs>
          </div>
          <div className={styles.assistContainer}>
            <div className={styles.setting}>
              <div className={styles.card}>
                <div className={styles.cardTitle}>Coupled Asset Swap</div>
                <h6 className={styles.cardSubtitle}>Please swap your currency from here</h6>
              </div>
              <div className={styles.component}>
                {!isBuy ? (
                  <img src={sendImage} className={styles.imageStyle} />
                ) : (
                  <img src={recvImage} className={styles.imageStyle} />
                )}
                <Select {...selectProps} value={Coin1} onChange={this.changeCoin1.bind(this)} />
                {Coin1 === '' ? null : (
                  <img
                    src={require('../../assets/crypto/' + Coin1 + '.png')}
                    style={coinImageStyle}
                  />
                )}
                {/* <div className={styles.span}> Amount </div>*/}
                <NumericInput
                  {...inputProps}
                  placeholder={'0.000000 ' + Coin1}
                  value={AmountInput}
                  onChange={this.changeAmountInput.bind(this)}
                />
              </div>
              <div className={styles.switch}>
                <img
                  src={switchCoinImage}
                  className={styles.switchButton}
                  onClick={this.handleSwitchCoin.bind(this)}
                />
              </div>
              <div className={styles.component}>
                {!isBuy ? (
                  <img src={recvImage} className={styles.imageStyle} />
                ) : (
                  <img src={sendImage} className={styles.imageStyle} />
                )}
                <Select {...selectProps} value={Coin2} onChange={this.changeCoin2.bind(this)} />
                {Coin2 === '' ? null : (
                  <img
                    src={require('../../assets/crypto/' + Coin2 + '.png')}
                    style={coinImageStyle}
                  />
                )}
                {/* <span className={styles.span}> Value </span>*/}
                <NumericInput
                  {...inputProps}
                  placeholder={'0.000000 ' + Coin2}
                  value={ValueInput}
                  onChange={this.changeValueInput.bind(this)}
                />
              </div>
              <div className={styles.divTotal}>
                <span className={styles.spanMargin36}> Total: </span>
                <span>
                  {' '}
                  {this.calculateTotal(AmountInput, ValueInput)} {Coin2}{' '}
                </span>
              </div>
              <div className={styles.swapbutton}>
                <Button
                  className={swapButtonClasses}
                  label="Swap"
                  onClick={this.swapCoin.bind(this)}
                  skin={<ButtonSkin />}
                />
              </div>
            </div>
            {this.sendReceivePanel()}
            <div className={styles.dataTable}>
              <div className={styles.LogListCaptionBar}>
                <span>Status</span>
              </div>
              <div className={styles.logTable}>
                <ReactTable
                  data={logbuff.slice()}
                  columns={loggerColumns}
                  sortable={false}
                  defaultPageSize={10}
                  className="-striped -highlight"
                />
              </div>
            </div>
          </div>
        </div>
        {isDialogOpen(ReceiveAddressDialog) ? (
          <ReceiveAddressDialogContainer
            coinName={recvCoin}
            walletAddress={recvAddress}
            error={this.state.outputsError}
          />
        ) : null}
        {isDialogOpen(SendCoinDialog) ? (
          <SendCoinDialogContainer
            coinName={sendCoin}
            balance={balance}
            error={this.state.outputsError}
          />
        ) : null}
        {isDialogOpen(LuxgateLoginDialog) ? (
          <LuxgateLoginDialogContainer error={this.state.outputsError} />
        ) : null}
        {isDialogOpen(LuxgateSettingsDialog) ? (
          <LuxgateSettingsDialogContainer error={this.state.outputsError} />
        ) : null}
      </div>
    );
  }
}
