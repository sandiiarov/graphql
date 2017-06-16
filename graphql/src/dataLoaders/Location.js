// @flow

import LocationSuggestions from './LocationSuggestions';

import type { LocationType } from '../Entities';

export default class LocationDataLoader {
  locationSuggestionsDataLoader: LocationSuggestions;

  constructor(dataloader: LocationSuggestions) {
    this.locationSuggestionsDataLoader = dataloader;
  }

  async load(locationKey: string): Promise<LocationType> {
    const possibleValues = await this.locationSuggestionsDataLoader.load(
      locationKey,
    );
    return possibleValues[0];
  }

  async loadMany(locationKeys: string[]): Promise<LocationType[]> {
    const allLocations = await this.locationSuggestionsDataLoader.loadMany(
      locationKeys,
    );
    return allLocations.map(possibleLocations => possibleLocations[0]);
  }
}
