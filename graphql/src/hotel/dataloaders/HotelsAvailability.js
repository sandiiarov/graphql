// @flow

import DataLoader from 'dataloader';
import { DateTime } from 'luxon';

import { get } from '../../common/services/HttpRequest';
import { ProxiedError } from '../../common/services/errors/ProxiedError';
import Config from '../../../config/application';

import type { HotelType } from './flow/HotelType';

export type SearchParameters =
  | {|
      hotelId: string,
      checkin: Date,
      checkout: Date,
      roomsConfiguration: RoomsConfiguration,
    |}
  | {|
      latitude: number,
      longitude: number,
      checkin: Date,
      checkout: Date,
      roomsConfiguration: RoomsConfiguration,
    |};

type RoomsConfiguration = Array<{|
  adultsCount: number,
  children?: Array<{|
    age: number,
  |}>,
|}>;

/**
 * This data-loader loads all available hotels in the specified
 * configuration (checkin, checkout, rooms configuration). You can
 * load hotels by their ID or in location (lng/lat/rad).
 */
export default new DataLoader(
  async (keys: SearchParameters[]): Promise<Array<HotelType[] | Error>> =>
    await fetchAllHotels(keys),
);

/**
 * Minimal valid query (lng/lat/rad):
 * https://hotels-api.skypicker.com/api/hotels?latitude=45.4654219&longitude=9.1859243&radius=50&checkin=2018-11-16&checkout=2018-11-23&room1=A
 *
 * Minimal valid query (hotel_ids):
 * https://hotels-api.skypicker.com/api/hotels?checkin=2018-11-16&checkout=2018-11-23&room1=A&hotel_ids=2906934
 *
 * Parameters explained:
 * - room1: "A" represents an adult and an integer represents a child. eg
 *          room1=A,A,4 would be a room with 2 adults and 1 four year-old child.
 *          Child age numbers are 0..17.
 * - room2: see room1 (it's the same but other room, room3, room4, ...)
 */
async function fetchAllHotels(
  keys: SearchParameters[],
): Promise<Array<HotelType[] | Error>> {
  return Promise.all(
    keys.map(async searchParameters => {
      const parameters = {};

      if (searchParameters.hotelId) {
        // search by hotel ID
        parameters.hotel_ids = searchParameters.hotelId;
      } else if (searchParameters.latitude) {
        // search by lng/lat/rad
        parameters.radius = '50'; // not configurable yet (but required)
        parameters.latitude = searchParameters.latitude;
        parameters.longitude = searchParameters.longitude;
      }

      const roomsQuery = Object.assign(
        {},
        ...formatRoomsConfigurationForAPI(
          searchParameters.roomsConfiguration,
        ).map((configuration, index) => ({
          [`room${index + 1}`]: configuration,
        })),
      );

      parameters.checkin = DateTime.fromJSDate(searchParameters.checkin, {
        zone: 'UTC',
      }).toISODate();
      parameters.checkout = DateTime.fromJSDate(searchParameters.checkout, {
        zone: 'UTC',
      }).toISODate();

      const absoluteUrl = Config.restApiEndpoint.hotels.all({
        ...parameters,
        ...roomsQuery,
      });

      const response = await get(absoluteUrl);
      if (response.message) {
        return new ProxiedError(response.message, response.code, absoluteUrl);
      }

      // $FlowIssue: https://github.com/facebook/flow/issues/4936
      return sanitizeHotels(response.hotels);
    }),
  );
}

function sanitizeHotels(hotels): HotelType[] {
  return hotels.map(hotel => ({
    id: hotel.hotel_id,
    name: hotel.hotel_name,
    rating: Math.round(hotel.stars),
    currencyCode: hotel.hotel_currency_code,
    price: hotel.price,
    whitelabelUrl: hotel.url,
    cityName: hotel.city,
    address: {
      street: hotel.address,
      city: hotel.city,
      zip: hotel.postcode,
    },
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
