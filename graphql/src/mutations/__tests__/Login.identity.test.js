// @flow

import { graphql, RestApiMock } from '../../services/TestingTools';
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
  it('should return valid identity', async () => {
    const loginQuery = `
      mutation {
        login(email:"a@b.c", password:"pass") {
          identity {
            id
            databaseId
            email
            emailVerified
            firstName
            lastName
            login
          }
        }
      }
    `;
    expect(await graphql(loginQuery)).toMatchSnapshot();
  });
});
