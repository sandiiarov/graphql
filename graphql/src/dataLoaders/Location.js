// @flow

import LocationSuggestions from './LocationSuggestions';

import type { Location } from '../types/Location';

type Options = {
  locale?: string,
};

export default class LocationDataLoader {
  locationSuggestionsDataLoader: LocationSuggestions;

  constructor(dataloader: LocationSuggestions) {
    this.locationSuggestionsDataLoader = dataloader;
  }

  async load(locationKey: string, options: ?Options): Promise<Location> {
    const possibleValues = await this.locationSuggestionsDataLoader.load(
      locationKey,
      options,
    );
    return possibleValues[0];
  }

  async loadMany(locationKeys: string[]): Promise<Location[]> {
    const allLocations = await this.locationSuggestionsDataLoader.loadMany(
      locationKeys,
    );
    return allLocations.map(possibleLocations => possibleLocations[0]);
  }
}
