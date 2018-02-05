// @flow

import _ from 'lodash';
import DataLoader from 'dataloader';

import { get } from '../services/BookingComRequest';
import { queryWithParameters } from '../../../config/application';
import {
  prepareRequestParameters,
  prepareRoomsRequestParameters,
} from '../services/ParametersFormatter';

import type { HotelType } from './flow/HotelType';
import type { SearchParameters } from './flow/SearchParameters';

/**
 * This data-loader loads all available hotels in the specified
 * configuration (checkin, checkout, rooms configuration). You can
 * load hotels by their ID, city ID or by location (lng/lat/rad).
 */
export default new DataLoader(
  async (keys: $ReadOnlyArray<SearchParameters>): Promise<Array<HotelType[]>> =>
    await fetchAllHotels(keys),
);

/**
 * Minimal valid query (lng/lat/rad):
 * https://distribution-xml.booking.com/2.0/json/hotelAvailability?latitude=45.4654219&longitude=9.1859243&radius=50&checkin=2018-11-16&checkout=2018-11-23&room1=A
 *
 * Minimal valid query (hotel_ids):
 * https://distribution-xml.booking.com/2.0/json/hotelAvailability?checkin=2018-04-07&checkout=2018-04-08&city_ids=-1565670&room1=A,A&extras=room_details,hotel_details
 *
 * Parameters explained:
 * - room1: "A" represents an adult and an integer represents a child. eg
 *          room1=A,A,4 would be a room with 2 adults and 1 four year-old child.
 *          Child age numbers are 0..17.
 * - room2: see room1 (it's the same but other room, room3, room4, ...)
 */
async function fetchAllHotels(
  keys: $ReadOnlyArray<SearchParameters>,
): Promise<Array<HotelType[]>> {
  return Promise.all(
    keys.map(async searchParameters => {
      const parameters = prepareRequestParameters(searchParameters);
      const absoluteUrl = queryWithParameters(
        'https://distribution-xml.booking.com/2.0/json/hotelAvailability',
        {
          extras: 'hotel_details',
          order_by: 'popularity',
          ...parameters,
          ...prepareRoomsRequestParameters(searchParameters.roomsConfiguration),
        },
      );

      const response = await get(absoluteUrl);

      // $FlowIssue: https://github.com/facebook/flow/issues/4936
      return sanitizeHotels(response.result, searchParameters);
    }),
  );
}

function sanitizeHotels(hotels, searchParameters): HotelType[] {
  return hotels.map(hotel => ({
    id: hotel.hotel_id,
    name: hotel.hotel_name,
    rating: Math.round(hotel.stars),
    currencyCode: _.get(
      searchParameters,
      'currency',
      hotel.hotel_currency_code,
    ),
    price: hotel.price,
    whitelabelUrl: hotel.url,
    cityName: hotel.city,
    cityId: hotel.city_id,
    address: {
      street: hotel.address,
      city: hotel.city,
      zip: hotel.postcode,
    },
  }));
}
