// @flow

import DataLoader from 'dataloader';
import dateFns from 'date-fns';
import _ from 'lodash';

import { get } from '../services/HttpRequest';
import config from '../../config/application';
import LocationDataLoader from '../dataLoaders/Location';
import localeMap from '../inputs/LocaleMap';

import type { Flight } from '../types/Flight';
import type { LocationVariants, RadiusLocation } from '../types/Location';

type QueryParameters = {|
  from: Array<LocationVariants>,
  to: Array<LocationVariants>,
  dateFrom: null | Date,
  dateTo: null | Date,
  daysInDestinationFrom: null | number,
  daysInDestinationTo: null | number,
  currency: null | string,
  adults: null | number,
  locale: null | string,
|};

type BackendAPIResponse = {|
  currency: string,
  data: Flight[],
|};

export default class FlightDataloader {
  flightDataLoader: DataLoader<QueryParameters, BackendAPIResponse>;
  locationDataLoader: LocationDataLoader;

  constructor(locationDataLoader: LocationDataLoader) {
    this.flightDataLoader = new DataLoader(
      (searchParameters: QueryParameters[]) => {
        return this.batchGetLocations(searchParameters);
      },
      {
        cacheKeyFn: key => {
          return JSON.stringify(key);
        },
      },
    );
    this.locationDataLoader = locationDataLoader;
  }

  async load(searchParameters: QueryParameters): Promise<BackendAPIResponse> {
    return this.flightDataLoader.load(searchParameters);
  }

  async loadMany(
    searchParameters: QueryParameters[],
  ): Promise<BackendAPIResponse[]> {
    return this.flightDataLoader.loadMany(searchParameters);
  }

  async batchGetLocations(
    searchParameters: QueryParameters[],
  ): Promise<Array<BackendAPIResponse | Error>> {
    return await Promise.all(
      searchParameters.map(searchParameters =>
        this._fetchFlights(searchParameters),
      ),
    );
  }

  async _fetchFlights(searchParameters: QueryParameters) {
    const {
      from,
      to,
      dateFrom,
      dateTo,
      daysInDestinationFrom,
      daysInDestinationTo,
      currency,
      adults,
      locale,
    } = searchParameters;
    // see: https://github.com/tc39/proposal-object-rest-spread/issues/45
    const parameters = {
      flyFrom: this._normalizeLocations(from),
      to: this._normalizeLocations(to),
      ...(dateFrom && {
        dateFrom: dateFns.format(dateFrom, 'DD/MM/YYYY'),
      }),
      ...(dateTo && {
        dateTo: dateFns.format(dateTo, 'DD/MM/YYYY'),
      }),
    };
    if (daysInDestinationFrom !== null) {
      parameters.daysInDestinationFrom = daysInDestinationFrom;
    }
    if (daysInDestinationTo !== null) {
      parameters.daysInDestinationTo = daysInDestinationTo;
    }
    if (currency !== null) {
      parameters.curr = currency;
    }
    if (adults !== null) {
      parameters.adults = adults;
    }
    if (locale !== null) {
      parameters.locale = localeMap[locale];
    }

    const firstTry = await get(config.restApiEndpoint.allFlights(parameters));
    if (firstTry.data.length > 0) {
      return firstTry;
    }

    const [flyFrom, flyTo] = await Promise.all([
      this._normalizeLocationsUsingRefetch(from, locale),
      this._normalizeLocationsUsingRefetch(to, locale),
    ]);
    parameters.flyFrom = flyFrom;
    parameters.to = flyTo;
    return get(config.restApiEndpoint.allFlights(parameters));
  }

  _normalizeLocations(locations: LocationVariants[]): string[] {
    return locations.map(location => {
      if (location.location !== undefined) {
        return location.location;
      } else {
        return this._stringifyRadius(location);
      }
    });
  }

  async _normalizeLocationsUsingRefetch(
    locations: LocationVariants[],
    locale: null | string,
  ) {
    const options = locale !== null ? { locale } : {};
    const normalizedLocations = locations.map(location => {
      if (location.location === undefined) {
        return Promise.resolve(this._stringifyRadius(location));
      }
      // adjust exact location using backend location API
      return this.locationDataLoader
        .load(location.location, options)
        .then(newLocation => newLocation.locationId); // eslint-disable-line promise/prefer-await-to-then
    });
    return Promise.all(normalizedLocations);
  }

  _stringifyRadius({ radius }: RadiusLocation): string {
    const lat = _.round(radius.lat, 2);
    const lng = _.round(radius.lng, 2);
    const distance = _.round(radius.radius, 0);
    return `${lat}-${lng}-${distance}km`;
  }
}
