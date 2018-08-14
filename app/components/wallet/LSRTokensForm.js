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
  gasLimit: number,
  gasprice: number,
  receiveaddress: string,
  contractaddress: string,
  tokenname: string,
  tokensymbol: string,
  decimals: string,
  senderaddress: string,
  saveTokens: Function
};

type State = {
  payto: string,
  amount: number,
  description: string,
  gasLimit: number,
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
    gasLimit: this.props.gaslimit,
    gasPrice: this.props.gasprice,
    senderAddress: this.props.senderaddress,
    selectTab: 'send'
  };

  
  componentDidMount() {
  }

  componentWillUnmount() {
  //  this.props.saveContract(this.state.bytecode, this.state.abi, this.state.gasLimit, Number(this.state.gasPrice), this.state.senderAddress);
  }

  static contextTypes = {
    intl: intlShape.isRequired,
  };

  onClickClearAll() {
    this.setState({
      bytecode: '',
      abi: '',
      arrInputs:[],
      gasLimit: 2500000,
      gasPrice: this.defaultPrice.toFixed(8),
      senderAddress: ''
    })
  }

  precise(event) {
    event.target.value = Number(event.target.value).toFixed(8);
  }

  render() {
    const {
      selectTab, 
      gasLimit,
      gasPrice,
      senderAddress
      } = this.state;
    
    const { intl } = this.context;
    
    const {
      openDialogAction, 
      isDialogOpen,
      createContract,
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
                <input type="text"/>
              </div>
            </div>
            <div>
              <div className={styles.sendInputLabel}> Amount </div>
              <div className={styles.sendInputPos}>
                <input value={gasLimit} type="number" min="1000000" max="1000000000" onChange={event => this.setState({gasLimit: event.target.value.replace(/\D/,'')})}/>
              </div>
            </div>
            <div>
              <div className={styles.sendInputLabel}> Description</div>
              <div className={styles.sendInputPos}>
                <input value={senderAddress} type="text" onChange={event => this.setState({senderAddress: event.target.value})}/>
              </div>
            </div>
            <div>
              <div className={styles.sendInputLabel}> GasLimit </div>
              <div className={styles.sendInputPos}>
                <input value={gasLimit} type="number" min="1000000" max="1000000000" onChange={event => this.setState({gasLimit: event.target.value.replace(/\D/,'')})}/>
              </div>
            </div>
            <div> 
              <div className={styles.sendInputLabel}> GasPrice </div>
              <div className={styles.gasPriceInputPos}>
                <input value={gasPrice} type="number" min="0.00000001" max="0.00001" step="0.00000001" onChange={event => this.setState({gasPrice: event.target.value})} onInput={this.precise.bind(this)}/>
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
              />
            </div>
          </div>
          ) : (null)
        }
        {selectTab == 'receive' ? (
          <div className={styles.receiveContainer}> 
            <div>
              <input className={styles.inputCopyAddress} type="text"/>
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
                <input type="text"/>
              </div>
            </div>
            <div>
              <div className={styles.addTokenInputLabel}> Token Name </div>
              <div className={styles.tokenInputPos}>
                <input type="text"/>
              </div>
            </div>
            <div>
              <div className={styles.addTokenInputLabel}> Token Symbol</div>
              <div className={styles.tokenInputPos}>
                <input type="text"/>
              </div>
            </div>
            <div>
              <div className={styles.addTokenInputLabel}> Decimals </div>
              <div className={styles.tokenInputPos}>
                <input type="text"/>
              </div>
            </div>
            <div> 
              <div className={styles.addTokenInputLabel}> Sender Address </div>
              <div className={styles.tokenInputPos}>
                <input type="text"/>
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
