// @flow

import { Booking } from '../../datasets';
import { graphql, RestApiMock } from '../../services/TestingTools';
import config from '../../../config/application';

beforeEach(() => {
  RestApiMock.onGet(config.restApiEndpoint.allBookings).replyWithData(
    Booking.all,
  );
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
    expect(await graphql(legsQuery)).toMatchSnapshot();
  });
});
