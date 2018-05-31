// @flow

import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import config from '../../../../config/application';

describe('login query', () => {
  const loginQuery = `
    mutation {
      login(email:"a@b.c", password:"pass") {
        token
      }
    }
  `;

  it('INVALID_ARGUMENT_AUTH fail should handle backend gracefully', async () => {
    RestApiMock.onPost(config.restApiEndpoint.login).replyWithData({
      error_code: 'INVALID_ARGUMENT_AUTH',
      message: 'No authentication credentials.',
    });

    expect(await graphql(loginQuery)).toMatchSnapshot();
  });

  it('INVALID_ARGUMENT_LOGIN fail should handle backend gracefully', async () => {
    RestApiMock.onPost(config.restApiEndpoint.login).replyWithData({
      error_code: 'INVALID_ARGUMENT_LOGIN',
      message: 'Invalid email address provided.',
      userId: undefined,
    });

    expect(await graphql(loginQuery)).toMatchSnapshot();
  });

  it('INVALID_LOGIN fail should handle backend gracefully', async () => {
    RestApiMock.onPost(config.restApiEndpoint.login).replyWithData({
      error_code: 'INVALID_LOGIN',
      message: 'Login failed.',
    });

    expect(await graphql(loginQuery)).toMatchSnapshot();
  });

  it('INVALID_METHOD fail should handle backend gracefully', async () => {
    RestApiMock.onPost(config.restApiEndpoint.login).replyWithData({
      error_code: 'INVALID_METHOD',
    });

    expect(await graphql(loginQuery)).toMatchSnapshot();
  });
});
