// @flow

import { graphql, RestApiMock } from '../../../services/TestingTools';
import config from '../../../../config/application';
import { Identity as IdentityDataset } from '../../../datasets/index';
import CurrentUser from '../CurrentUser';

beforeEach(() => {
  RestApiMock.onPost(config.restApiEndpoint.identity).replyWithData(
    IdentityDataset.currentUser,
  );
});

describe('current user query', () => {
  it('should be of Identity type', () => {
    expect(CurrentUser.type.toString()).toBe('Identity');
  });

  it('should return valid fields', async () => {
    const query = `{
      currentUser {
        id
        lastName
        firstName
        fullName
        email
        emailVerified
        login
      }
    }`;
    expect(await graphql(query)).toMatchSnapshot();
  });
});
