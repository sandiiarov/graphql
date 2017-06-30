// @flow

import { graphql, RestApiMock } from '../../services/TestingTools';
import config from '../../../config/application';
import { Flight } from '../../datasets';

RestApiMock.onGet(
  config.restApiEndpoint.allFlights({
    flyFrom: 'PRG',
    to: 'MEX',
    dateFrom: '08/08/2017',
    dateTo: '08/09/2017',
  }),
).replyWithData(Flight.prgMex);

RestApiMock.onGet(
  config.restApiEndpoint.allFlights({
    flyFrom: 'PRG',
    to: 'MEX',
    dateFrom: '08/08/2017',
    dateTo: '08/09/2017',
    curr: 'CZK',
  }),
).replyWithData(Flight.prgMexCzk);

describe('all flights query', () => {
  it('should return flight prices', async () => {
    const allFlightsSearchQuery = `
    query ($input: FlightsSearchInput!) {
      allFlights(search: $input) {
        edges {
          node {
            price { amount, currency }
          }
        }
      }
    }`;
    const variables = {
      input: {
        from: {
          location: 'PRG',
        },
        to: {
          location: 'MEX',
        },
        dateFrom: {
          exact: '2017-08-08',
        },
        dateTo: {
          exact: '2017-09-08',
        },
      },
    };
    expect(await graphql(allFlightsSearchQuery, variables)).toMatchSnapshot();
  });

  it('should return flight prices in different currency', async () => {
    const allFlightsSearchQuery = `
    query ($input: FlightsSearchInput!, $options: FlightsOptionsInput) {
      allFlights(search: $input, options: $options) {
        edges {
          node {
            price { amount, currency }
          }
        }
      }
    }`;
    const variables = {
      input: {
        from: {
          location: 'PRG',
        },
        to: {
          location: 'MEX',
        },
        dateFrom: {
          exact: '2017-08-08',
        },
        dateTo: {
          exact: '2017-09-08',
        },
      },
      options: {
        currency: 'CZK',
      },
    };
    expect(await graphql(allFlightsSearchQuery, variables)).toMatchSnapshot();
  });
});
