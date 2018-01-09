// @flow

import url from 'url';
import { fetchJson } from './JsonFetcher';

export async function get(
  absoluteApiUrl: string,
  token: ?string,
): Promise<Object> {
  const urlObject = url.parse(absoluteApiUrl, true);
  if (token !== null && token !== undefined) {
    if (urlObject.query === undefined) {
      urlObject.query = {};
    }
    urlObject.query.token = token;
  }

  return fetchJson(url.format(urlObject));
}

export async function post(
  absoluteApiUrl: string,
  payload: Object,
  requestHeaders?: Object = {},
): Promise<Object> {
  const body = JSON.stringify(payload);
  const headers = {
    'Content-Type': 'application/json',
    ...requestHeaders,
  };

  return fetchJson(absoluteApiUrl, 'POST', { body, headers });
}
