// @flow

import { graphql, RestApiMock } from '../../services/TestingTools';
import config from '../../../config/application';
import { Location } from '../../datasets';

// this mock returns data for Prague just to make it more simple since the
// true 'dump' dataset has the same structure
RestApiMock.onGet(
  config.restApiEndpoint.allLocations({ type: 'dump' }),
).replyWithData(Location.prague);
RestApiMock.onGet(
  config.restApiEndpoint.allLocations({ type: 'dump', locale: 'cs-CZ' }),
).replyWithData(Location.prague);

describe('all locations query without search/radius/area parameter', () => {
  it('should return all locations', async () => {
    const query = `{
      allLocations {
        edges {
          node {
            locationId
            name
          }
        }
      }
    }`;
    expect(await graphql(query)).toMatchSnapshot();
  });

  it('should return only first location', async () => {
    const query = `{
      allLocations(first: 1, options: {
        locale: cs_CZ,
      }) {
        edges {
          node {
            locationId
            name
          }
        }
      }
    }`;
    expect(await graphql(query)).toMatchSnapshot();
  });
});
