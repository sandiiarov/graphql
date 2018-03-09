// @flow

import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import config from '../../../../config/application';
import AllLocations from '../AllLocations';
import PragueDataset from '../../datasets/prague-cs-CZ.json';

RestApiMock.onGet(
  config.restApiEndpoint.allLocations({
    type: 'subentity',
    term: 'prague_cz',
    locale: 'cs-CZ',
    location_types: 'airport',
  }),
).replyWithData(PragueDataset);

describe('allSubLocations query', () => {
  it('should be list of location types', () => {
    expect(AllLocations.type.toString()).toBe('LocationConnection');
  });

  it('should return locations', async () => {
    const query = `{
      allSubLocations(
        id: "prague_cz",
        options: {locationType: airport, locale: cs_CZ},
        first: 2
      ) {
        edges {
          node {
            locationId
            name
            slug
            type
          }
        }
      }
    }`;
    expect(await graphql(query)).toMatchSnapshot();
  });
});
