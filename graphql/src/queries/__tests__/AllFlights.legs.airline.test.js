// @flow

import { graphql, RestApiMock } from '../../services/TestingTools';
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

describe('all flights query with legs airline', () => {
  it('should return array of flight legs with airline', async () => {
    const allFlightsSearchQuery = `
    query ($input: FlightsSearchInput!) {
      allFlights(search: $input) {
        edges {
          node {
            legs {
              airline {
                name
                code
                logoUrl
                isLowCost
              }
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
        date: {
          from: '2017-08-08',
          to: '2017-09-08',
        },
      },
    };
    expect(await graphql(allFlightsSearchQuery, variables)).toMatchSnapshot();
  });
});
