// @flow

import { graphql } from '../../services/TestingTools';

describe('all flights query', () => {
  it('should return array of flights', async () => {
    const allFlightsSearchQuery = `
    query ($input: FlightsSearchInput!) {
      allFlights(search: $input) {
        edges {
          node {
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
});
