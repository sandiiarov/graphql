// @flow

import dateFns from 'date-fns';
import config from '../../../config/application';
import request from '../../services/HttpRequest';

/**
 * When AllFlights returns no value due to wrong from-to arguments
 * (v3 allows to use codes ony) fetch locations with from-to values
 * and use first location in new AllFlights request.
 */
export async function fetchFlightsFallback(args: Object) {
  const { from, to } = await fetchLocationIds(args.search.from, args.search.to);

  return request(
    config.restApiEndpoint.allFlights({
      flyFrom: from,
      to: to,
      dateFrom: dateFns.format(new Date(args.search.dateFrom), 'DD/MM/YYYY'),
      dateTo: dateFns.format(new Date(args.search.dateTo), 'DD/MM/YYYY'),
    }),
  );
}

async function fetchLocationIds(from: string, to: string) {
  const [locationsFrom, locationsTo] = await Promise.all([
    // Location from
    request(
      config.restApiEndpoint.allLocations({
        term: from,
      }),
    ),
    // Location to
    request(
      config.restApiEndpoint.allLocations({
        term: to,
      }),
    ),
  ]);

  if (locationsFrom.locations.length === 0) {
    throw new Error(`Origin '${from}' has not been found.`);
  } else if (locationsTo.locations.length === 0) {
    throw new Error(`Destination '${to}' has not been found.`);
  }

  return {
    from: locationsFrom.locations[0].id,
    to: locationsTo.locations[0].id,
  };
}
