// @flow

import DataLoader from 'dataloader';
import { DateTime } from 'luxon';

import { get } from '../../common/services/HttpRequest';
import config from '../../../config/application';
import LocationDataLoader from '../../location/dataloaders/Location';
import LocationsDataLoader from '../../location/dataloaders/Locations';
import LocaleMap from '../../common/types/enums/LocaleMap';

import type { Flight } from '../Flight';
import type { LocationVariants, RadiusLocation } from '../../location/Location';

type Duration = {|
  maxFlightDuration: null | number,
  stopovers: null | { from: ?number, to: ?number },
|};

type Filters = {|
  maxStopovers: null | number,
  duration: null | Duration,
|};

type QueryParameters = {|
  from: Array<LocationVariants>,
  to: Array<LocationVariants>,
  dateFrom: Date,
  dateTo: Date,
  returnFrom: null | Date,
  returnTo: null | Date,
  typeFlight: 'return' | 'oneway',
  currency: null | string,
  adults: null | number,
  locale: null | string,
  filters: null | Filters,
|};

type BackendAPIResponse = {|
  currency: string,
  data: Flight[],
|};

export default class FlightDataloader {
  flightDataLoader: DataLoader<QueryParameters, BackendAPIResponse>;
  locationDataLoader: LocationDataLoader;
  locationsDataLoader: LocationsDataLoader;

  constructor(
    locationDataLoader: LocationDataLoader,
    locationsDataLoader: LocationsDataLoader,
  ) {
    this.locationsDataLoader = locationsDataLoader;
    this.flightDataLoader = new DataLoader(
      (searchParameters: $ReadOnlyArray<QueryParameters>) => {
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
    searchParameters: $ReadOnlyArray<QueryParameters>,
  ): Promise<Array<BackendAPIResponse>> {
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
      returnFrom,
      returnTo,
      typeFlight,
      currency,
      adults,
      locale,
      filters,
    } = searchParameters;

    const parameters: Object = {
      flyFrom: this._normalizeLocations(from),
      to: this._normalizeLocations(to),
      dateFrom: this._formatDateForApi(dateFrom),
      dateTo: this._formatDateForApi(dateTo),
      ...(returnFrom && {
        returnFrom: this._formatDateForApi(returnFrom),
      }),
      ...(returnTo && {
        returnTo: this._formatDateForApi(returnTo),
      }),
      ...(typeFlight && {
        typeFlight: typeFlight,
      }),
    };
    if (currency !== null) {
      parameters.curr = currency;
    }
    if (adults !== null) {
      parameters.adults = adults;
    }
    if (locale !== null) {
      parameters.locale = LocaleMap[locale];
    }
    if (filters) {
      if (filters.maxStopovers !== null) {
        parameters.maxStopovers = filters.maxStopovers;
      }
      if (filters.duration) {
        const duration = filters.duration;
        if (duration.maxFlightDuration !== null) {
          parameters.maxFlyDuration = duration.maxFlightDuration;
        }
        if (duration.stopovers && duration.stopovers.from !== null) {
          parameters.stopoverfrom = duration.stopovers.from;
        }
        if (duration.stopovers && duration.stopovers.to !== null) {
          parameters.stopoverto = duration.stopovers.to;
        }
      }
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

  /**
   * Input dates should be in UTC. This method changes the date format
   * to be compatible with underlying API. It keeps the same timezone (UTC)
   * and ignores local timezone. So no matter where you run this code
   * it should always work as expected (returns the same date in different format).
   */
  _formatDateForApi = (date: Date): string =>
    DateTime.fromJSDate(date, { zone: 'utc' }).toFormat(
      'dd/LL/yyyy', // http://moment.github.io/luxon/docs/manual/usage/formatting.html
    );

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
      return this.locationsDataLoader
        .loadByTerm(location.location, options)
        .then(possibleValues => possibleValues[0].locationId); // eslint-disable-line promise/prefer-await-to-then
    });
    return Promise.all(normalizedLocations);
  }

  _stringifyRadius({ radius }: RadiusLocation): string {
    const lat = Math.round(radius.lat * 100) / 100;
    const lng = Math.round(radius.lng * 100) / 100;
    const distance = Math.round(radius.radius);
    return `${lat}-${lng}-${distance}km`;
  }
}
