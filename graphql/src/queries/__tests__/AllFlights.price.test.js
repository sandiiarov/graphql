// @flow

import { graphql } from '../../services/TestingTools';

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
    expect(await graphql(allFlightsSearchQuery, variables)).toMatchSnapshot();
  });

  it('should return flight prices in different currency', async () => {
    const allFlightsSearchQuery = `
    query ($input: FlightsSearchInput!, $options: FlightsOptionsInput) {
      allFlights(search: $input, options: $options) {
        price { amount, currency }
      }
    }`;
    const variables = {
      input: {
        from: 'PRG',
        to: 'MEX',
        dateFrom: '2017-08-08',
        dateTo: '2017-09-08',
      },
      options: {
        currency: 'CZK',
      },
    };
    expect(await graphql(allFlightsSearchQuery, variables)).toMatchSnapshot();
  });
});
