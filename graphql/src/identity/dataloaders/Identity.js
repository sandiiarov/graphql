// @flow

import DataLoader from 'dataloader';
import { post } from '../../common/services/HttpRequest';
import Config from '../../../config/application';

import type { Identity } from '../User';

export default class IdentityDataloader {
  accessToken: ?string;
  dataLoader: DataLoader<string, Identity>;

  constructor(accessToken: ?string) {
    this.accessToken = accessToken;
    this.dataLoader = new DataLoader((ids: $ReadOnlyArray<string>) => {
      return this.batchLoad(ids);
    });
  }

  /**
   * Load method may be called without parameter. In this case the Identity is
   * resolved from the access token.
   */
  async load(userId: ?string) {
    if (!userId) {
      userId = '';
    }
    return this.dataLoader.load(userId);
  }

  async loadMany(ids: string[]) {
    return this.dataLoader.loadMany(ids);
  }

  async batchLoad(ids: $ReadOnlyArray<string>): Promise<Array<*>> {
    return ids.map(userId => this.fetch(userId));
  }

  async fetch(userId: string): Promise<Identity | Error> {
    if (typeof this.accessToken !== 'string') {
      throw new Error('Undefined access token');
    }

    const payload = {
      user: userId,
    };
    const token = new Buffer(
      `${Config.auth.digest}:${this.accessToken}`,
    ).toString('base64');
    const headers = {
      Authorization: `Basic: ${token}`,
    };

    const data = await post(Config.restApiEndpoint.identity, payload, headers);
    if (!data.length) {
      throw new Error(`User not found (userId: ${userId}).`);
    }

    return this.sanitizeData(data[0]);
  }

  sanitizeData(data: Object): Identity {
    return {
      email: data.email,
      emailVerified: data.email_verified,
      firstName: data.first_name,
      lastName: data.last_name,
      login: data.login,
      userId: data.user_id,
    };
  }
}
