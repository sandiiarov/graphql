// @flow

import _ from 'lodash';
import DataLoader from 'dataloader';
import config from '../../../config/application';
import { get } from '../../common/services/HttpRequest';

import type {
  Radius,
  Rectangle,
  LocationArea,
  Location,
  Options,
} from '../Location';

export default class LocationSuggestionsDataloader {
  dataLoader: DataLoader<Object, Location[] | Error>;

  constructor() {
    this.dataLoader = new DataLoader(
      (urlParameters: $ReadOnlyArray<Object>) => {
        return this.batchGetLocations(urlParameters);
      },
      {
        cacheKeyFn: key => JSON.stringify(key),
      },
    );
  }

  async load(options: ?Options): Promise<Location[] | Error> {
    return this.dataLoader.load({
      type: 'dump',
      limit: 9999,
      ...sanitizeOptions(options),
    });
  }

  /**
   * Returns single set of multiple suggestions for single location key.
   * If you need to load only one (the first) location for location key
   * you have to use 'LocationDataLoader.load' function.
   */
  async loadByKey(
    locationKey: string,
    options: ?Options,
  ): Promise<Location[] | Error> {
    return this.dataLoader.load({
      term: locationKey,
      ...sanitizeOptions(options),
    });
  }

  async loadByRadius(
    radius: Radius,
    options: ?Options,
  ): Promise<Location[] | Error> {
    return this.dataLoader.load({
      type: 'radius',
      lat: radius.lat,
      lon: radius.lng,
      radius: radius.radius,
      ...sanitizeOptions(options),
    });
  }

  async loadByArea(
    area: Rectangle,
    options: ?Options,
  ): Promise<Location[] | Error> {
    return this.dataLoader.load({
      type: 'box',
      high_lat: area.topLeft.lat,
      low_lon: area.topLeft.lng,
      low_lat: area.bottomRight.lat,
      high_lon: area.bottomRight.lng,
      ...sanitizeOptions(options),
    });
  }

  /**
   * Returns set of suggestions for multiple places (array of arrays of
   * possible locations related to the keys).
   */
  async loadMany(
    locationKeys: string[],
    options: ?Options,
  ): Promise<Array<Location[] | Error>> {
    return this.dataLoader.loadMany(
      locationKeys.map(location => ({
        term: location,
        ...sanitizeOptions(options),
      })),
    );
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
    urlParameters: $ReadOnlyArray<Object>,
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
    isActive: location.active,
    stationsCount: location.stations,
    airportsCount: location.airports,
    alternativeNames: location.alternative_names,
    autonomousTerritory: sanitizeLocationArea(location.autonomous_territory),
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

function sanitizeOptions(options: ?Options): Object {
  if (!options) return {};
  return {
    locale: options.locale,
    location_types: options.locationType,
  };
}