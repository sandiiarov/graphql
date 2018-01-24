// @flow

import {
  graphql,
  BookingComApiMock,
} from '../../../common/services/TestingTools';
import AllHotelsDataset from '../../datasets/all.json';

beforeEach(() => {
  BookingComApiMock.onGet(
    'https://distribution-xml.booking.com/2.0/json/hotelAvailability?extras=hotel_details&order_by=popularity&city_ids=-2140205&checkin=2017-11-16&checkout=2017-11-23&rows=2&room1=A',
  ).replyWithData(AllHotelsDataset);
  BookingComApiMock.onGet(
    'https://distribution-xml.booking.com/2.0/json/hotelAvailability?city_ids=-2140205&checkin=2017-11-16&checkout=2017-11-23&currency=EUR&rows=1&room1=A&order_dir=desc&order_by=price&offset=0',
  ).replyWithData({
    result: [{ hotel_id: 2086794, hotel_currency_code: 'EUR', price: 2222 }],
  });
  BookingComApiMock.onGet(
    'https://distribution-xml.booking.com/2.0/json/hotelAvailability?city_ids=-2140205&checkin=2017-11-16&checkout=2017-11-23&currency=EUR&rows=1&room1=A&order_dir=asc&order_by=price&offset=0',
  ).replyWithData({
    result: [{ hotel_id: 2086794, hotel_currency_code: 'EUR', price: 100 }],
  });
});

describe('all hotels query', () => {
  it('should work for with price stats connection fields', async () => {
    expect(
      await graphql(`
        {
          allAvailableHotels(
            search: {
              cityId: "aG90ZWxDaXR5Oi0yMTQwMjA1" # hotelCity:-2140205
              checkin: "2017-11-16"
              checkout: "2017-11-23"
              roomsConfiguration: [{ adultsCount: 1 }]
            }
            first: 2
          ) {
            stats {
              priceMax
              priceMin
            }
            edges {
              node {
                id
              }
            }
          }
        }
      `),
    ).toMatchSnapshot();
  });
});
