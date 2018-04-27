// @flow

import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import config from '../../../../config/application';
import PragueDataset from '../../datasets/prague.json';

// this mock returns data for Prague just to make it more simple since the
// true 'dump' dataset has the same structure
RestApiMock.onGet(
  config.restApiEndpoint.allLocations({
    type: 'dump',
    limit: 9999,
    locale: 'en-US',
  }),
).replyWithData(PragueDataset);
RestApiMock.onGet(
  config.restApiEndpoint.allLocations({
    type: 'dump',
    limit: 9999,
    locale: 'cs-CZ',
  }),
).replyWithData(PragueDataset);

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
