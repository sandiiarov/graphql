// @flow

import DataLoader from 'dataloader';
import stringify from 'json-stable-stringify';

import LocationSuggestions from './LocationSuggestions';
import { batchGetLocations } from './Fetcher';

import type { Location, Options } from '../Location';

export default class LocationDataLoader {
  locationSuggestionsDataLoader: LocationSuggestions;
  dataLoader: DataLoader<Object, Location[] | Error>;

  constructor(dataloader: LocationSuggestions) {
    this.locationSuggestionsDataLoader = dataloader;
    this.dataLoader = new DataLoader(
      (urlParameters: $ReadOnlyArray<Object>) => {
        return batchGetLocations(urlParameters);
      },
      {
        cacheKeyFn: key => stringify(key),
      },
    );
  }

  /**
   * Returns single location suggestion based on single location key.
   */
  async load(locationKey: string, options: ?Options): Promise<Location> {
    const possibleValues = await this.locationSuggestionsDataLoader.loadByKey(
      locationKey,
      options,
    );
    if (possibleValues instanceof Error) {
      throw possibleValues;
    }
    return possibleValues[0];
  }

  /**
   * Returns single location suggestion for each location key.
   */
  async loadMany(locationKeys: string[]): Promise<Location[]> {
    const allLocations = await this.locationSuggestionsDataLoader.loadMany(
      locationKeys,
    );
    return allLocations.map(possibleLocations => {
      if (possibleLocations instanceof Error) {
        throw possibleLocations;
      }
      return possibleLocations[0];
    });
  }

  async loadById(id: String, locale?: String): Promise<Location> {
    const possibleValues = await this.dataLoader.load({
      type: 'id',
      id,
      locale,
    });
    if (possibleValues instanceof Error) {
      throw possibleValues;
    }
    return possibleValues[0];
  }
}
