// @flow

import { RestApiMock } from '../../../services/TestingTools';
import IdentityDataloader from '../Identity';
import config from '../../../../config/application';
import userMockData from './__datasets__/user.get.json';

beforeEach(() => {
  RestApiMock.onPost(config.restApiEndpoint.identity).replyWithData(
    userMockData,
  );
});

describe('Identity dataloader', () => {
  it('should throw error without access token', async () => {
    let message;
    try {
      const identityLoader = new IdentityDataloader();
      await identityLoader.load('some_id');
    } catch (err) {
      message = err.message;
    }
    expect(message).toEqual('Undefined access token');
  });

  it('should load user', async () => {
    let message;
    try {
      const identityLoader = new IdentityDataloader('accessToken');
      const identity = await identityLoader.load('test_user');
      expect(identity).toMatchSnapshot();
    } catch (err) {
      message = err.message;
    }
    expect(message).toBeUndefined();
  });
});
