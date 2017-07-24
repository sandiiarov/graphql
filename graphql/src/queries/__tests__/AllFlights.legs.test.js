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

  ['OSL', 'PRG', 'MCO', 'IAH', 'MEX', 'ARN', 'LAX'].forEach(iata => {
    RestApiMock.onGet(
      config.restApiEndpoint.allLocations({
        term: iata,
      }),
    ).replyWithData({
      locations: [
        {
          id: 'MOCKED',
          city: {
            name: 'Mocked City Name',
          },
        },
      ],
    });
  });
});

describe('all flights query with legs', () => {
  it('should return array of flight legs', async () => {
    const allFlightsSearchQuery = `
    query ($input: FlightsSearchInput!) {
      allFlights(search: $input) {
        edges {
          node {
            legs {
              id
              arrival {
                airport {
                  city { name }, locationId
                }
                time, localTime
              }
              departure {
                airport {
                  city { name }, locationId
                }
                time, localTime
              }
              duration
              flightNumber
              recheckRequired
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
        dateFrom: '2017-08-08',
        dateTo: '2017-09-08',
      },
    };
    expect(await graphql(allFlightsSearchQuery, variables)).toMatchSnapshot();
  });
});
