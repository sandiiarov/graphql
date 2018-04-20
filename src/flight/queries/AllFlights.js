// @flow

import { GraphQLNonNull } from 'graphql';
import { connectionArgs, connectionDefinitions } from 'graphql-relay';

import type { GraphQLResolveInfo } from 'graphql';

import idx from 'idx';
import GraphQLFlight from '../types/outputs/Flight';
import FlightsSearchInput from '../types/inputs/FlightsSearchInput';
import FlightsOptionsInput from '../types/inputs/FlightsOptionsInput';
import FlightsFiltersInput from '../types/inputs/FlightsFiltersInput';
import { sanitizeApiResponse } from '../dataloaders/ApiSanitizer';
import { validateDates } from '../resolvers/FlightDatesValidator';
import { connectionFromArray } from '../../common/services/ArrayConnection';

import type { GraphqlContextType } from '../../common/services/GraphqlContext';

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
    const { from, to, date, returnDate, passengers } = args.search;
    validateDates(date, returnDate);

    if (path) {
      context.options.setOptions(path.key, args.options);
    }

    const currency = idx(args, _ => _.options.currency);
    const locale = idx(args, _ => _.options.locale);
    const adults = idx(args, _ => _.search.passengers.adults);
    const maxStopovers = idx(args, _ => _.filters.maxStopovers);

    const allFlights = await context.dataLoader.flight.load({
      from,
      to,
      dateFrom: date.exact ? date.exact : date.from,
      dateTo: date.exact ? date.exact : date.to,
      ...(returnDate && {
        returnFrom: returnDate.exact ? returnDate.exact : returnDate.from,
        returnTo: returnDate.exact ? returnDate.exact : returnDate.to,
        typeFlight: 'return',
      }),
      currency: currency ? currency : null,
      adults: adults ? adults : null,
      locale: locale ? locale : null,
      filters: {
        maxStopovers: Number.isInteger(maxStopovers)
          ? Number(maxStopovers)
          : null,
        duration: {
          maxFlightDuration:
            idx(args, _ => _.filters.duration.maxFlightDuration) || null,
          stopovers: {
            from: idx(args, _ => _.filters.duration.stopovers.from),
            to: idx(args, _ => _.filters.duration.stopovers.to),
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
