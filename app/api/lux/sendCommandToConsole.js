// @flow
import BigNumber from 'bignumber.js';
import { request } from './lib/request';
import { LUX_API_HOST, LUX_API_PORT, LUX_API_USER, LUX_API_PWD } from './index';

export type SendCommandToConsoleParams = {
  command: string,
  param: string
};

export const sendCommandToConsole = async (
  { command, param }: SendCommandToConsoleParams
): Promise<any> =>  {
  var response;
  if(param != '') {
    response = await request(
      {
        hostname: LUX_API_HOST,
        method: 'POST',
        port: LUX_API_PORT,
        auth: LUX_API_USER + ':' + LUX_API_PWD
      },
      {
        jsonrpc: '2.0',
        method: command,
        params: param
      }
    );
  } else {
    response = await request(
      {
        hostname: LUX_API_HOST,
        method: 'POST',
        port: LUX_API_PORT,
        auth: LUX_API_USER + ':' + LUX_API_PWD
      },
      {
        jsonrpc: '2.0',
        method: command,
      }
    );
  }

  return response;
};



  
