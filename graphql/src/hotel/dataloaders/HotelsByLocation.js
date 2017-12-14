// @flow

import DataLoader from 'dataloader';
import { DateTime } from 'luxon';

import { get } from '../../common/services/HttpRequest';
import { ProxiedError } from '../../common/services/errors/ProxiedError';
import Config from '../../../config/application';

import type { HotelType } from './flow/HotelType';

export type SearchParameters = {|
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
 * This data-loader loads all available hotels in the checkin-checkout date range.
 * If you need to load individual hotels based on IDs please use "HotelByID" loader.
 */
export default new DataLoader(
  async (keys: SearchParameters[]): Promise<Array<HotelType[] | Error>> =>
    await fetchAllHotels(keys),
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
async function fetchAllHotels(
  keys: SearchParameters[],
): Promise<Array<HotelType[] | Error>> {
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

        // $FlowIssue: https://github.com/facebook/flow/issues/4936
        return sanitizeHotels(response.hotels);
      },
    ),
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
