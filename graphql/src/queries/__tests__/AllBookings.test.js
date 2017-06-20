// @flow

import { bookings } from '../../datasets';
import { graphql, RestApiMock } from '../../services/TestingTools';
import AllBookings from '../AllBookings';
import config from '../../../config/application';

beforeEach(() => {
  RestApiMock.onGet(config.restApiEndpoint.allBookings).replyWithData(bookings);
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
              airport { city { name }, code }
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
              airport { city { name }, code }
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
    expect(await graphql(flightsQuery)).toMatchSnapshot();
  });
});
