// @flow

import LocationSuggestions from './LocationSuggestions';

import type { Location } from '../types/Location';

export default class LocationDataLoader {
  locationSuggestionsDataLoader: LocationSuggestions;

  constructor(dataloader: LocationSuggestions) {
    this.locationSuggestionsDataLoader = dataloader;
  }

  async load(locationKey: string): Promise<Location> {
    const possibleValues = await this.locationSuggestionsDataLoader.load(
      locationKey,
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
