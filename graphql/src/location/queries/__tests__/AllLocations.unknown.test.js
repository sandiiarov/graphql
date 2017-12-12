// @flow

import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import config from '../../../../config/application';
import UnknownLocationDataset from '../../datasets/unknown.json';

RestApiMock.onGet(
  config.restApiEndpoint.allLocations({ term: 'unknown place' }),
).replyWithData(UnknownLocationDataset);

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
