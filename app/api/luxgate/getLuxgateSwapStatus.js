// @flow
import { request } from './lib/request';
import { LUXGATE_API_HOST, LUXGATE_API_PORT } from './index';

export type GetLuxgateSwapStatusParams = {
  password: string,
  requestid?: string,
  quoteid?: string
};

export const getLuxgateSwapStatus = ({
  password,
  requestid,
  quoteid
}: GetLuxgateSwapStatusParams): Promise<string> => {
  const payload = requestid
    ? {
      method: 'swapstatus',
      password,
      requestid,
      quoteid,
      pending: 1,
      fast: 1
    }
    : {
      method: 'swapstatus',
      password,
      pending: 1,
      fast: 1
    };

  return request(
    {
      hostname: LUXGATE_API_HOST,
      method: 'POST',
      port: LUXGATE_API_PORT
    },
    payload
  );
};
