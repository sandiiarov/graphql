import { executeQuery } from '../../services/TestingTools';
import AllBookings from '../AllBookings';

describe('all bookings query', () => {
  it('should be list of non-null booking types', () => {
    expect(AllBookings.type.toString()).toBe('[Booking!]');
  });
});

describe('id query', () => {
  it('should return IDs of bookings', async () => {
    const idsQuery = `{
      allBookings {
        id
      }
    }`;
    expect(await executeQuery(idsQuery)).toMatchSnapshot();
  });
});

describe('arrival query', () => {
  it('should return valid arrival field', async () => {
    const arrivalQuery = `{
      allBookings {
        arrival {
          airport { city, code }
        }
      }
    }`;
    expect(await executeQuery(arrivalQuery)).toMatchSnapshot();
  });
});

describe('departure query', () => {
  it('should return valid departure field', async () => {
    const departureQuery = `{
      allBookings {
        departure {
          airport { city, code }
        }
      }
    }`;
    expect(await executeQuery(departureQuery)).toMatchSnapshot();
  });
});

describe('flights query', () => {
  it('should return valid flights field', async () => {
    const flightsQuery = `{
      allBookings {
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
    expect(await executeQuery(flightsQuery)).toMatchSnapshot();
  });
});
