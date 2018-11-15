// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styles from './StakingChart.scss';

@observer
export default class StakingChart extends Component<State> {
  
  _graphLoading = true;
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  renderGraph(stakingData){

    var ctx = this;

    Highcharts.chart('staking-graph-container', {
        credits: {
            enabled: false
        },
        chart: {
            zoomType: 'x'
        },
        exporting: { 
            enabled: false 
        },
        title: {
            text: ''
        },  
        rangeSelector: {
            selected : 1,
            inputEnabled: false,
            buttons : [{
                type : 'hour',
                count : 1,
                text : '1h'
            },{
                type : 'day',
                count : 1,
                text : '1d'
            },{
                type : 'week',
                count : 1,
                text : '1w'
            },{
                type : 'Month',
                count : 1,
                text : '1m'
            },{
                type : 'year',
                count : 1,
                text : '1y'
            },{
                type : 'all',
                count : 1,
                text : 'All'
            }]
        },
        navigator: {
            enabled: false
        },
        scrollbar: {
            enabled: false
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            min: 0,
            title: {
                text: null
            }   
        },
        tooltip: {
            shared: true,
            positioner: function(labelWidth, labelHeight, point) {
                var xPos = point.plotX + this.chart.plotLeft + 10;
                var yPos = point.plotY + this.chart.plotTop;

                if (point.plotX + labelWidth > this.chart.chartWidth - this.chart.plotLeft) {
                    xPos = point.plotX + this.chart.plotLeft - labelWidth - 10;
                }

                return {
                    x: xPos,
                    y: yPos
                };
      }
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineWidth: 1,
                marker: {
                    enabled: false
                }
            }
        },
        series: [
          {
              name: 'Staking Weight',
              data: [],//moveAvgOfAcceptedData,
              type: 'area',
              tooltip:{
                pointFormatter:function(){
                  //var hashrate = ctx.formattedHashrate.call(ctx, this.y);
                  return 'Staking Weight: <b>' + this.y + '</b><br/>';
                }
              }
          }]
    });

    this._graphLoading = false;      
  }

  render() {

    return (
      <div className={styles.component}>
        <div className={styles.categoryTitle}> Staking Chart </div>
        <div className={cx(styles['chart'])} id='staking-graph-container'></div>
      </div>
    );
  }
}
