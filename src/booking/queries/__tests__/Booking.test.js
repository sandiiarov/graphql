// @flow

import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import config from '../../../../config/application';
import Booking from '../Booking';
import AllBookingsDataset from '../../datasets/AllBookings.json';
import SingleBooking from '../../datasets/booking-2707251.json';

beforeEach(() => {
  RestApiMock.onGet(config.restApiEndpoint.allBookings).replyWithData(
    AllBookingsDataset,
  );

  ['CDG', 'LGW'].forEach(iata => {
    RestApiMock.onGet(
      config.restApiEndpoint.allLocations({
        term: iata,
        locale: 'en-US',
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

describe('single booking query', () => {
  it('should be of Booking type', () => {
    expect(Booking.type.toString()).toBe('Booking');
  });

  it('should return valid fields', async () => {
    const arrivalQuery = `{
      booking(id: 2707251) {
        destinationImageUrl
        directAccessURL
        arrival {
          airport { city { name }, locationId }
        }
        departure {
          airport { city { name }, locationId }
        }
        legs {
          arrival {
            airport { city { name }, locationId }
          }
          departure {
            airport { city { name }, locationId }
          }
        }
      }
    }`;
    expect(await graphql(arrivalQuery)).toMatchSnapshot();
  });

  it('should work with opaque Booking id', async () => {
    const query = `{
      booking(id: "Qm9va2luZzoyNzA3MjUx") {
        id
        databaseId
      }
    }`;
    expect(await graphql(query)).toMatchSnapshot();
  });

  it('should map skysilver and skygold to travel_basic/plus', async () => {
    RestApiMock.onGet(
      'https://booking-api.skypicker.com/api/v0.1/users/self/bookings/2707251?simple_token=b206db64-718f-4608-babb-0b8abe6e1b9d',
    ).replyWithData({
      ...SingleBooking,
      passengers: [
        {
          category: 'adults',
          bags: 0,
          insurance_price: null,
          firstname: 'TEST',
          travel_document: {
            cardno: '12345678XY',
            expiration: 1608768000,
          },
          lastname: 'TEST',
          pkpass: null,
          title: 'mr',
          hand_bags: {},
          birthday: '1985-01-01',
          contact_passenger: true,
          nationality: 'us',
          id: 4095416,
          insurance_type: 'skysilver',
        },
        {
          category: 'adults',
          bags: 0,
          insurance_price: null,
          firstname: 'TEST',
          travel_document: {
            cardno: '12345678XY',
            expiration: 1608768000,
          },
          lastname: 'TEST',
          pkpass: null,
          title: 'mr',
          hand_bags: {},
          birthday: '1985-01-01',
          contact_passenger: true,
          nationality: 'us',
          id: 4095417,
          insurance_type: 'skygold',
        },
      ],
    });
    const query = `{
      booking(id: 2707251) {
        passengers {
          insuranceType
        }
      }
    }`;
    expect(await graphql(query)).toMatchSnapshot();
  });
});
