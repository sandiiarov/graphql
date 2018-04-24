// @flow

import AlgoliaMock from 'algoliasearch';

import {
  graphql,
  BookingComApiMock,
} from '../../../common/services/TestingTools';
import AllHotelsDataset from '../../datasets/all.json';

jest.mock('algoliasearch');

const matchingCities = [
  {
    location: {
      longitude: '4.97104',
      latitude: '52.27028',
    },
    nr_hotels: 11,
    country: 'nl',
    translations: [
      {
        name: 'Abcoude',
        language: 'en',
      },
    ],
    name: 'Abcoude',
    city_id: -2140205,
  },
];

BookingComApiMock.onGet(
  'https://distribution-xml.booking.com/2.0/json/hotelAvailability?extras=hotel_details&order_by=popularity&radius=50&latitude=51&longitude=14&checkin=2018-05-01&checkout=2018-05-03&rows=50&room1=A',
).replyWithData(AllHotelsDataset);
BookingComApiMock.onGet(
  'https://distribution-xml.booking.com/2.0/json/hotelAvailability?extras=hotel_details&order_by=popularity&city_ids=-2140205&checkin=2018-05-01&checkout=2018-05-03&rows=50&room1=A',
).replyWithData(AllHotelsDataset);

describe('All hotels query cityName', () => {
  it('should return cityName', async () => {
    const lat = 51;
    const lng = 14;
    AlgoliaMock.setNearbyCities(matchingCities, lat, lng);
    expect(
      await graphql(
        `
          query cityNameQuery($lat: Float!, $lng: Float!) {
            allAvailableHotels(
              search: {
                latitude: $lat
                longitude: $lng
                checkin: "2018-05-01"
                checkout: "2018-05-03"
                roomsConfiguration: [{ adultsCount: 1 }]
              }
            ) {
              cityName
            }
          }
        `,
        { lat, lng },
      ),
    ).toMatchSnapshot();
  });

  it('should throw an error if you query without latitude and longitude', async () => {
    expect(
      await graphql(`
        {
          allAvailableHotels(
            search: {
              cityId: "aG90ZWxDaXR5Oi0yMTQwMjA1"
              checkin: "2018-05-01"
              checkout: "2018-05-03"
              roomsConfiguration: [{ adultsCount: 1 }]
            }
          ) {
            cityName
          }
        }
      `),
    ).toMatchSnapshot();
  });
});
