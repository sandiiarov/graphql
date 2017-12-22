// @flow

import Dataloader from 'dataloader';

import { get } from '../../common/services/HttpRequest';
import { queryWithParameters } from '../../../config/application';

import type { HotelCity } from '../types/outputs/HotelCity';

/**
 * Loads all cities by prefix (suggestions). Returned cities are sorted
 * by number of hotels and by alphabet (if two cities have the same number)
 * of hotels. Prefix must be longer or equal 3 characters.
 *
 * https://hotels-api.skypicker.com/api/cities?prefix=pra
 */
export default new Dataloader(async (prefixes: string[]): Promise<
  Array<HotelCity[] | Error>,
> => {
  const citiesCollection = await Promise.all(
    prefixes.map(
      prefix =>
        (get(
          queryWithParameters('https://hotels-api.skypicker.com/api/cities', {
            prefix: prefix,
          }),
        ): Promise<ApiResponse>),
    ),
  );

  return citiesCollection.map(cities => {
    if (cities instanceof Array) {
      return sanitizeHotelCities(cities);
    } else {
      return [];
    }
  });
});

export function sanitizeHotelCities(
  cities: ValidResponse | NoResultResponse,
): HotelCity[] {
  return cities
    .map(city => ({
      id: String(city.city_id),
      name: city.name,
      location: {
        lat: Number(city.location.latitude),
        lng: Number(city.location.longitude),
      },
      numberOfHotels: city.nr_hotels,
    }))
    .sort((left, right) => {
      const hotelsSort = right.numberOfHotels - left.numberOfHotels;
      if (hotelsSort === 0) {
        return left.name.localeCompare(right.name);
      }
      return hotelsSort;
    });
}

type ApiResponse = ValidResponse | ErrorResponse | NoResultResponse;

type ValidResponse = Array<{|
  translations: Array<{|
    language: string,
    name: string,
  |}>,
  location: {|
    latitude: string,
    longitude: string,
  |},
  name: string,
  country: string,
  nr_hotels: number,
  city_id: number,
|}>;
type NoResultResponse = [];
type ErrorResponse = {|
  error: string,
|};
