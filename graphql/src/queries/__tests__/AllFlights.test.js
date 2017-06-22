// @flow

import { graphql, RestApiMock } from '../../services/TestingTools';
import AllFlights from '../AllFlights';
import config from '../../../config/application';
import { Airline, Flight } from '../../datasets';

RestApiMock.onGet(
  config.restApiEndpoint.allFlights({
    flyFrom: 'PRG',
    to: 'MEX',
    dateFrom: '08/08/2017',
    dateTo: '08/09/2017',
  }),
).replyWithData(Flight.prgMex);

RestApiMock.onGet(config.restApiEndpoint.airlines).replyWithData(Airline.all);

describe('all flights query', () => {
  it('should be non-null list of non-null Flight types', () => {
    expect(AllFlights.type.toString()).toBe('FlightConnection');
  });

  it('should return array of flights', async () => {
    const allFlightsSearchQuery = `
    query ($input: FlightsSearchInput!) {
      allFlights(search: $input) {
        edges {
          node {
            arrival {
              airport { city { name }, code }
              time, localTime
            }
            departure {
              airport { city { name }, code }
              time, localTime
            }
            airlines {
              name
              code
              logoUrl
              isLowCost
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

  it('should return error if invalid date format is passed', async () => {
    const allFlightsSearchQuery = `
    query ($input: FlightsSearchInput!) {
      allFlights(search: $input) {
        edges {
          node {
            arrival {
              time
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
        dateFrom: '08/08/2017',
        dateTo: '2017-09-08',
      },
    };
    expect(await graphql(allFlightsSearchQuery, variables)).toMatchSnapshot();
  });

  it('should return error if dateFrom is after dateTo', async () => {
    const allFlightsSearchQuery = `
    query ($input: FlightsSearchInput!) {
      allFlights(search: $input) {
        edges {
          node {
            arrival {
              time
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
        dateFrom: '2018-08-08',
        dateTo: '2017-09-08',
      },
    };
    expect(await graphql(allFlightsSearchQuery, variables)).toMatchSnapshot();
  });
});
