// @flow

import url from 'url';
import fetch from 'node-fetch';
import Logger from '../services/Logger';

const request = async function request(
  absoluteApiUrl: string,
  token: ?string,
): Promise<Object> {
  if (process.env.NODE_ENV === 'test') {
    throw new Error('HttpRequest should never be called in test environment.');
  }
  if (typeof absoluteApiUrl !== 'string') {
    throw new Error(
      `Relative API URL should be typeof 'string', '${typeof absoluteApiUrl}' given.`,
    );
  }

  const urlObject = url.parse(absoluteApiUrl, true);
  if (token !== null && token !== undefined) {
    if (urlObject.query === undefined) {
      urlObject.query = {};
    }
    urlObject.query.token = token;
  }

  Logger.info(url.format(urlObject));
  const response = await fetch(url.format(urlObject));

  if (response.status !== 200) {
    throw new Error(
      `Proxied error ${response.status}: ${response.statusText} (${url.format(urlObject)})`,
    );
  }
  return response.json();
};

export default request;

export async function post(
  absoluteApiUrl: string,
  payload: Object,
  requestHeaders?: Object = {},
): Promise<Object> {
  if (process.env.NODE_ENV === 'test') {
    throw new Error('HttpRequest should never be called in test environment.');
  }

  const body = JSON.stringify(payload);
  const headers = {
    'Content-Type': requestHeaders['Content-Type'] || 'application/json',
  };
  const response = await fetch(absoluteApiUrl, {
    body,
    headers,
    method: 'POST',
  });

  if (response.status !== 200) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  return response.json();
}
