// @flow

import compareAsc from 'date-fns/compare_asc';
import { GraphQLNonNull } from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
} from 'graphql-relay';
import dateFns from 'date-fns';
import _ from 'lodash';
import request from '../services/HttpRequest';
import config from '../../config/application';
import GraphQLFlight from '../types/Flight';
import FlightsSearchInput from '../types/FlightsSearchInput';
import FlightsOptionsInput from '../types/FlightsOptionsInput';
import { formatString } from './location/ArgumentSanitizer';
import { sanitizeApiResponse } from './flight/ApiSanitizer';
import { sanitizeLocationsForRequest } from './location/LocationsSanitizer';

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
    const { from, to, dateFrom, dateTo, passengers } = args.search;
    const currency = _.get(args, 'options.currency');

    validateDates(dateFrom, dateTo);

    let allFlights = await requestFlights(
      from.map(location => formatString(location)).toString(),
      to.map(location => formatString(location)).toString(),
      new Date(dateFrom),
      new Date(dateTo),
      passengers,
      currency,
    );

    // Use location fallback when flights returns no results
    if (!allFlights.data.length) {
      const [fromLocations, toLocations] = await sanitizeLocationsForRequest(
        from,
        to,
        context.dataLoader.location,
      );

      allFlights = await requestFlights(
        fromLocations.toString(),
        toLocations.toString(),
        new Date(dateFrom),
        new Date(dateTo),
        passengers,
        currency,
      );
    }

    return connectionFromArray(
      allFlights.data.map(flight =>
        sanitizeApiResponse(flight, allFlights.currency),
      ),
      args,
    );
  },
};

function validateDates(start: Date, end: Date) {
  // Validate dateFrom starts before dateTo
  if (compareAsc(start, end) > 0) {
    throw new Error(`DateFrom should start before dateTo`);
  }
}

function requestFlights(
  from: string,
  to: string,
  dateFrom: Date,
  dateTo: Date,
  passengers: ?{ adults: number },
  currency?: string,
): Promise<Object> {
  return request(
    config.restApiEndpoint.allFlights({
      flyFrom: from,
      to: to,
      dateFrom: dateFns.format(dateFrom, 'DD/MM/YYYY'),
      dateTo: dateFns.format(dateTo, 'DD/MM/YYYY'),
      curr: currency,
      adults: passengers ? passengers.adults : null,
    }),
  );
}
