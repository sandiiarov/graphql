// @flow

import { graphql } from '../../services/TestingTools';

describe('all locations query', () => {
  it('should return null edges', async () => {
    const query = `{
      allLocations(search: "unknown place") {
        edges {
          node {
            locationId
          }
        }
      }
    }`;
    expect(await graphql(query)).toMatchSnapshot();
  });
});
