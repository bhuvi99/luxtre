// @flow
import { request } from './lib/request';
import { LUXGATE_API_HOST, LUXGATE_API_PORT } from './index';

export type GetLuxgateOrdersParams = {
  userpass: string,
  base: string,
  rel: string,
};

export const getLuxgateOrders = (
  { userpass, base, rel }: GetLuxgateOrdersParams
): Promise<string> => (
  request({
    hostname: LUXGATE_API_HOST,
    method: 'POST',
    port: LUXGATE_API_PORT,
  }, {
    method: 'orderbook',
    userpass: userpass,
    base: base,
    rel: rel,
  })
);
