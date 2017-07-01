// @flow

import DataLoader from 'dataloader';
import { post } from '../services/HttpRequest';
import Config from '../../config/application';
import type { IdentityType } from '../Entities';

export default function createInstance(accessToken: ?string) {
  return new DataLoader((ids: Array<string>) => {
    return batchLoad(accessToken)(ids);
  });
}

function batchLoad(
  accessToken: ?string,
): (Array<string>) => Promise<Array<Object>> {
  if (typeof accessToken !== 'string') {
    return () => Promise.reject(new Error('Undefined access token'));
  }
  const token = accessToken; // otherwise Flow screams fetch could be called with undefined token
  return ids => Promise.all(ids.map(userId => fetch(userId, token)));
}

async function fetch(
  userId: string,
  accessToken: string,
): Promise<IdentityType> {
  const payload = {
    user: userId,
  };
  const token = new Buffer(`${Config.auth.digest}:${accessToken}`).toString(
    'base64',
  );
  const headers = {
    Authorization: `Basic: ${token}`,
  };

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
