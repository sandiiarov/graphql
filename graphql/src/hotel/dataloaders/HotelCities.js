// @flow

import Dataloader from 'dataloader';
import Algolia from 'algoliasearch';
import _ from 'lodash';

import type { HotelCity } from '../types/outputs/HotelCity';

/**
 * Loads all cities by prefix (suggestions). Returned cities are sorted
 * by number of hotels and by alphabet (if two cities have the same number)
 * of hotels.
 */
export default new Dataloader(async (prefixes: $ReadOnlyArray<string>): Promise<
  Array<HotelCity[]>,
> => {
  const algolia = Algolia(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_API_KEY,
  );
  const citiesIndex = algolia.initIndex('cities');

  const responses = await Promise.all(
    prefixes.map(prefix => citiesIndex.search(prefix)),
  );

  return responses.map(response => {
    const cities = _.get(response, 'hits', []);
    return sanitizeHotelCities(cities);
  });
});

export function sanitizeHotelCities(cities: ValidResponse): HotelCity[] {
  return cities.map(city => ({
    id: String(city.city_id),
    name: city.name,
    location: {
      lat: Number(city.location.latitude),
      lng: Number(city.location.longitude),
    },
    numberOfHotels: city.nr_hotels,
  }));
}

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
