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
      adults: 2,
    }),
  ).replyWithData(Flight.prgMex);
});

describe('All flights passengers', () => {
  it('should return flights for more passengers', async () => {
    const allFlightsSearchQuery = `
    query ($input: FlightsSearchInput!) {
      allFlights(search: $input) {
        edges {
          node {
            arrival { time }
            departure { time }
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
        passengers: {
          adults: 2,
        },
      },
    };
    expect(await graphql(allFlightsSearchQuery, variables)).toMatchSnapshot();
  });
});
