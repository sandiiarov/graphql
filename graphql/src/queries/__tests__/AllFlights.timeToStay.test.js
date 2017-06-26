// @flow

import { graphql, RestApiMock } from '../../services/TestingTools';
import config from '../../../config/application';
import { Flight } from '../../datasets';

RestApiMock.onGet(
  config.restApiEndpoint.allFlights({
    flyFrom: 'PRG',
    to: 'MEX',
    dateFrom: '08/08/2017',
    daysInDestinationFrom: 7,
    daysInDestinationTo: 10,
  }),
).replyWithData(Flight.prgMexFrom7To10Days);

['PRG', 'LHR', 'ORD', 'IAH', 'MEX'].forEach(iata => {
  RestApiMock.onGet(
    config.restApiEndpoint.allLocations({ term: iata }),
  ).replyWithData({
    locations: [
      {
        id: 'MOCKED',
        city: {
          name: iata,
        },
      },
    ],
  });
});

describe('all flights query', () => {
  it('should return flights with 7-10 days spend in destination', async () => {
    const allFlightsSearchQuery = `
    query ($input: FlightsSearchInput!) {
      allFlights(search: $input) {
        edges {
          node {
            legs {
              departure { time, airport { city { name } } }
              arrival { time, airport { city { name } } }
            }
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
          timeToStay: {
            from: 7,
            to: 10,
          },
        },
      },
    };
    expect(await graphql(allFlightsSearchQuery, variables)).toMatchSnapshot();
  });
});
