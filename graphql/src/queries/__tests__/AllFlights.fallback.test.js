// @flow

import { graphql } from '../../services/TestingTools';

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
