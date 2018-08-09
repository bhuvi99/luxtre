// @flow
import React, { Component } from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react';
import LocalizableError from '../../i18n/LocalizableError';
import { defineMessages, intlShape, FormattedHTMLMessage } from 'react-intl';
import Button from 'react-polymorph/lib/components/Button';
import SimpleButtonSkin from 'react-polymorph/lib/skins/simple/raw/ButtonSkin';
import TextArea from 'react-polymorph/lib/components/TextArea';
import TextAreaSkin from 'react-polymorph/lib/skins/simple/TextAreaSkin';
import Input from 'react-polymorph/lib/components/Input';
import SimpleInputSkin from 'react-polymorph/lib/skins/simple/raw/InputSkin';
import styles from './LSRTokensForm.scss';
import BorderedBox from '../widgets/BorderedBox';
import ReactTable from "react-table";
import "react-table/react-table.css";

type Props = {
  createContract: Function,
  openDialogAction: Function,
  saveContract: Function,
  bytecode: string,
  abi: string,
  gaslimit: number,
  gasprice: number,
  senderaddress: string,
  isDialogOpen: Function,
  error: ?LocalizableError
};

type State = {
  selectTab: string,
  abi: string,
  arrInputs : Array<Object>,
  gasLimit: number,
  gasPrice: number,
  senderAddress: string
};

@observer
export default class LSRTokensForm extends Component<Props, State> {
  state = {
    bytecode: this.props.bytecode,
    abi: this.props.abi,
    arrInputs:[],
    gasLimit: this.props.gaslimit,
    gasPrice: this.props.gasprice,
    senderAddress: this.props.senderaddress,
    selectTab: 'send'
  };

  _isMounted = false;
  defaultPrice = 0.0000004;
  
  componentDidMount() {
    this._isMounted = true;
    this.onChangeABI(this.props.abi);
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.props.saveContract(this.state.bytecode, this.state.abi, this.state.gasLimit, Number(this.state.gasPrice), this.state.senderAddress);
  }

  static contextTypes = {
    intl: intlShape.isRequired,
  };

  onChangeBytecode(value) {
    if(value != this.state.bytecode)
      this.setState( {bytecode: value});
  }

  onChangeABI(value) {
    this.setState( {abi: value});
    if(value == "") {
      this.setState( {arrInputs: []} );
    } else {
      try {
        let arrABI = JSON.parse(value);
        let element = arrABI.find((data) => { return data.type == "constructor" });
        if(element !== undefined) {
          this.setState( {arrInputs: element.inputs});
        } else {
          this.setState( {arrInputs: []} );
        }
      } catch (error) {
        
      }
    }
  }

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

  async _createContract() {
    try {
      let bytecode = this.state.bytecode;
      for(var i = 0; i < this.state.arrInputs.length; i++)
      {
        var parameter = this.refs['constructor_parameter' + i].value;
        if(parameter == null || parameter == '')
          return;

        var encoded = Web3EthAbi.encodeParameter(this.state.arrInputs[i].type, parameter);
        bytecode += encoded;
      }

      let senderaddress = this.state.senderAddress !== '' ? this.state.senderAddress : null;
      let gasLimit = this.state.gasLimit !== '' ? this.state.gasLimit : 2500000;
      let gasPrice = this.state.gasPrice !== '' ? this.state.gasPrice : this.defaultPrice.toFixed(8);
      const outputs = await this.props.createContract(bytecode, gasLimit, gasPrice, senderaddress);
      if (this._isMounted) {
        this.setState({
          outputs: outputs,
          outputsError: null,
        });
      }
    } catch (error) {
      if (this._isMounted) {
        this.setState({
          outputsError: this.context.intl.formatMessage(error)
        });
      }
    }
  }

  render() {
    const {
      selectTab, 
      abi, 
      arrInputs,
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
              <input type="text"/>
            </div>
            <div>
              <div className={styles.sendInputLabel}> Amount </div>
              <input value={gasLimit} type="number" min="1000000" max="1000000000" onChange={event => this.setState({gasLimit: event.target.value.replace(/\D/,'')})}/>
            </div>
            <div>
              <div className={styles.sendInputLabel}> Description</div>
              <input value={senderAddress} type="text" onChange={event => this.setState({senderAddress: event.target.value})}/>
            </div>
            <div>
              <div className={styles.sendInputLabel}> GasLimit </div>
              <input value={gasLimit} type="number" min="1000000" max="1000000000" onChange={event => this.setState({gasLimit: event.target.value.replace(/\D/,'')})}/>
            </div>
            <div> 
              <div className={styles.sendInputLabel}> GasPrice </div>
              <input value={gasPrice} type="number" min="0.00000001" max="0.00001" step="0.00000001" onChange={event => this.setState({gasPrice: event.target.value})} onInput={this.precise.bind(this)}/>
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
              <input type="text"/>
            </div>
            <div>
              <div className={styles.addTokenInputLabel}> Token Name </div>
              <input type="text"/>
            </div>
            <div>
              <div className={styles.addTokenInputLabel}> Token Symbol</div>
              <input type="text"/>
            </div>
            <div>
              <div className={styles.addTokenInputLabel}> Decimals </div>
              <input type="text"/>
            </div>
            <div> 
              <div className={styles.addTokenInputLabel}> Sender Address </div>
              <input type="text"/>
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
