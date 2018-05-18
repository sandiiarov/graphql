// @flow

import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import config from '../../../../config/application';
import AllBookingsDataset from '../../datasets/AllBookings.json';
import Booking2707229Dataset from '../../datasets/booking-2707229.json';

const { allBookings } = config.restApiEndpoint;

beforeEach(() => {
  RestApiMock.onGet(config.restApiEndpoint.allBookings).replyWithData(
    AllBookingsDataset,
  );

  RestApiMock.onGet(
    `${allBookings}/2707229\\?simple_token=[0-9a-f-]{36}`,
  ).replyWithData(Booking2707229Dataset);
});

it('should return contact details', async () => {
  const query = `{
      booking(id: 2707229) {
        contactDetails {
          phone
          email
        }
      }
    }`;
  expect(await graphql(query)).toMatchSnapshot();
});
