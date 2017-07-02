// @flow

import _ from 'lodash';
import DataLoader from 'dataloader';
import config from '../../config/application';
import request from '../services/HttpRequest';

import type {
  Radius,
  Rectangle,
  LocationArea,
  Location,
} from '../types/Location';

export default class LocationSuggestionsDataloader {
  dataLoader: DataLoader<Object, Location[]>;

  constructor() {
    this.dataLoader = new DataLoader(
      (urlParamsBatch: Object[]) => {
        return this.batchGetLocations(urlParamsBatch);
      },
      {
        cacheKeyFn: key => JSON.stringify(key),
      },
    );
  }

  async load(locationKey: string): Promise<Location[]> {
    return this.dataLoader.load({ term: locationKey });
  }

  async loadMany(locationKeys: string[]): Promise<Array<Location[]>> {
    return this.dataLoader.loadMany(
      locationKeys.map(location => ({ term: location })),
    );
  }

  async loadByRadius(radius: Radius) {
    return this.dataLoader.load({
      type: 'radius',
      lat: radius.lat,
      lon: radius.lng,
      radius: radius.radius,
    });
  }

  async loadByArea(area: Rectangle) {
    return this.dataLoader.load({
      type: 'box',
      high_lat: area.topLeft.lat,
      low_lon: area.topLeft.lng,
      low_lat: area.bottomRight.lat,
      high_lon: area.bottomRight.lng,
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
  ): Promise<Array<Location[] | Error>> {
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
      return response.locations.map((location): Location =>
        sanitizeApiResponse(location),
      );
    });
  }
}

function sanitizeApiResponse(location: Object): Location {
  return {
    locationId: location.id,
    name: location.name,
    slug: location.slug,
    timezone: location.timezone,
    location: {
      lat: _.get(location, 'location.lat', null),
      lng: _.get(location, 'location.lon', null),
    },
    type: location.type,
    city: sanitizeLocationArea(location.city),
    subdivision: sanitizeLocationArea(location.subdivision),
    country: sanitizeLocationArea(location.country),
  };
}

function sanitizeLocationArea(area: null | Object): ?LocationArea {
  return area
    ? {
        locationId: area.id,
        name: area.name,
        slug: area.slug,
      }
    : null;
}
