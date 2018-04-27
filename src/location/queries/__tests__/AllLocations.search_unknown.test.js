// @flow

import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import config from '../../../../config/application';
import PragueDataset from '../../datasets/prague.json';
import UnknownLocationDataset from '../../datasets/unknown.json';

RestApiMock.onGet(
  config.restApiEndpoint.allLocations({
    term: 'unknown place',
    locale: 'en-US',
  }),
).replyWithData(UnknownLocationDataset);

RestApiMock.onGet(
  config.restApiEndpoint.allLocations({ term: 'Prague', locale: 'en-US' }),
).replyWithData(PragueDataset);

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
