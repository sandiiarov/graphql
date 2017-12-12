// @flow

import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import config from '../../../../config/application';
import AllLocations from '../../queries/AllLocations';
import PragueDataset from '../../datasets/prague-cs-CZ.json';

RestApiMock.onGet(
  config.restApiEndpoint.allLocations({ term: 'Praha', locale: 'cs-CZ' }),
).replyWithData(PragueDataset);

describe('all locations query', () => {
  it('should be list of location types', () => {
    expect(AllLocations.type.toString()).toBe('LocationConnection');
  });

  it('should return locations', async () => {
    const query = `{
      allLocations(search: "Praha", first: 1, options: {locale: cs_CZ}) {
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
