// @flow

import { executeQuery } from '../../services/TestingTools';
import Login from '../Login';

jest.mock('../../services/HttpRequest');

describe('login query', () => {
  it('should be of Login type', () => {
    expect(Login.type.toString()).toBe('User');
  });

  it('should return valid fields', async () => {
    const loginQuery = `
      mutation {
        login(email:"a@b.c", password:"pass") {
          token, isLoggedIn
        }
      }
    `;
    expect(await executeQuery(loginQuery)).toMatchSnapshot();
  });
});
