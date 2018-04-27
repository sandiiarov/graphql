// @flow

import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import config from '../../../../config/application';
import Locations from './__datasets__/locations-autonomousTerritory.json';

RestApiMock.onGet(
  config.restApiEndpoint.allLocations({ term: 'America', locale: 'en-US' }),
).replyWithData(Locations);

describe('all locations query', () => {
  it('should support autonomousTerritory', async () => {
    const query = `{
      allLocations(search: "America") {
        edges {
          node {
            locationId
            name
            autonomousTerritory {
              locationId
              name
              slug
            }
          }
        }
      }
    }`;
    expect(await graphql(query)).toMatchSnapshot();
  });
});
