// @flow

import { URL } from 'url';
import { fetchJson } from './JsonFetcher';

export async function get(
  absoluteApiUrl: string,
  token: ?string,
  requestHeaders?: Object = {},
): Promise<Object> {
  const urlObject = new URL(absoluteApiUrl);

  if (token !== null && token !== undefined) {
    urlObject.searchParams.append('token', token);
  }
  const headers = {
    'User-Agent': 'graphql',
    'Content-Type': 'application/json',
    ...requestHeaders,
  };

  return fetchJson(urlObject.toString(), 'GET', { headers });
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
