// @flow
import { request } from './lib/request';
import { LUXGATE_API_HOST, LUXGATE_API_PORT } from './index';

export type GetLuxgateOpenOrdersParams = {
  password: string
};

export const getLuxgateOrders = ({ password }: GetLuxgateOpenOrdersParams): Promise<string> =>
  request(
    {
      hostname: LUXGATE_API_HOST,
      method: 'POST',
      port: LUXGATE_API_PORT
    },
    {
      method: 'myprices',
      password
    }
  );
