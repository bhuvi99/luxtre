// @flow
import { observable, computed, action, runInAction } from 'mobx';
import Store from '../lib/Store';
import Request from '../lib/LocalizedRequest';
import { ROUTES } from '../../routes-config';

export default class LuxDebugConsoleStore extends Store {

  // REQUESTS
  @observable debugConsoleRequest: Request<DebugConsoleResponse> = new Request(this.api.lux.sendToConsoleCommand);

  @observable consoleHistory: Array<any> = [];

  setup() {
    super.setup();
    const { router, lux } = this.actions;
    const { dconsole } = lux;
    dconsole.debugConsole.listen(this._debugConsole);
    //router.goToRoute.listen(this._onRouteChange);
  }

  _debugConsole = async ( params: {command: string, param:string }) => {
    const response = await this.debugConsoleRequest.execute(params).promise;
    if(response != null)
      this.saveConsoleHistory(response);

  };


  @action saveConsoleHistory = (result: any) => {
    this.consoleHistory.push(result.split(/\n/));
  };



}
