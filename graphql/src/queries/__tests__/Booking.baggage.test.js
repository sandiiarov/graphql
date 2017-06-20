// @flow

import { bookings, booking2707251, booking2707229 } from '../../datasets';
import { graphql, RestApiMock } from '../../services/TestingTools';
import config from '../../../config/application';

const { allBookings } = config.restApiEndpoint;

beforeEach(() => {
  RestApiMock.onGet(config.restApiEndpoint.allBookings).replyWithData(bookings);
  RestApiMock.onGet(
    `${allBookings}/2707251?simple_token=b206db64-718f-4608-babb-0b8abe6e1b9d`,
  ).replyWithData(booking2707251);
  RestApiMock.onGet(
    `${allBookings}/2707229?simple_token=900c31b3-cc55-49b0-83ef-c7daac71a170`,
  ).replyWithData(booking2707229);
});

it('should return baggage parameters', async () => {
  const baggageQuery = `{
      booking(id: 2707251) {
        allowedBaggage {
          cabin { height, length, width, weight, note }
          checked { height, length, width, weight, note }
        }
      }
    }`;
  expect(await graphql(baggageQuery)).toMatchSnapshot();
});
