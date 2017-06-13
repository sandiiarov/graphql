// @flow

import { executeQuery } from '../../services/TestingTools';

describe('all flights query with legs', () => {
  it('should return array of flight legs', async () => {
    const allFlightsSearchQuery = `
    query ($input: FlightsSearchInput!) {
      allFlights(search: $input) {
        edges {
          node {
            legs {
              id
              recheckRequired
              arrival {
                airport {
                  city { name }, code
                }
                time, localTime
              }
              departure {
                airport {
                  city { name }, code
                }
                time, localTime
              }
            }
          }
        }
      }
    }`;
    const variables = {
      input: {
        from: 'PRG',
        to: 'MEX',
        dateFrom: '2017-08-08',
        dateTo: '2017-09-08',
      },
    };
    expect(
      await executeQuery(allFlightsSearchQuery, variables),
    ).toMatchSnapshot();
  });
});
