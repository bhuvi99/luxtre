// @flow
import { request } from './lib/request';
import { LUX_API_HOST, LUX_API_PORT, LUX_API_USER, LUX_API_PWD } from './index';
import { Logger } from '../../utils/logging';

export type BackupLuxWalletParams = {
  filePath: string
};

export const backupLuxWallet = (
  { filePath }: BackupLuxWalletParams
): Promise<void> => (
  request({
    hostname: LUX_API_HOST,
    method: 'POST',
    port: LUX_API_PORT,
    auth: LUX_API_USER + ':' + LUX_API_PWD
  }, {
    jsonrpc: '2.0',
    method: 'backupwallet',
    params: [filePath]
  })
);
