// @flow

import { graphql, RestApiMock } from '../../../../services/TestingTools';
import config from '../../../../../config/application';
import { Flight, Location } from '../../../../datasets/index';

beforeEach(() => {
  RestApiMock.onGet(
    config.restApiEndpoint.allFlights({
      flyFrom: 'PRG',
      to: 'MEX',
      dateFrom: '08/08/2017',
      dateTo: '08/09/2017',
      maxStopovers: 0,
    }),
  ).replyWithData(Flight.prgMex);

  RestApiMock.onGet(
    config.restApiEndpoint.allLocations({ term: 'PRG' }),
  ).replyWithData(Location.prague);

  RestApiMock.onGet(
    config.restApiEndpoint.allLocations({ term: 'MEX' }),
  ).replyWithData(Location.mexico);
});

describe('all flights filters', () => {
  it('should return direct flights', async () => {
    const query = `
    query ($input: FlightsSearchInput!, $filters: FlightsFiltersInput) {
      allFlights(search: $input, filters: $filters) {
        edges {
          node {
            departure { airport { city { name }}}
            arrival { airport { city { name }}}
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
      filters: {
        maxStopovers: 0,
      },
    };
    expect(await graphql(query, variables)).toMatchSnapshot();
  });
});
