// @flow

import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import config from '../../../../config/application';
import AllBookingsDataset from '../../datasets/AllBookings.json';
import Booking2707251Dataset from '../../datasets/booking-2707251.json';
import FranceLocation from '../../../location/datasets/france.json';

const { allBookings } = config.restApiEndpoint;

beforeEach(() => {
  RestApiMock.onGet(config.restApiEndpoint.allBookings).replyWithData(
    AllBookingsDataset,
  );
  RestApiMock.onGet(
    `${allBookings}/2707251\\?simple_token=[0-9a-f-]{36}`,
  ).replyWithData(Booking2707251Dataset);
  RestApiMock.onGet(
    'https://api.skypicker.com/locations?term=FR',
  ).replyWithData(FranceLocation);
});

it('should return baggage parameters', async () => {
  const visaQuery = `{
      booking(id: 2707251) {
        passengers {
          visaInformation {
            requiredIn {
              name
            }
            warningIn {
              name
            }
            okIn {
              name
            }
          }
        }
      }
    }`;
  expect(await graphql(visaQuery)).toMatchSnapshot();
});
