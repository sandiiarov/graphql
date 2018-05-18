// @flow

import PragueDataset from '../../datasets/prague.json';
import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import config from '../../../../config/application';

RestApiMock.onGet(
  config.restApiEndpoint.allLocations({
    type: 'slug',
    term: 'prague-czech-republic',
    locale: 'en-US',
  }),
).replyWithData(PragueDataset);

RestApiMock.onGet(
  config.restApiEndpoint.allLocations({
    type: 'radius',
    lat: 50.075538,
    lon: 14.4378,
    radius: 160,
    locale: 'en-US',
  }),
).replyWithData(PragueDataset);

describe('all locations query', () => {
  it('should return locations by location name slugRadius', async () => {
    const query = `{
      allLocations(slugRadius: "prague-czech-republic-160km") {
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

  it('should return locations by gps slugRadius', async () => {
    const query = `{
      allLocations(slugRadius: "50.075538-14.4378-160km") {
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
