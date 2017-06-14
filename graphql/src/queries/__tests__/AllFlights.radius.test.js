// @flow

import { graphql } from '../../services/TestingTools';

describe('all flights radius', () => {
  it('should return legs data for radius search', async () => {
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
        from: [
          {
            location: 'Prague',
          },
          {
            // Frankfurt
            radius: {
              lat: 50.11,
              lng: 8.68,
              radius: 10,
            },
          },
        ],
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
