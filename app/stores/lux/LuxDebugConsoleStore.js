// @flow
import { observable, computed, action, runInAction } from 'mobx';
import Store from '../lib/Store';
import Request from '../lib/LocalizedRequest';
import { ROUTES } from '../../routes-config';

export default class LuxDebugConsoleStore extends Store {

  // REQUESTS
  @observable debugConsoleRequest: Request<DebugConsoleResponse> = new Request(this.api.lux.sendToConsoleCommand);

  @observable consoleHistory: Array<any> = [];
  @observable commandHistory: Array<any> = [];

  consoleCommand: string = ''; 

  setup() {
    super.setup();
    const { router, lux } = this.actions;
    const { dconsole } = lux;
    dconsole.debugConsole.listen(this._debugConsole);
    //router.goToRoute.listen(this._onRouteChange);
  }

  _debugConsole = async ( params: {command: string, param:string }) => {
    this.consoleCommand = params.command + ' ' + params.param;
    const response = await this.debugConsoleRequest.execute(params).promise;

    if(response != null)
      this.saveConsoleHistory(response);
  };


  @action saveConsoleHistory = (result: any) => {
    this.commandHistory.push(this.consoleCommand);
    if(typeof result === 'object') {
      var jsonResult = JSON.stringify(result, null, '&emsp;');
      this.consoleHistory.push(jsonResult.split(/\n/g));
    } else {
      if(typeof result !== 'string')
      {
        result = result.toString();
      }  
      this.consoleHistory.push(result.split(/\n/g));
    }
  };
}
