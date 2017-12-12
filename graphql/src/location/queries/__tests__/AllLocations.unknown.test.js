// @flow

import { graphql, RestApiMock } from '../../../services/TestingTools';
import config from '../../../../config/application';
import { Location } from '../../../datasets/index';

RestApiMock.onGet(
  config.restApiEndpoint.allLocations({ term: 'unknown place' }),
).replyWithData(Location.unknown);

describe('all locations query', () => {
  it('should return null edges', async () => {
    const query = `{
      allLocations(search: "unknown place") {
        edges {
          node {
            locationId
          }
        }
      }
    }`;
    expect(await graphql(query)).toMatchSnapshot();
  });
});
