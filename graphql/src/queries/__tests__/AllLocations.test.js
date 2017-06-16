// @flow

import { graphql } from '../../services/TestingTools';

describe('all locations query', () => {
  it('should return error for no argument', async () => {
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
});
