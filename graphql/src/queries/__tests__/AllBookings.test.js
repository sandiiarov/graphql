// @flow

import { Booking } from '../../datasets';
import { graphql, RestApiMock } from '../../services/TestingTools';
import AllBookings from '../AllBookings';
import config from '../../../config/application';

beforeEach(() => {
  RestApiMock.onGet(config.restApiEndpoint.allBookings).replyWithData(
    Booking.all,
  );

  ['CDG', 'LGW', 'PRG', 'STN', 'KBP', 'DXB', 'KUF'].forEach(iata => {
    RestApiMock.onGet(
      config.restApiEndpoint.allLocations({
        term: iata,
      }),
    ).replyWithData({
      locations: [
        {
          id: 'MOCKED',
          city: {
            name: 'Mocked City Name',
          },
        },
      ],
    });
  });
});

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
    expect(await graphql(idsQuery)).toMatchSnapshot();
  });
});

describe('arrival query', () => {
  it('should return valid arrival field', async () => {
    const arrivalQuery = `{
      allBookings {
        edges {
          node {
            arrival {
              airport { city { name }, locationId }
              time, localTime
            }
          }
        }
      }
    }`;
    expect(await graphql(arrivalQuery)).toMatchSnapshot();
  });
});

describe('departure query', () => {
  it('should return valid departure field', async () => {
    const departureQuery = `{
      allBookings {
        edges {
          node {
            departure {
              airport { city { name }, locationId }
              time, localTime
            }
          }
        }
      }
    }`;
    expect(await graphql(departureQuery)).toMatchSnapshot();
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
                airport { city { name }, locationId }
                time, localTime
              }
              departure {
                airport { city { name }, locationId }
                time, localTime
              }
            }
          }
        }
      }
    }`;
    expect(await graphql(flightsQuery)).toMatchSnapshot();
  });
});
