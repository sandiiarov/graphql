// @flow

import { Booking as BookingDataset } from '../../datasets';
import { graphql, RestApiMock } from '../../services/TestingTools';
import config from '../../../config/application';
import Booking from '../Booking';

beforeEach(() => {
  RestApiMock.onGet(config.restApiEndpoint.allBookings).replyWithData(
    BookingDataset.all,
  );
});

describe('single booking query', () => {
  it('should be of Booking type', () => {
    expect(Booking.type.toString()).toBe('Booking');
  });

  it('should return valid fields', async () => {
    const arrivalQuery = `{
      booking(id: 2707251) {
        arrival {
          airport { city { name }, code }
        }
        departure {
          airport { city { name }, code }
        }
        legs {
          arrival {
            airport { city { name }, code }
          }
          departure {
            airport { city { name }, code }
          }
        }
      }
    }`;
    expect(await graphql(arrivalQuery)).toMatchSnapshot();
  });
});
