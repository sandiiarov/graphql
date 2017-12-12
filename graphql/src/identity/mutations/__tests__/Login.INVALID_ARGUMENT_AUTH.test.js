// @flow

import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import config from '../../../../config/application';

RestApiMock.onPost(config.restApiEndpoint.login).replyWithData({
  error_code: 'INVALID_ARGUMENT_AUTH',
  message: 'No authentication credentials.',
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
