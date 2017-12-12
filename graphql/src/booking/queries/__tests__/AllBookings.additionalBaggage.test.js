// @flow

import { Booking } from '../../../datasets/index';
import { graphql, RestApiMock } from '../../../services/TestingTools';
import config from '../../../../config/application';

const { allBookings } = config.restApiEndpoint;

beforeEach(() => {
  RestApiMock.onGet(allBookings).replyWithData(Booking.all);
  RestApiMock.onGet(
    `${allBookings}/2707251\\?simple_token=[0-9a-f-]{36}`,
  ).replyWithData(Booking[2707251]);
  RestApiMock.onGet(
    `${allBookings}/2707229\\?simple_token=[0-9a-f-]{36}`,
  ).replyWithData(Booking[2707229]);
  RestApiMock.onGet(
    `${allBookings}/2707224\\?simple_token=[0-9a-f-]{36}`,
  ).replyWithData(Booking[2707224]);
});

describe('flights query with legs', () => {
  it('should return valid array of flight legs', async () => {
    const additionalBaggageQuery = `{
      allBookings {
        edges {
          node {
            databaseId 
            allowedBaggage {
              additionalBaggage {
                price {
                  amount
                  currency
                }
                quantity
              }
            }
          }
        }
      }
    }`;
    expect(await graphql(additionalBaggageQuery)).toMatchSnapshot();
  });
});
