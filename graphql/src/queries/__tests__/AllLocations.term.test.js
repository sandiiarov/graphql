// @flow

import { graphql } from '../../services/TestingTools';
import AllLocations from '../AllLocations';

describe('all locations query', () => {
  it('should be list of location types', () => {
    expect(AllLocations.type.toString()).toBe('[Location]');
  });

  it('should return locations', async () => {
    const query = `{
      allLocations(term: "Prague") {
        locationId
        name
        code
        slug
        timezone
        location { latitude, longitude }
        type
        city { locationId, name, slug, code }
        subdivision { locationId, name, slug, code }
        country { locationId, name, slug, code }
      }
    }`;
    expect(await graphql(query)).toMatchSnapshot();
  });
});
