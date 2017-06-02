// @flow

import { executeQuery } from '../../services/TestingTools';
import AllFlights from '../AllFlights';

describe('all flights query', () => {
  it('should be non-null list of non-null Flight types', () => {
    expect(AllFlights.type.toString()).toBe('[Flight!]!');
  });

  it('should return array of flights', async () => {
    const allFlightsSearchQuery = `
    query ($input: FlightsSearchInput!) {
      allFlights(search: $input) {
        airlines {
          name
          code
          logoUrl
          isLowCost
        }
      }
    }`;
    const variables = {
      input: {
        from: 'PRG',
        to: 'MEX',
        dateFrom: '2017-08-08',
        dateTo: '2017-09-08',
      },
    };
    expect(
      await executeQuery(allFlightsSearchQuery, variables),
    ).toMatchSnapshot();
  });
});
