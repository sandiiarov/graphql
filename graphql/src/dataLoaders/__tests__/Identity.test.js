// @flow

import createInstance from '../Identity';

jest.mock('../../services/HttpRequest');

describe('Identity dataloader', () => {
  it('should throw error without access token', async () => {
    let message;
    try {
      const identityLoader = createInstance();
      await identityLoader.load('some_id');
    } catch (err) {
      message = err.message;
    }
    expect(message).toEqual('Undefined access token');
  });

  it('should load user', async () => {
    let message;
    try {
      const identityLoader = createInstance('accessToken');
      const identity = await identityLoader.load('test_user');
      expect(identity).toMatchSnapshot();
    } catch (err) {
      message = err.message;
    }
    expect(message).toBeUndefined();
  });
});
