// @flow

import { graphql, RestApiMock } from '../../../services/TestingTools';
import config from '../../../../config/application';

RestApiMock.onPost(config.restApiEndpoint.login).replyWithData({
  error_code: 'INVALID_ARGUMENT_LOGIN',
  message: 'Invalid email address provided.',
  userId: undefined,
});

it('login query should handle backend fails gracefully', async () => {
  const loginQuery = `
    mutation {
      login(email:"a@b.c", password:"pass") {
        token
      }
    }
  `;
  expect(await graphql(loginQuery)).toMatchSnapshot();
});
