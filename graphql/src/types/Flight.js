// @flow

import _ from 'lodash';
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt,
} from 'graphql';
import GraphQLRouteStop from './RouteStop';
import GraphQLLeg from './Leg';
import GraphQLAirline from './Airline';
import type { GraphqlContextType } from '../services/GraphqlContext';
import { flightDurationInMinutes } from '../services/GraphqlResolvers';

import type {
  AirlineType,
  ArrivalType,
  FlightType,
  DepartureType,
  LegType,
} from '../Entities';

export default new GraphQLObjectType({
  name: 'Flight',
  fields: {
    airlines: {
      type: new GraphQLList(GraphQLAirline),
      resolve: async (
        { airlines }: FlightType,
        args: Object,
        { dataLoader }: GraphqlContextType,
      ): Promise<Array<?AirlineType>> =>
        _.uniq(airlines).map(airlineCode =>
          dataLoader.airline.load(airlineCode),
        ),
    },

    arrival: {
      type: new GraphQLNonNull(GraphQLRouteStop),
      resolve: ({ arrival }: FlightType): ArrivalType => arrival,
    },

    departure: {
      type: new GraphQLNonNull(GraphQLRouteStop),
      resolve: ({ departure }: FlightType): DepartureType => departure,
    },

    duration: {
      type: GraphQLInt,
      resolve: ({ departure, arrival }: FlightType): ?number =>
        flightDurationInMinutes(departure, arrival),
    },

    legs: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLLeg))),
      resolve: ({ legs }: FlightType): Array<LegType> => legs,
    },
  },
});
