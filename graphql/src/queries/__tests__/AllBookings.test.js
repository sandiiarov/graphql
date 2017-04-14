import { executeQuery } from '../../services/TestingTools';
import AllBookings from '../AllBookings';

describe('all bookings query', () => {
  it('should be list of non-null booking types', () => {
    expect(AllBookings.type.toString()).toBe('[Booking!]');
  });
});

describe('arrival query', () => {
  it('should return valid id field', async () => {
    const arrivalQuery = `{
      allBookings {
        arrival {
          id
        }
      }
    }`;
    expect(await executeQuery(arrivalQuery)).toMatchSnapshot();
  });
});

describe('departure query', () => {
  it('should return valid id field', async () => {
    const departureQuery = `{
      allBookings {
        departure {
          id
        }
      }
    }`;
    expect(await executeQuery(departureQuery)).toMatchSnapshot();
  });
});

describe('flights query', () => {
  it('should return valid id field', async () => {
    const flightsQuery = `{
      allBookings {
        flights {
          arrival { id }
          departure { id }
        }
      }
    }`;
    expect(await executeQuery(flightsQuery)).toMatchSnapshot();
  });
});
