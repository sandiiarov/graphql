import { executeQuery } from '../../services/TestingTools';
import Booking from '../Booking';

jest.mock('../../services/HttpRequest');

describe('single booking query', () => {
  it('should be Booking type', () => {
    expect(Booking.type.toString()).toBe('Booking');
  });
});

describe('arrival query', () => {
  it('should return valid id field', async () => {
    const arrivalQuery = `{
      booking(id: 2707251) {
        arrival {
          airport { city, code }
        }
        departure {
          airport { city, code }
        }
        flights {
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
