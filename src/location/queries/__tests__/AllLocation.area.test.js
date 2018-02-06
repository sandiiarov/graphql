// @flow

import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import config from '../../../../config/application';
import PragueDataset from '../../datasets/prague.json';

RestApiMock.onGet(
  config.restApiEndpoint.allLocations({
    type: 'box',
    high_lat: 50.2,
    low_lon: 14,
    low_lat: 49.5,
    high_lon: 14.5,
  }),
).replyWithData(PragueDataset);

describe('all locations query', () => {
  it('should return locations by area', async () => {
    const query = `{
      allLocations(area: {
          topLeft: {lat: 50.2, lng: 14},
          bottomRight: {lat: 49.5, lng: 14.5}
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

  it('should return error for reversed latitude', async () => {
    const query = `{
      allLocations(area: {
          topLeft: {lat: 50.2, lng: 14},
          bottomRight: {lat: 51, lng: 14.5}
        }) { edges { node { locationId } } }
    }`;
    expect(await graphql(query)).toMatchSnapshot();
  });

  it('should return error for reversed longitude', async () => {
    const query = `{
      allLocations(area: {
          topLeft: {lat: 50.2, lng: 14},
          bottomRight: {lat: 49.5, lng: 13}
        }) { edges { node { locationId } } }
    }`;
    expect(await graphql(query)).toMatchSnapshot();
  });
});
