// @flow

import { fetchJson } from '../../common/services/JsonFetcher';

export async function get(absoluteApiUrl: string): Promise<Object> {
  const authToken = process.env.BOOKING_COM_TOKEN;
  const headers = {
    authorization: authToken,
  };
  return fetchJson(absoluteApiUrl, 'GET', { headers });
}
