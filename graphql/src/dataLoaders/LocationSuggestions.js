// @flow

import _ from 'lodash';
import DataLoader from 'dataloader';
import config from '../../config/application';
import request from '../services/HttpRequest';

import type { LocationType, LocationAreaType } from '../Entities';

export default class LocationSuggestionsDataloader {
  dataLoader: DataLoader<string, LocationType[]>;

  constructor() {
    this.dataLoader = new DataLoader((locationKeys: string[]) => {
      return this.batchGetLocations(locationKeys);
    });
  }

  async load(locationKey: string): Promise<LocationType[]> {
    return this.dataLoader.load(locationKey);
  }

  async loadMany(locationKeys: string[]): Promise<Array<LocationType[]>> {
    return this.dataLoader.loadMany(locationKeys);
  }

  /**
   * It returns array of arrays of possible locations related to the keys.
   * First array contains arrays of requested keys.
   * The inner array contains all possible values for requested key.
   *
   * Example of the response (PRG, BRQ):
   *
   * [
   *   [{ PRG fields }, { Praha fields }]
   *   [{ BRQ fields }, { Brno fields }]
   * ]
   *
   * @private
   */
  async batchGetLocations(
    locationKeys: string[],
  ): Promise<Array<Array<LocationType> | Error>> {
    const promisesStack = [];

    locationKeys.forEach(locationKey => {
      promisesStack.push(
        request(
          config.restApiEndpoint.allLocations({
            term: locationKey,
          }),
        ),
      );
    });

    const responseArray = await Promise.all(promisesStack);
    return responseArray.map((response, index) => {
      if (response.locations.length === 0) {
        return new Error(
          `Location '${locationKeys[index]}' has not been found.`,
        );
      }
      return response.locations.map((location): LocationType =>
        sanitizeApiResponse(location),
      );
    });
  }
}

function sanitizeApiResponse(location: Object): LocationType {
  return {
    locationId: location.id,
    name: location.name,
    slug: location.slug,
    timezone: location.timezone,
    location: {
      latitude: _.get(location, 'location.lat', null),
      longitude: _.get(location, 'location.lon', null),
    },
    type: location.type,
    city: sanitizeLocationArea(location.city),
    subdivision: sanitizeLocationArea(location.subdivision),
    country: sanitizeLocationArea(location.country),
  };
}

function sanitizeLocationArea(area: null | Object): ?LocationAreaType {
  return area
    ? {
        locationId: area.id,
        name: area.name,
        slug: area.slug,
      }
    : null;
}
