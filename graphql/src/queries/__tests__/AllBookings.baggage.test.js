// @flow

import {
  bookings,
  booking2707251,
  booking2707229,
  booking2707224,
} from '../../datasets';
import { graphql, RestApiMock } from '../../services/TestingTools';
import config from '../../../config/application';

const { allBookings } = config.restApiEndpoint;

beforeEach(() => {
  RestApiMock.onGet(allBookings).replyWithData(bookings);
  RestApiMock.onGet(
    `${allBookings}/2707251?simple_token=b206db64-718f-4608-babb-0b8abe6e1b9d`,
  ).replyWithData(booking2707251);
  RestApiMock.onGet(
    `${allBookings}/2707229?simple_token=900c31b3-cc55-49b0-83ef-c7daac71a170`,
  ).replyWithData(booking2707229);
  RestApiMock.onGet(
    `${allBookings}/2707224?simple_token=c3f29dd0-18a7-4062-9162-b58f4022fc70`,
  ).replyWithData(booking2707224);
});

it('should return baggage parameters', async () => {
  const baggageQuery = `{
      allBookings {
        edges {
          node {
            databaseId
            allowedBaggage {
              cabin { height, length, width, weight, note }
              checked { height, length, width, weight, note }
            }
          }
        }
      }
    }`;
  expect(await graphql(baggageQuery)).toMatchSnapshot();
});
