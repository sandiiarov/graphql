// @flow

import { executeQuery } from '../../services/TestingTools';
import Login from '../Login';

jest.mock('../../services/HttpRequest');

describe('single booking query', () => {
  it('should be of Booking type', () => {
    expect(Login.type.toString()).toBe('Login!');
  });

  it('should return valid fields', async () => {
    const loginQuery = `
      mutation {
        login(email:"a@b.c", password:"pass") {
          token, userId
        }
      }
    `;
    expect(await executeQuery(loginQuery)).toMatchSnapshot();
  });
});
