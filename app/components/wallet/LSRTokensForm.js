// @flow
import React, { Component } from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react';
import LocalizableError from '../../i18n/LocalizableError';
import { defineMessages, intlShape, FormattedHTMLMessage } from 'react-intl';
import Button from 'react-polymorph/lib/components/Button';
import SimpleButtonSkin from 'react-polymorph/lib/skins/simple/raw/ButtonSkin';
import styles from './LSRTokensForm.scss';
import ReactTable from "react-table";
import "react-table/react-table.css";

type Props = {
  payto: string,
  amount: number,
  description: string,
  gaslimit: number,
  gasprice: number,
  receiveaddress: string,
  contractaddress: string,
  tokenname: string,
  tokensymbol: string,
  decimals: string,
  senderaddress: string,
  saveToken: Function
};

type State = {
  payto: string,
  amount: number,
  description: string,
  gaslimit: number,
  gasprice: number,
  receiveaddress: string,
  contractaddress: string,
  tokenname: string,
  tokensymbol: string,
  decimals: string,
  senderaddress: string
};

@observer
export default class LSRTokensForm extends Component<Props, State> {
  state = {
    payto: this.props.payto,
    amount: this.props.amount,
    description: this.props.description,
    gaslimit: this.props.gaslimit,
    gasprice: this.props.gasprice,
    receiveaddress: this.props.receiveaddress,
    contractaddress: this.props.contractaddress,
    tokenname: this.props.tokenname,
    tokensymbol: this.props.tokensymbol,
    decimals: this.props.decimals,
    senderaddress: this.props.senderaddress,
    selectTab: 'send'
  };

  defaultPrice = 0.0000004;

  componentDidMount() {
  }

  componentWillUnmount() {
    this.props.saveToken(
      this.state.payto,
      this.state.amount,
      this.state.description,
      this.state.gaslimit,
      Number(this.state.gasprice),
      this.state.receiveaddress,
      this.state.contractaddress,
      this.state.tokenname,
      this.state.tokensymbol,
      this.state.decimals,
      this.state.senderaddress,
    );
  }

  static contextTypes = {
    intl: intlShape.isRequired,
  };

  onClickClearSend() {
    this.setState({
      payto: '',
      amount: 0,
      description: '',
      gaslimit: 2500000,
      gasprice: this.defaultPrice.toFixed(8),
    })
  }

  onClickClearAddToken() {
    this.setState({
      contractaddress: '',
      tokenname: '',
      tokensymbol: '',
      decimals: '',
      senderaddress: ''
    })
  }

  precise(event) {
    event.target.value = Number(event.target.value).toFixed(8);
  }

  render() {
    const {
      selectTab, 
      payto,
      amount,
      description,
      gaslimit,
      gasprice,
      receiveaddress,
      contractaddress,
      tokenname,
      tokensymbol,
      decimals,
      senderaddress
      } = this.state;
    
    const { intl } = this.context;
    
    const {
      openDialogAction, 
      isDialogOpen,
      error
    } = this.props;

    const buttonClasses = classnames([
      'primary',
      //styles.button
    ]);

    const headerLabels = [{
      Header: 'Data',
      width: 150,
      accessor: 'lt_data'
    }, {
      Header: 'Type',
      width: 100,
      accessor: 'lt_type',
    }, {
      Header: 'Label',
      width: 200,
      accessor: 'lt_label'
    }, {
      Header: 'Name',
      accessor: 'lt_name'
    }, {
      Header: 'Amount',
      width: 150,
      accessor: 'lt_amount'
    }]

    return (
      <div className={styles.component}>
        <div className={styles.categoryTitle}>
          LSR Token
        </div>
        <div className={styles.tokenContrainer}>
          <div className={styles.tokenPage}/>
          <div>
            <button 
              className={classnames([
                styles.navButton, 
                selectTab == 'send' ? styles.active : styles.normal
              ])} 
              onClick={() => this.setState({selectTab: 'send'})}
            > 
              Send
            </button>
            <button 
              className={classnames([
                styles.navButton, 
                selectTab == 'receive' ? styles.active : styles.normal
              ])} 
              onClick={() => this.setState({selectTab: 'receive'})}> 
                Receive 
            </button>
            <button 
              className={classnames([
                styles.navButton, 
                selectTab == 'addtoken' ? styles.active : styles.normal
              ])} 
              onClick={() => this.setState({selectTab: 'addtoken'})}> 
                AddToken 
            </button>
          </div>  
        </div>
        <div className={styles.inputRegion}>
        {selectTab == 'send' ? (
          <div className={styles.inputContainer}> 
            <div>
              <div className={styles.sendInputLabel}> PayTo </div>
              <div className={styles.sendInputPos}>
                <input value={payto} type="text" onChange={event => this.setState({payto: event.target.value})}/>
              </div>
            </div>
            <div>
              <div className={styles.sendInputLabel}> Amount </div>
              <div className={styles.sendInputPos}>
                <input value={amount} type="number" min="0.0001" max="1000000" step="0.0001" onChange={event => this.setState({amount: event.target.value.replace(/\D/,'')})}/>
              </div>
            </div>
            <div>
              <div className={styles.sendInputLabel}> Description</div>
              <div className={styles.sendInputPos}>
                <input value={description} type="text" onChange={event => this.setState({description: event.target.value})}/>
              </div>
            </div>
            <div>
              <div className={styles.sendInputLabel}> GasLimit </div>
              <div className={styles.sendInputPos}>
                <input value={gaslimit} type="number" min="1000000" max="1000000000" onChange={event => this.setState({gaslimit: event.target.value.replace(/\D/,'')})}/>
              </div>
            </div>
            <div> 
              <div className={styles.sendInputLabel}> GasPrice </div>
              <div className={styles.gasPriceInputPos}>
                <input value={gasprice} type="number" min="0.00000001" max="0.00001" step="0.00000001" onChange={event => this.setState({gasprice: event.target.value})} onInput={this.precise.bind(this)}/>
              </div>
              <span className={styles.luxFont}> LUX </span>
            </div>
            <div className={styles.buttonContainer}>
              <Button
                className={buttonClasses}
                label="Confirm"
                skin={<SimpleButtonSkin/>}
              />
              <Button
                className={buttonClasses}
                label="Clear"
                skin={<SimpleButtonSkin/>}
                onClick={this.onClickClearSend.bind(this)}
              />
            </div>
          </div>
          ) : (null)
        }
        {selectTab == 'receive' ? (
          <div className={styles.receiveContainer}> 
            <div>
              <input value={receiveaddress} className={styles.inputCopyAddress} type="text" onChange={event => this.setState({receiveaddress: event.target.value})}/>
            </div>
            <Button
              className={buttonClasses}
              label="Copy Address"
              skin={<SimpleButtonSkin/>}
            />
          </div>
          ) : (null)
        }
        {selectTab == 'addtoken' ? (
          <div className={styles.inputContainer}> 
            <div>
              <div className={styles.addTokenInputLabel}> Contract Address </div>
              <div className={styles.tokenInputPos}>
                <input value={contractaddress} type="text" onChange={event => this.setState({contractaddress: event.target.value})}/>
              </div>
            </div>
            <div>
              <div className={styles.addTokenInputLabel}> Token Name </div>
              <div className={styles.tokenInputPos}>
                <input value={tokenname} type="text" onChange={event => this.setState({tokenname: event.target.value})}/>
              </div>
            </div>
            <div>
              <div className={styles.addTokenInputLabel}> Token Symbol</div>
              <div className={styles.tokenInputPos}>
                <input value={tokensymbol} type="text" onChange={event => this.setState({tokensymbol: event.target.value})}/>
              </div>
            </div>
            <div>
              <div className={styles.addTokenInputLabel}> Decimals </div>
              <div className={styles.tokenInputPos}>
                <input value={decimals} type="text" onChange={event => this.setState({decimals: event.target.value})}/>
              </div>
            </div>
            <div> 
              <div className={styles.addTokenInputLabel}> Sender Address </div>
              <div className={styles.tokenInputPos}>
                <input value={senderaddress} type="text" onChange={event => this.setState({senderaddress: event.target.value})}/>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <Button
                className={buttonClasses}
                label="Confirm"
                skin={<SimpleButtonSkin/>}
              />
              <Button
                className={buttonClasses}
                label="Clear"
                skin={<SimpleButtonSkin/>}
                onClick={this.onClickClearAddToken.bind(this)}
              />
            </div>
          </div>
          ) : (null)
        }
        </div>
        <div className={styles.tokenTable}>
          <ReactTable
              columns={headerLabels}
              sortable={false}
              defaultPageSize={10}
              className="-striped -highlight"
          />
        </div>
      </div>
    );
  }
}
