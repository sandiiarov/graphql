// @flow

import { graphql } from '../../services/TestingTools';

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
