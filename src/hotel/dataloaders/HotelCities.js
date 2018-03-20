// @flow

import DataLoader from 'dataloader';
import Algolia from 'algoliasearch';
import idx from 'idx';
import stringify from 'json-stable-stringify';

import type { HotelCity } from '../types/outputs/HotelCity';

type SearchInput =
  | {|
      type: 'prefix',
      prefix: string,
    |}
  | {| type: 'latLng', lat: number, lng: number |};

export default class LocationDataLoader {
  dataLoader: DataLoader<SearchInput, HotelCity[]>;

  constructor() {
    this.dataLoader = new DataLoader(this.batchLoadCities, {
      cacheKeyFn: key => stringify(key),
    });
  }

  async batchLoadCities(inputs: $ReadOnlyArray<SearchInput>) {
    const algolia = Algolia(
      process.env.ALGOLIA_APP_ID,
      process.env.ALGOLIA_API_KEY,
    );
    const citiesIndex = algolia.initIndex('cities');

    const responses = await Promise.all(
      inputs.map(input => {
        if (input.type === 'prefix') {
          return citiesIndex.search(input.prefix);
        }
        if (input.type === 'latLng') {
          return citiesIndex.search({
            aroundLatLng: `${input.lat}, ${input.lng}`,
          });
        }
      }),
    );

    return responses.map(response => {
      const cities = idx(response, _ => _.hits) || [];
      return sanitizeHotelCities(cities);
    });
  }

  loadByPrefix(prefix: string): Promise<HotelCity[]> {
    return this.dataLoader.load({ type: 'prefix', prefix });
  }

  loadByLatLng(lat: number, lng: number): Promise<HotelCity[]> {
    return this.dataLoader.load({ type: 'latLng', lat, lng });
  }
}

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
