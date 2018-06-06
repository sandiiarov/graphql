// @flow

import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import ResetPassword from '../ResetPassword';

beforeEach(() => {
  RestApiMock.onPost(
    'https://auth.skypicker.com/v1/user.resetPassword',
  ).replyWithData({
    success: true,
  });
});

describe('resetPassword query', () => {
  it('should be of ResetPasswordResponse type', () => {
    expect(ResetPassword.type.toString()).toBe('ResetPasswordResponse');
  });

  it('should return valid fields', async () => {
    const resetPasswordQuery = `
      mutation {
        resetPassword(email:"testing@bla.com") {
          success
        }
      }
    `;
    expect(await graphql(resetPasswordQuery)).toMatchSnapshot();
  });
});
