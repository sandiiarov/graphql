// @flow

import { graphql } from '../../services/TestingTools';
import AllLocations from '../AllLocations';

describe('all locations query', () => {
  it('should be list of location types', () => {
    expect(AllLocations.type.toString()).toBe('LocationConnection');
  });

  it('should return locations', async () => {
    const query = `{
      allLocations(term: "Prague") {
        edges {
          node {
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
        }
      }
    }`;
    expect(await graphql(query)).toMatchSnapshot();
  });
});
