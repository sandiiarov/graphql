// @flow

import { graphql, RestApiMock } from '../../../services/TestingTools';
import config from '../../../../config/application';
import AllLocations from '../AllLocations';
import { Location } from '../../../datasets/index';

RestApiMock.onGet(
  config.restApiEndpoint.allLocations({ term: 'Prague' }),
).replyWithData(Location.prague);

describe('all locations query', () => {
  it('should be list of location types', () => {
    expect(AllLocations.type.toString()).toBe('LocationConnection');
  });

  it('should return locations', async () => {
    const query = `{
      allLocations(search: "Prague") {
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
