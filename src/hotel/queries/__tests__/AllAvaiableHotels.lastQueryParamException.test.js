// @flow
import { graphql } from '../../../common/services/TestingTools';

describe('all hotels query', () => {
  it('should throw an error if the last query paramter is used', async () => {
    const query = `
  {
    allAvailableHotels(
      search: {
        latitude: 45.4654
        longitude: 9.1859
        checkin: "2017-11-16"
        checkout: "2017-11-23"
        roomsConfiguration: [
          { adultsCount: 2, children: [{ age: 4 }, { age: 6 }] }
          { adultsCount: 1, children: [{ age: 2 }] }
        ]
      }
      last: 10
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;
    const response = await graphql(query);
    expect(response.errors[0].message).toEqual(
      'Booking.com API does not support querying last, use first query paramter instead.',
    );
  });
});
