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
            slug
            timezone
            location { latitude, longitude }
            type
            city { locationId, name, slug }
            subdivision { locationId, name, slug }
            country { locationId, name, slug }
          }
        }
      }
    }`;
    expect(await graphql(query)).toMatchSnapshot();
  });
});
