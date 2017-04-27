// @flow

import { GraphQLNonNull, GraphQLList } from 'graphql';
import dateFns from 'date-fns';
import request from '../services/HttpRequest';
import config from '../../config/application';
import GraphQLFlight from '../types/Flight';
import FlightsSearchInput from '../types/FlightsSearchInput';

export default {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLFlight))),
  args: {
    search: {
      type: new GraphQLNonNull(FlightsSearchInput),
    },
  },
  resolve: async (_: mixed, args: Object) => {
    const allFlights = await request(
      config.restApiEndpoint.allFlights({
        flyFrom: args.search.from,
        to: args.search.to,
        dateFrom: dateFns.format(new Date(args.search.dateFrom), 'DD/MM/YYYY'),
        dateTo: dateFns.format(new Date(args.search.dateTo), 'DD/MM/YYYY'),
      }),
    );

    return allFlights.data.map(flight => ({
      arrival: {
        when: {
          utc: new Date(flight.aTimeUTC),
          local: new Date(flight.aTime),
        },
        where: {
          code: flight.flyTo,
          name: flight.cityTo,
        },
      },
      departure: {
        when: {
          utc: new Date(flight.dTimeUTC),
          local: new Date(flight.dTime),
        },
        where: {
          code: flight.flyFrom,
          name: flight.cityFrom,
        },
      },
    }));
  },
};
