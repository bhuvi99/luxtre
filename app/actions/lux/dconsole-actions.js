// @flow
import Action from '../lib/Action';

// ======= CONTRACT ACTIONS =======

export default class ConsoleActions {
  debugConsole: Action<{   
    command: string, 
    param: string
  }> = new Action();
}
