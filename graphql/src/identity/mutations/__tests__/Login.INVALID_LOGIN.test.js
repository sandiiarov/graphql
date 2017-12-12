// @flow

import { graphql, RestApiMock } from '../../../services/TestingTools';
import config from '../../../../config/application';

RestApiMock.onPost(config.restApiEndpoint.login).replyWithData({
  error_code: 'INVALID_LOGIN',
  message: 'Login failed.',
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
