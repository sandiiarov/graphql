// @flow

import _ from 'lodash';
import DataLoader from 'dataloader';
import config from '../../config/application';
import request from '../services/HttpRequest';

import type { LocationType, LocationAreaType, RadiusType } from '../Entities';

export default class LocationSuggestionsDataloader {
  dataLoader: DataLoader<Object, LocationType[]>;

  constructor() {
    this.dataLoader = new DataLoader((urlParamsBatch: Object[]) => {
      return this.batchGetLocations(urlParamsBatch);
    });
  }

  async load(locationKey: string): Promise<LocationType[]> {
    return this.dataLoader.load({ term: locationKey });
  }

  async loadMany(locationKeys: string[]): Promise<Array<LocationType[]>> {
    return this.dataLoader.loadMany(
      locationKeys.map(location => ({ term: location })),
    );
  }

  async loadByRadius(radius: RadiusType) {
    return this.dataLoader.load({
      type: 'radius',
      lat: radius.lat,
      lon: radius.lng,
      radius: radius.radius,
    });
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
    urlParameters: Object[],
  ): Promise<Array<LocationType[] | Error>> {
    const promisesStack = [];

    urlParameters.forEach(parameters => {
      promisesStack.push(
        request(config.restApiEndpoint.allLocations(parameters)),
      );
    });

    const responseArray = await Promise.all(promisesStack);
    return responseArray.map(response => {
      if (response.locations.length === 0) {
        return new Error(`Location has not been found.`);
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
