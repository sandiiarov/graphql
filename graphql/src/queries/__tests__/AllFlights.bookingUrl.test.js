// @flow

import { graphql, RestApiMock } from '../../services/TestingTools';
import config from '../../../config/application';
import { Flight } from '../../datasets';

beforeEach(() => {
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
      adults: 3,
    }),
  ).replyWithData(Flight.prgMex);

  RestApiMock.onGet(
    config.restApiEndpoint.allFlights({
      flyFrom: 'PRG',
      to: 'MEX',
      dateFrom: '08/08/2017',
      dateTo: '08/09/2017',
      locale: 'cz',
    }),
  ).replyWithData(Flight.prgMex);
});

describe('All Flights booking URL', () => {
  it('should return booking urls', async () => {
    const allFlightsSearchQuery = `
    query ($input: FlightsSearchInput!) {
      allFlights(search: $input) {
        edges {
          node {
            departure { time }
            bookingUrl
          }
        }
      }
    }`;
    const variables = {
      input: {
        from: { location: 'PRG' },
        to: { location: 'MEX' },
        dateFrom: '2017-08-08',
        dateTo: '2017-09-08',
      },
    };
    expect(await graphql(allFlightsSearchQuery, variables)).toMatchSnapshot();
  });

  it('should return booking urls for more passengers', async () => {
    const allFlightsSearchQuery = `
    query ($input: FlightsSearchInput!) {
      allFlights(search: $input) {
        edges {
          node {
            departure { time }
            bookingUrl
          }
        }
      }
    }`;
    const variables = {
      input: {
        from: { location: 'PRG' },
        to: { location: 'MEX' },
        dateFrom: '2017-08-08',
        dateTo: '2017-09-08',
        passengers: { adults: 3 },
      },
    };
    expect(await graphql(allFlightsSearchQuery, variables)).toMatchSnapshot();
  });

  it('should return booking urls with locale', async () => {
    const allFlightsSearchQuery = `
    query ($input: FlightsSearchInput!, $options: FlightsOptionsInput) {
      allFlights(search: $input, options: $options) {
        edges {
          node {
            departure { time }
            bookingUrl
          }
        }
      }
    }`;
    const variables = {
      input: {
        from: { location: 'PRG' },
        to: { location: 'MEX' },
        dateFrom: '2017-08-08',
        dateTo: '2017-09-08',
      },
      options: {
        locale: 'cs_CZ',
      },
    };
    expect(await graphql(allFlightsSearchQuery, variables)).toMatchSnapshot();
  });
});
