// @flow

import {
  graphql,
  BookingComApiMock,
} from '../../../common/services/TestingTools';
import AllHotelsDataset from '../../datasets/all.json';

beforeEach(() => {
  BookingComApiMock.onGet(
    'https://distribution-xml.booking.com/2.0/json/hotelAvailability?extras=hotel_details&order_by=popularity&radius=50&latitude=51.5&longitude=0&checkin=2017-11-16&checkout=2017-11-23&rows=2&hotel_facilities=airport_shuttle%2Cfamily_rooms%2Cfacilities_for_disabled%2Cfitness_room%2Cprivate_parking%2Cfree_parking%2Cvalet_parking%2Cswimmingpool_indoor%2Cpets_allowed%2Cspa_wellness_centre%2Cfree_wifi_internet_access_included&room1=A',
  ).replyWithData(AllHotelsDataset);
  BookingComApiMock.onGet(
    'https://distribution-xml.booking.com/2.0/json/hotelAvailability?extras=hotel_details&order_by=popularity&radius=50&latitude=51.5&longitude=0&checkin=2017-11-16&checkout=2017-11-23&rows=2&room1=A',
  ).replyWithData(AllHotelsDataset);
});

describe('all hotels query', () => {
  it('hotel facilities should be included in url', async () => {
    expect(
      await graphql(`
        {
          allAvailableHotels(
            search: {
              latitude: 51.5
              longitude: 0
              checkin: "2017-11-16"
              checkout: "2017-11-23"
              roomsConfiguration: [{ adultsCount: 1 }]
            }
            filter: {
              hotelFacilities: {
                airportShuttle: true
                familyRooms: true
                facilitiesForDisabled: true
                fitnessCenter: true
                parking: true
                freeParking: true
                valetParking: true
                indoorPool: true
                petsAllowed: true
                spa: true
                wifi: true
              }
            }
            first: 2
          ) {
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

  it('hotel facilities should not be included in url', async () => {
    expect(
      await graphql(`
        {
          allAvailableHotels(
            search: {
              latitude: 51.5
              longitude: 0
              checkin: "2017-11-16"
              checkout: "2017-11-23"
              roomsConfiguration: [{ adultsCount: 1 }]
            }
            filter: {
              hotelFacilities: { airportShuttle: false, familyRooms: false }
            }
            first: 2
          ) {
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
