// @flow

import { graphql, RestApiMock } from '../../services/TestingTools';
import Login from '../Login';
import config from '../../../config/application';
import userMockData
  from '../../dataLoaders/__tests__/__datasets__/user.get.json';

beforeEach(() => {
  RestApiMock.onPost(config.restApiEndpoint.login).replyWithData({
    user_id: 21,
    token: 't0k3n',
  });

  RestApiMock.onPost(config.restApiEndpoint.identity).replyWithData(
    userMockData,
  );
});

describe('login query', () => {
  it('should be of Login type', () => {
    expect(Login.type.toString()).toBe('User');
  });

  it('should return valid fields', async () => {
    const loginQuery = `
      mutation {
        login(email:"a@b.c", password:"pass") {
          token, isLoggedIn
          identity {
            databaseId
          }
        }
      }
    `;
    expect(await graphql(loginQuery)).toMatchSnapshot();
  });
});
