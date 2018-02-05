// @flow

import LocationSuggestions from './LocationSuggestions';

import type { Location, Options } from '../Location';

export default class LocationDataLoader {
  locationSuggestionsDataLoader: LocationSuggestions;

  constructor(dataloader: LocationSuggestions) {
    this.locationSuggestionsDataLoader = dataloader;
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
}
