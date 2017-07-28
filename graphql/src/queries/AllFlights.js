// @flow

import { GraphQLNonNull } from 'graphql';
import type { GraphQLResolveInfo } from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
} from 'graphql-relay';
import _ from 'lodash';
import GraphQLFlight from '../outputs/Flight';
import FlightsSearchInput from '../inputs/FlightsSearchInput';
import FlightsOptionsInput from '../inputs/FlightsOptionsInput';
import FlightsFiltersInput from '../inputs/FlightsFiltersInput';
import { sanitizeApiResponse } from './flight/ApiSanitizer';
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
    filters: {
      type: FlightsFiltersInput,
    },
    ...connectionArgs,
  },
  resolve: async (
    ancestor: mixed,
    args: Object,
    context: GraphqlContextType,
    { path }: GraphQLResolveInfo,
  ) => {
    const { from, to, dateFrom, dateTo, passengers } = args.search;
    validateDates(dateFrom, dateTo);
    if (path) {
      context.options.setOptions(path.key, args.options);
    }

    const currency = _.get(args, 'options.currency');
    const locale = _.get(args, 'options.locale');
    const adults = _.get(args, 'search.passengers.adults');

    const allFlights = await context.dataLoader.flight.load({
      from,
      to,
      dateFrom: new Date(dateFrom),
      dateTo: new Date(dateTo),
      currency: currency ? currency : null,
      adults: adults ? adults : null,
      locale: locale ? locale : null,
      filters: {
        maxStopovers: _.get(args, 'filters.maxStopovers'),
        duration: {
          maxFlightDuration: _.get(args, 'filters.duration.maxFlightDuration'),
          stopovers: {
            from: _.get(args, 'filters.duration.stopovers.from'),
            to: _.get(args, 'filters.duration.stopovers.to'),
          },
        },
      },
    });

    return connectionFromArray(
      allFlights.data.map(flight =>
        sanitizeApiResponse(
          flight,
          allFlights.currency,
          passengers ? passengers.adults : 1,
        ),
      ),
      args,
    );
  },
};
