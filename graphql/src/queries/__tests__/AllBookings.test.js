import { graphql } from 'graphql';
import schema from '../../Schema';
import AllBookings from '../AllBookings';

jest.mock('../../services/HttpRequest');

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
    const result = await graphql(schema, arrivalQuery);
    expect(result).toMatchSnapshot();
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
    const result = await graphql(schema, departureQuery);
    expect(result).toMatchSnapshot();
  });
});

describe('flights query', () => {
  it('should return valid id field', async () => {
    const departureQuery = `{
      allBookings {
        flights {
          arrival { id }
          departure { id }
        }
      }
    }`;
    const result = await graphql(schema, departureQuery);
    expect(result).toMatchSnapshot();
  });
});
