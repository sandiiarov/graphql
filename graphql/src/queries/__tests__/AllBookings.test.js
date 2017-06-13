// @flow

import { executeQuery } from '../../services/TestingTools';
import AllBookings from '../AllBookings';

describe('all bookings query', () => {
  it('should be list of non-null booking types', () => {
    expect(AllBookings.type.toString()).toBe('BookingConnection');
  });
});

describe('id query', () => {
  it('should return IDs of bookings', async () => {
    const idsQuery = `{
      allBookings {
        edges {
          node {
            id
            databaseId
          }
        }
      }
    }`;
    expect(await executeQuery(idsQuery)).toMatchSnapshot();
  });
});

describe('arrival query', () => {
  it('should return valid arrival field', async () => {
    const arrivalQuery = `{
      allBookings {
        edges {
          node {
            arrival {
              airport { city { name }, code }
              time, localTime
            }
          }
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
        edges {
          node {
            departure {
              airport { city { name }, code }
              time, localTime
            }
          }
        }
      }
    }`;
    expect(await executeQuery(departureQuery)).toMatchSnapshot();
  });
});

describe('flights query', () => {
  it('should return valid legs field', async () => {
    const flightsQuery = `{
      allBookings {
        edges {
          node {
            legs {
              arrival {
                airport { city { name }, code }
                time, localTime
              }
              departure {
                airport { city { name }, code }
                time, localTime
              }
            }
          }
        }
      }
    }`;
    expect(await executeQuery(flightsQuery)).toMatchSnapshot();
  });
});
