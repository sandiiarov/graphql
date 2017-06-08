// @flow

import { executeQuery } from '../../services/TestingTools';

describe('all flights query', () => {
  it('should return flight prices', async () => {
    const allFlightsSearchQuery = `
    query ($input: FlightsSearchInput!) {
      allFlights(search: $input) {
        price {
          amount
          currency
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
