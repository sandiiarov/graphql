// @flow

import { executeQuery } from '../../services/TestingTools';
import Booking from '../Booking';

jest.mock('../../services/HttpRequest');

describe('single booking query', () => {
  it('should be of Booking type', () => {
    expect(Booking.type.toString()).toBe('Booking');
  });

  it('should return valid fields', async () => {
    const arrivalQuery = `{
      booking(id: 2707251) {
        arrival {
          airport { city, code }
        }
        departure {
          airport { city, code }
        }
        legs {
          arrival {
            airport { city, code }
          }
          departure {
            airport { city, code }
          }
        }
      }
    }`;
    expect(await executeQuery(arrivalQuery)).toMatchSnapshot();
  });
});
