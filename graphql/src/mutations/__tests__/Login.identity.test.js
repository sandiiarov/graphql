// @flow

import { executeQuery } from '../../services/TestingTools';

jest.mock('../../services/HttpRequest');

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
    expect(await executeQuery(loginQuery)).toMatchSnapshot();
  });
});
