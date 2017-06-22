// @flow

import { graphql, RestApiMock } from '../../services/TestingTools';
import config from '../../../config/application';
import { Flight, Location } from '../../datasets';

RestApiMock.onGet(
  config.restApiEndpoint.allFlights({
    flyFrom: 'Prague',
    to: 'Mexico',
    dateFrom: '08/08/2017',
    dateTo: '08/09/2017',
  }),
).replyWithData(Flight.noResults);

RestApiMock.onGet(
  config.restApiEndpoint.allFlights({
    flyFrom: 'prague_cz',
    to: 'MEX',
    dateFrom: '08/08/2017',
    dateTo: '08/09/2017',
  }),
).replyWithData(Flight.prgMex);

RestApiMock.onGet(
  config.restApiEndpoint.allFlights({
    flyFrom: 'Prague,Frankfurt',
    to: 'Mexico',
    dateFrom: '08/08/2017',
    dateTo: '08/09/2017',
  }),
).replyWithData(Flight.noResults);

RestApiMock.onGet(
  config.restApiEndpoint.allFlights({
    flyFrom: 'prague_cz,frankfurt_de',
    to: 'MEX',
    dateFrom: '08/08/2017',
    dateTo: '08/09/2017',
  }),
).replyWithData(Flight.prgFraMex);

RestApiMock.onGet(
  config.restApiEndpoint.allLocations({ term: 'Prague' }),
).replyWithData(Location.prague);

RestApiMock.onGet(
  config.restApiEndpoint.allLocations({ term: 'Frankfurt' }),
).replyWithData(Location.frankfurt);

RestApiMock.onGet(
  config.restApiEndpoint.allLocations({ term: 'Mexico' }),
).replyWithData(Location.mexico);

describe('all flights location fallback', () => {
  it('should return legs data by using locations fallback', async () => {
    const allFlightsSearchQuery = `
    query ($input: FlightsSearchInput!) {
      allFlights(search: $input) {
        edges {
          node {
            legs {
              id
              departure { airport { city { name } } }
              arrival { airport { city { name } } }
            }
          }
        }
      }
    }`;
    const variables = {
      input: {
        // From and To defined as a name, not code or id
        from: {
          location: 'Prague',
        },
        to: {
          location: 'Mexico',
        },
        dateFrom: '2017-08-08',
        dateTo: '2017-09-08',
      },
    };
    expect(await graphql(allFlightsSearchQuery, variables)).toMatchSnapshot();
  });

  it('should return legs data by using locations fallback with multiple locations', async () => {
    const allFlightsSearchQuery = `
    query ($input: FlightsSearchInput!) {
      allFlights(search: $input) {
        edges {
          node {
            legs {
              id
              departure { airport { city { name } } }
              arrival { airport { city { name } } }
            }
          }
        }
      }
    }`;
    const variables = {
      input: {
        // From and To defined as a name, not code or id
        from: [{ location: 'Prague' }, { location: 'Frankfurt' }],
        to: {
          location: 'Mexico',
        },
        dateFrom: '2017-08-08',
        dateTo: '2017-09-08',
      },
    };
    expect(await graphql(allFlightsSearchQuery, variables)).toMatchSnapshot();
  });
});
