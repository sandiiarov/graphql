// @flow

import { post } from '../services/HttpRequest';
import Config from '../../config/application';
import type { IdentityType } from '../Entities';

export default function createInstance(
  accessToken?: string,
): Array<string> => Promise<Array<Object>> {
  const token = accessToken; // otherwise Flow screams fetch could be called with undefined token
  if (typeof token !== 'string') {
    throw new Error('Undefined access token');
  }
  return ids => Promise.all(ids.map(userId => fetch(userId, token)));
}

async function fetch(
  userId: string,
  accessToken: string,
): Promise<IdentityType> {
  const payload = {
    user: 'self',
  };
  const token = new Buffer(`${Config.auth.digest}:${accessToken}`).toString(
    'base64',
  );
  const headers = {
    Authorization: `Basic: ${token}`,
  };

  // TODO: create postWithAuth(url, token, payload) in HttpRequest
  const data = await post(Config.restApiEndpoint.identity, payload, headers);
  if (!data.length) {
    throw new Error(`User not found (userId: ${userId})`);
  }

  return sanitizeData(data[0]);
}

function sanitizeData(data: Object): IdentityType {
  const userData = {
    email: data.email,
    emailVerified: data.email_verified,
    firstName: data.first_name,
    lastName: data.last_name,
    login: data.login,
    userId: data.user_id,
  };
  return userData;
}
