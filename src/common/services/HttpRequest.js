// @flow

import url from 'url';
import { fetchJson } from './JsonFetcher';

export async function get(
  absoluteApiUrl: string,
  token: ?string,
  requestHeaders?: Object = {},
): Promise<Object> {
  const urlObject = url.parse(absoluteApiUrl, true);
  if (token !== null && token !== undefined) {
    if (urlObject.query === undefined) {
      urlObject.query = {};
    }
    urlObject.query.token = token;
  }
  const headers = {
    'User-Agent': 'graphql',
    'Content-Type': 'application/json',
    ...requestHeaders,
  };

  return fetchJson(url.format(urlObject), 'GET', { headers });
}

export async function post(
  absoluteApiUrl: string,
  payload: Object,
  requestHeaders?: Object = {},
): Promise<Object> {
  const body = JSON.stringify(payload);
  const headers = {
    'Content-Type': 'application/json',
    'User-Agent': 'graphql',
    ...requestHeaders,
  };

  return fetchJson(absoluteApiUrl, 'POST', { body, headers });
}
