// @flow

import { GraphQLNonNull } from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
} from 'graphql-relay';
import dateFns from 'date-fns';
import request from '../services/HttpRequest';
import config from '../../config/application';
import GraphQLFlight from '../types/Flight';
import FlightsSearchInput from '../types/FlightsSearchInput';
import FlightsOptionsInput from '../types/FlightsOptionsInput';
import { formatString } from './location/ArgumentSanitizer';
import { sanitizeApiResponse } from './flight/ApiSanitizer';
import { sanitizeLocationsForRequest } from './location/LocationsSanitizer';
import { validateDates } from '../resolvers/FlightDatesValidator';

import type { GraphqlContextType } from '../services/GraphqlContext';

const { connectionType: AllFlightsConnection } = connectionDefinitions({
  nodeType: GraphQLFlight,
});

export default {
  type: AllFlightsConnection,
  description: 'Search for scheduled flights.',
  args: {
    search: {
      type: new GraphQLNonNull(FlightsSearchInput),
    },
    options: {
      type: FlightsOptionsInput,
    },
    ...connectionArgs,
  },
  resolve: async (
    ancestor: mixed,
    args: Object,
    context: GraphqlContextType,
  ) => {
    const { from, to, dateFrom, dateTo } = args.search;
    validateDates(dateFrom, dateTo);

    let allFlights = await requestFlights({
      ...args.search,
      from: from.map(location => formatString(location)).toString(),
      to: to.map(location => formatString(location)).toString(),
      options: args.options,
    });

    // Use location fallback when flights returns no results
    if (!allFlights.data.length) {
      const [fromLocations, toLocations] = await sanitizeLocationsForRequest(
        from,
        to,
        context.dataLoader.location,
      );

      allFlights = await requestFlights({
        ...args.search,
        from: fromLocations.toString(),
        to: toLocations.toString(),
        options: args.options,
      });
    }

    return connectionFromArray(
      allFlights.data.map(flight =>
        sanitizeApiResponse(flight, allFlights.currency),
      ),
      args,
    );
  },
};

function requestFlights(search): Promise<Object> {
  const { from, to, dateFrom, dateTo, options, passengers } = search;

  return request(
    config.restApiEndpoint.allFlights({
      flyFrom: from,
      to: to,
      dateFrom: dateFrom.exact
        ? dateFns.format(dateFrom.exact, 'DD/MM/YYYY')
        : null,
      dateTo: dateTo.exact ? dateFns.format(dateTo.exact, 'DD/MM/YYYY') : null,
      daysInDestinationFrom: dateTo.timeToStay ? dateTo.timeToStay.from : null,
      daysInDestinationTo: dateTo.timeToStay ? dateTo.timeToStay.to : null,
      curr: options ? options.currency : null,
      adults: passengers ? passengers.adults : null,
    }),
  );
}
