// @flow

import DataLoader from 'dataloader';
import { DateTime } from 'luxon';

import { get } from '../services/HttpRequest';
import { ProxiedError } from '../services/errors/ProxiedError';
import Config from '../../config/application';

import type { HotelRoomType, HotelFacilityType } from './SingleHotel';

type RoomsConfiguration = Array<{|
  adultsCount: number,
  children?: Array<{|
    age: number,
  |}>,
|}>;

/**
 * Required parameters by this dataloader.
 */
export type RequiredParameters = {|
  latitude: number,
  longitude: number,
  checkin: Date,
  checkout: Date,
  roomsConfiguration: RoomsConfiguration,
|};

/**
 * Sanitized shape of single hotel returned by API.
 */
export type HotelType = {
  id: string,
  currencyCode: string,
  price: string, // float
  photoUrl: string,
  whitelabelUrl: string,
  cityName: string,
  // fields bellow are additionally provided by "single hotels" API endpoint
  facilities: null | HotelFacilityType[],
  rooms: null | HotelRoomType[],
};

export default new DataLoader((keys: RequiredParameters[]) =>
  fetchAllHotels(keys),
);

/**
 * Minimal valid query:
 * https://hotels-api.skypicker.com/api/hotels?latitude=45.4654219&longitude=9.1859243&radius=50&checkin=2017-11-16&checkout=2017-11-23&room1=A
 *
 * Parameters explained:
 * - room1: "A" represents an adult and an integer represents a child. eg
 *          room1=A,A,4 would be a room with 2 adults and 1 four year-old child.
 *          Child age numbers are 0..17.
 * - room2: see room1 (it's the same but other room, room3, room4, ...)
 */
function fetchAllHotels(
  keys: RequiredParameters[],
): Promise<Array<Error | HotelType[]>> {
  return Promise.all(
    keys.map(
      async ({
        latitude,
        longitude,
        checkin,
        checkout,
        roomsConfiguration,
      }) => {
        const radius = '50'; // not configurable yet (but required)
        const roomsQuery = Object.assign(
          {},
          ...formatRoomsConfigurationForAPI(
            roomsConfiguration,
          ).map((configuration, index) => ({
            [`room${index + 1}`]: configuration,
          })),
        );

        checkin = DateTime.fromJSDate(checkin, {
          zone: 'UTC',
        }).toISODate();
        checkout = DateTime.fromJSDate(checkout, {
          zone: 'UTC',
        }).toISODate();

        const absoluteUrl = Config.restApiEndpoint.hotels.all({
          latitude,
          longitude,
          radius,
          checkin,
          checkout,
          ...roomsQuery,
        });

        const response = await get(absoluteUrl);
        if (response.message) {
          return new ProxiedError(response.message, response.code, absoluteUrl);
        }

        return sanitizeHotels(response.hotels);
      },
    ),
  );
}

function sanitizeHotels(hotels) {
  return hotels.map(hotel => ({
    id: hotel.hotel_id,
    currencyCode: hotel.hotel_currency_code,
    price: hotel.price,
    photoUrl: hotel.photo,
    whitelabelUrl: hotel.url,
    cityName: hotel.city,
  }));
}

/**
 * Returns array with rooms configuration:
 *
 * ['A,A,4,6', 'A,2']
 */
export function formatRoomsConfigurationForAPI(
  roomsConfiguration: RoomsConfiguration,
): string[] {
  return roomsConfiguration.map(roomConfiguration => {
    const children = roomConfiguration.children || []; // children are optional
    return new Array(roomConfiguration.adultsCount)
      .fill('A')
      .concat(
        children.map(({ age }) => {
          if (age >= 0 && age <= 17) {
            return age;
          }
          return 'A';
        }),
      )
      .join(',');
  });
}
