// @flow

import url from 'url';
import fetch from 'node-fetch';
import Logger from '../services/Logger';
import { ProxiedError } from './errors/ProxiedError';

export default function request(
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

async function fetchJson(
  url: string,
  method: string = 'GET',
  options?: Object = {},
): Promise<Object> {
  if (process.env.NODE_ENV === 'test') {
    throw new Error(
      `HttpRequest should never be called in test environment. Have you forgotten to mock "${url}" with fake data response?`,
    );
  }
  if (typeof url !== 'string') {
    throw new Error(
      `Relative API URL should be typeof 'string', '${typeof url}' given.`,
    );
  }

  const reqOptions = {
    ...options,
    method,
  };

  Logger.info(`${method} ${url}`);
  const response = await fetch(url, reqOptions);

  if (response.status !== 200) {
    throw new ProxiedError(response.statusText, response.status, url);
  }
  return response.json();
}
