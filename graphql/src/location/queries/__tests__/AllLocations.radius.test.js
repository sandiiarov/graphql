// @flow

import datasets from '../../../datasets/index';
import { graphql, RestApiMock } from '../../../services/TestingTools';
import config from '../../../../config/application';

RestApiMock.onGet(
  config.restApiEndpoint.allLocations({
    type: 'radius',
    lat: 50,
    lon: 14,
    radius: 50,
  }),
).replyWithData(datasets.Location.prague);

describe('all locations query', () => {
  it('should return locations by radius', async () => {
    const query = `{
      allLocations(radius: {lat: 50, lng: 14, radius: 50}) {
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
