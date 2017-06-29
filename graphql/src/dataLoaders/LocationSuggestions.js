// @flow

import _ from 'lodash';
import DataLoader from 'dataloader';
import config from '../../config/application';
import { get } from '../services/HttpRequest';

import type {
  Radius,
  Rectangle,
  LocationArea,
  Location,
} from '../types/Location';

type Options = {
  locale?: string,
};

export default class LocationSuggestionsDataloader {
  dataLoader: DataLoader<Object, Location[]>;

  constructor() {
    this.dataLoader = new DataLoader(
      (urlParameters: Object[]) => {
        return this.batchGetLocations(urlParameters);
      },
      {
        cacheKeyFn: key => JSON.stringify(key),
      },
    );
  }

  async load(locationKey: string, options: ?Options): Promise<Location[]> {
    return this.dataLoader.load({
      term: locationKey,
      locale: options ? options.locale : null,
    });
  }

  async loadMany(
    locationKeys: string[],
    options: ?Options,
  ): Promise<Array<Location[]>> {
    return this.dataLoader.loadMany(
      locationKeys.map(location => ({
        term: location,
        locale: options ? options.locale : null,
      })),
    );
  }

  async loadByRadius(radius: Radius, options: ?Options): Promise<Location[]> {
    return this.dataLoader.load({
      type: 'radius',
      lat: radius.lat,
      lon: radius.lng,
      radius: radius.radius,
      locale: options ? options.locale : null,
    });
  }

  async loadByArea(area: Rectangle, options: ?Options): Promise<Location[]> {
    return this.dataLoader.load({
      type: 'box',
      high_lat: area.topLeft.lat,
      low_lon: area.topLeft.lng,
      low_lat: area.bottomRight.lat,
      high_lon: area.bottomRight.lng,
      locale: options ? options.locale : null,
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
      promisesStack.push(get(config.restApiEndpoint.allLocations(parameters)));
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
