// @flow

import { Booking } from '../../datasets';
import { graphql, RestApiMock } from '../../services/TestingTools';
import config from '../../../config/application';

beforeEach(() => {
  RestApiMock.onGet(config.restApiEndpoint.allBookings).replyWithData(
    Booking.all,
  );

  ['CDG', 'PRG', 'LGW', 'STN', 'KBP', 'DXB', 'KUF'].forEach(iata => {
    RestApiMock.onGet(
      config.restApiEndpoint.allLocations({
        term: iata,
      }),
    ).replyWithData({
      locations: [
        {
          id: 'MOCKED',
          city: {
            name: 'Mocked City Name',
          },
        },
      ],
    });
  });
});

describe('flights query with legs', () => {
  it('should return valid array of flight legs', async () => {
    const legsQuery = `{
      allBookings {
        edges {
          node {
            legs {
              id
              recheckRequired
              arrival {
                airport {
                  city { name }, locationId
                }
                time, localTime
              }
              departure {
                airport {
                  city { name }, locationId
                }
                time, localTime
              }
            }
          }
        }
      }
    }`;
    expect(await graphql(legsQuery)).toMatchSnapshot();
  });
});
