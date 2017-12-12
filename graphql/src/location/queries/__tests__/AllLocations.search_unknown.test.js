// @flow

import { graphql, RestApiMock } from '../../../services/TestingTools';
import config from '../../../../config/application';
import { Location } from '../../../datasets/index';

RestApiMock.onGet(
  config.restApiEndpoint.allLocations({ term: 'unknown place' }),
).replyWithData(Location.unknown);

RestApiMock.onGet(
  config.restApiEndpoint.allLocations({ term: 'Prague' }),
).replyWithData(Location.prague);

describe('all locations query', () => {
  it('should return successful searches', async () => {
    const query = `{
      A: allLocations(search: "Prague") {
        edges { node { name } }
      }
      B: allLocations(search: "unknown place") {
        edges { node { name } }
      }
    }`;
    expect(await graphql(query)).toMatchSnapshot();
  });

  it('should return successful searches - changed order', async () => {
    const query = `{
      A: allLocations(search: "unknown place") {
        edges { node { name } }
      }
      B: allLocations(search: "Prague") {
        edges { node { name } }
      }
    }`;
    expect(await graphql(query)).toMatchSnapshot();
  });
});
