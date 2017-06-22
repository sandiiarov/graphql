// @flow

import { graphql, RestApiMock } from '../../services/TestingTools';
import config from '../../../config/application';
import AllLocations from '../AllLocations';
import { Location } from '../../datasets';

RestApiMock.onGet(
  config.restApiEndpoint.allLocations({ term: 'PRG' }),
).replyWithData(Location.prague);

describe('all locations query', () => {
  it('should be list of location types', () => {
    expect(AllLocations.type.toString()).toBe('LocationConnection');
  });

  it('should return locations', async () => {
    const query = `{
      allLocations(search: "PRG", first: 1) {
        edges {
          node {
            locationId
            name
            slug
            timezone
            location {
              lat
              lng
            }
            type
            city {
              locationId
            }
            subdivision {
              locationId
              name
              slug
            }
            country {
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
