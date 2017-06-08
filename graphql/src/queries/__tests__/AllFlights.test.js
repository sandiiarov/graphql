// @flow

import { executeQuery } from '../../services/TestingTools';
import AllFlights from '../AllFlights';

describe('all flights query', () => {
  it('should be non-null list of non-null Flight types', () => {
    expect(AllFlights.type.toString()).toBe('[Flight!]!');
  });

  it('should return array of flights', async () => {
    const allFlightsSearchQuery = `
    query ($input: FlightsSearchInput!) {
      allFlights(search: $input) {
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

  it('should return error if invalid date format is passed', async () => {
    const allFlightsSearchQuery = `
    query ($input: FlightsSearchInput!) {
      allFlights(search: $input) {
        arrival {
          time
        }
      }
    }`;
    const variables = {
      input: {
        from: 'PRG',
        to: 'MEX',
        dateFrom: '08/08/2017',
        dateTo: '2017-09-08',
      },
    };
    expect(
      await executeQuery(allFlightsSearchQuery, variables),
    ).toMatchSnapshot();
  });

  it('should return error if dateFrom is after dateTo', async () => {
    const allFlightsSearchQuery = `
    query ($input: FlightsSearchInput!) {
      allFlights(search: $input) {
        arrival {
          time
        }
      }
    }`;
    const variables = {
      input: {
        from: 'PRG',
        to: 'MEX',
        dateFrom: '2018-08-08',
        dateTo: '2017-09-08',
      },
    };
    expect(
      await executeQuery(allFlightsSearchQuery, variables),
    ).toMatchSnapshot();
  });
});
