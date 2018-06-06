// @flow

import { graphql, RestApiMock } from '../../../common/services/TestingTools';

describe('resetPassword query', () => {
  const loginQuery = `
    mutation {
      resetPassword(email:"a@b.c") {
        success
      }
    }
  `;

  const restApiEndpoint = 'https://auth.skypicker.com/v1/user.resetPassword';

  it('INVALID_ARGUMENT_AUTH fail should handle backend gracefully', async () => {
    RestApiMock.onPost(restApiEndpoint).replyWithData({
      error_code: 'INVALID_ARGUMENT_AUTH',
      message: 'No authentication credentials.',
    });

    expect(await graphql(loginQuery)).toMatchSnapshot();
  });

  it('INVALID_ARGUMENT_LOGIN fail should handle backend gracefully', async () => {
    RestApiMock.onPost(restApiEndpoint).replyWithData({
      error_code: 'INVALID_ARGUMENT_LOGIN',
      message: 'Invalid email address provided.',
      userId: undefined,
    });

    expect(await graphql(loginQuery)).toMatchSnapshot();
  });

  it('INVALID_LOGIN fail should handle backend gracefully', async () => {
    RestApiMock.onPost(restApiEndpoint).replyWithData({
      error_code: 'INVALID_LOGIN',
      message: 'Login failed.',
    });

    expect(await graphql(loginQuery)).toMatchSnapshot();
  });

  it('INVALID_METHOD fail should handle backend gracefully', async () => {
    RestApiMock.onPost(restApiEndpoint).replyWithData({
      error_code: 'INVALID_METHOD',
    });

    expect(await graphql(loginQuery)).toMatchSnapshot();
  });
});
