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
import { sanitizeApiResponse } from './flight/ApiSanitizer';
import LocationDataLoader from '../dataLoaders/Location';

import type { GraphqlContextType } from '../services/GraphqlContext';

const { connectionType: AllFlightsConnection } = connectionDefinitions({
  nodeType: GraphQLFlight,
});

export default {
  type: AllFlightsConnection,
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
    validateArgs(args);

    let allFlights = await requestFlights(args);

    // Use location fallback when flights returns no results
    if (!allFlights.data.length) {
      allFlights = await useLocationsFallback(
        args,
        context.dataLoader.location,
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

async function useLocationsFallback(
  args: Object,
  dataLoader: LocationDataLoader,
): Promise<Object> {
  const [from, to] = await dataLoader.loadMany([
    args.search.from,
    args.search.to,
  ]);

  return requestFlights(args, from.locationId, to.locationId);
}
