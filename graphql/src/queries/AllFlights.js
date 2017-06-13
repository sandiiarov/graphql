// @flow

import compareAsc from 'date-fns/compare_asc';
import { GraphQLNonNull, GraphQLList } from 'graphql';
import dateFns from 'date-fns';
import _ from 'lodash';
import request from '../services/HttpRequest';
import config from '../../config/application';
import GraphQLFlight from '../types/Flight';
import FlightsSearchInput from '../types/FlightsSearchInput';
import FlightsOptionsInput from '../types/FlightsOptionsInput';
import type { FlightType } from '../Entities';
import { fetchLocation } from './location/LocationLoader';
import { sanitizeApiResponse } from './flight/ApiSanitizer';

export default {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLFlight))),
  args: {
    search: {
      type: new GraphQLNonNull(FlightsSearchInput),
    },
    options: {
      type: FlightsOptionsInput,
    },
  },
  resolve: async (
    ancestor: mixed,
    args: Object,
  ): Promise<Array<FlightType>> => {
    validateArgs(args);

    let allFlights = await requestFlights(args);

    // Use location fallback when flights returns no results
    if (allFlights._results === 0) {
      allFlights = await useLocationsFallback(args);
    }

    return allFlights.data.map(flight =>
      sanitizeApiResponse(flight, allFlights.currency),
    );
  },
};

function validateArgs(args: Object) {
  // Validate dateFrom starts before dateTo
  const dateFrom = new Date(args.search.dateFrom);
  const dateTo = new Date(args.search.dateTo);
  if (compareAsc(dateFrom, dateTo) > 0) {
    throw new Error(`DateFrom should start before dateTo`);
  }
}

function requestFlights(
  args: Object,
  from: ?string,
  to: ?string,
): Promise<Object> {
  return request(
    config.restApiEndpoint.allFlights({
      flyFrom: from || args.search.from,
      to: to || args.search.to,
      dateFrom: dateFns.format(new Date(args.search.dateFrom), 'DD/MM/YYYY'),
      dateTo: dateFns.format(new Date(args.search.dateTo), 'DD/MM/YYYY'),
      curr: _.get(args, 'options.currency'),
    }),
  );
}

async function useLocationsFallback(args: Object): Promise<Object> {
  const [from, to] = await Promise.all([
    fetchLocation(args.search.from),
    fetchLocation(args.search.to),
  ]);
  return requestFlights(args, from.id, to.id);
}
