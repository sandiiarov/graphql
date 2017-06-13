// @flow

import { executeQuery } from '../../services/TestingTools';

describe('all locations query', () => {
  it('should return empty array', async () => {
    const query = `{
      allLocations(term: "unknown place") {
        locationId
      }
    }`;
    expect(await executeQuery(query)).toMatchSnapshot();
  });
});
