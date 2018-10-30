// @flow

// https://codesandbox.io/s/github/rrag/react-stockcharts-examples2/tree/master/examples/CandleStickChartWithUpdatingData

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import data from './chartdata';
import { timeParse } from 'd3-time-format';
import Chart from './Chart';

import type { LGPrice } from '../../domain/LGPriceArray';

import Datafeed from './api/'
const TradingView = require("./charting_library/charting_library.min.js");

type Props = {
  data: Array<LGPrice>
};

@observer
export default class ExchangeChartPage extends Component<Props> {

  static defaultProps = {
		symbol: 'Cryptopia:LUX/USD',
		interval: '20',
		containerId: 'tv_chart',
		libraryPath: '/charting_library/',
		chartsStorageUrl: 'https://saveload.tradingview.com',
		chartsStorageApiVersion: '1.1',
		clientId: 'tradingview.com',
		userId: 'public_user_id',
		fullscreen: false,
		autosize: true,
		studiesOverrides: {},
	};

	componentDidMount() {
		const widgetOptions = {
			debug: false,
			symbol: this.props.symbol,
			datafeed: Datafeed,
			interval: this.props.interval,
			container_id: this.props.containerId,
			library_path: this.props.libraryPath,
			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings'],
			enabled_features: ['study_templates'],
			charts_storage_url: this.props.chartsStorageUrl,
			charts_storage_api_version: this.props.chartsStorageApiVersion,
			client_id: this.props.clientId,
			user_id: this.props.userId,
			fullscreen: this.props.fullscreen,
			autosize: this.props.autosize,
			studies_overrides: this.props.studiesOverrides,
			overrides: {
				// "mainSeriesProperties.showCountdown": true,
				"paneProperties.background": "#131722",
				"paneProperties.vertGridProperties.color": "#363c4e",
				"paneProperties.horzGridProperties.color": "#363c4e",
				"symbolWatermarkProperties.transparency": 90,
				"scalesProperties.textColor" : "#AAA",
				"mainSeriesProperties.candleStyle.wickUpColor": '#336854',
				"mainSeriesProperties.candleStyle.wickDownColor": '#7f323f',
			}
		};

	}


  render() {
    // d.date = parse(d.date);
    // d.open = +d.open;
    // d.high = +d.high;
    // d.low = +d.low;
    // d.close = +d.close;
    // d.volume = +d.volume;
    const parseDate = timeParse('%Y-%m-%d');
    // this.props.data
    // const chartData = data.map(priceArray => ({
    //   timestamp: priceArray[0],
    //   high: priceArray[1],
    //   low: priceArray[2],
    //   open: priceArray[3],
    //   close: priceArray[4],
    //   relvolume: priceArray[5],
    //   basevolume: priceArray[6],
    //   numtrades: priceArray[7]
    // }));
    const chartData = data.map(priceArray => ({
      timestamp: priceArray[0],
      high: priceArray[2],
      low: priceArray[3],
      open: priceArray[1],
      close: priceArray[4],
      basevolume: priceArray[5]
    }));

    const myData = chartData.map(lgPrice => {
      const myDate = new Date(lgPrice.timestamp);
      //const parsedTime = parseDate(myDate);
      return {
        date: myDate,
        open: lgPrice.open,
        high: lgPrice.high,
        low: lgPrice.low,
        close: lgPrice.close,
        volume: lgPrice.basevolume // I guess? or ( sum base rel / 2 )?
      };
    });
    return <Chart type="hybrid" data={ myData } />;
  }
}
