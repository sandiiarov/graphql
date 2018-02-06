// @flow

import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import config from '../../../../config/application';
import CurrentUserDataset from '../../datasets/currentUser.json';
import CurrentUser from '../CurrentUser';

beforeEach(() => {
  RestApiMock.onPost(config.restApiEndpoint.identity).replyWithData(
    CurrentUserDataset,
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
