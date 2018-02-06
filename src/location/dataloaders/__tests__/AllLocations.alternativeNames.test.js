// @flow

import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import config from '../../../../config/application';
import Locations from './__datasets__/locations-alternativeNames.json';

RestApiMock.onGet(
  config.restApiEndpoint.allLocations({ term: 'America' }),
).replyWithData(Locations);

describe('all locations query', () => {
  it('should support alternativeNames', async () => {
    const query = `{
      allLocations(search: "America") {
        edges {
          node {
            locationId
            name
            isActive
            alternativeNames
            airportsCount
            stationsCount
          }
        }
      }
    }`;
    expect(await graphql(query)).toMatchSnapshot();
  });
});
