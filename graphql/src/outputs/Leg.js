// @flow

import { GraphQLObjectType, GraphQLBoolean, GraphQLInt } from 'graphql';
import { globalIdField } from '../services/OpaqueIdentifier';

import GraphQLRouteStop from './RouteStop';
import GraphQLAirline from './Airline';
import FlightDurationInMinutes from '../resolvers/FlightDuration';

import type { GraphqlContextType } from '../services/GraphqlContext';
import type { DepartureArrival, Leg } from '../types/Flight';

export default new GraphQLObjectType({
  name: 'Leg',
  description:
    'Leg is the operation of an aircraft from one scheduled departure station to its next scheduled arrival station.',
  fields: {
    id: globalIdField(),

    airline: {
      type: GraphQLAirline,
      resolve: async (
        { airlineCode }: Leg,
        args: Object,
        { dataLoader }: GraphqlContextType,
      ) => dataLoader.airline.load(airlineCode),
    },

    arrival: {
      type: GraphQLRouteStop,
      resolve: ({ arrival }: Leg): DepartureArrival => arrival,
    },

    departure: {
      type: GraphQLRouteStop,
      resolve: ({ departure }: Leg): DepartureArrival => departure,
    },

    duration: {
      type: GraphQLInt,
      description: 'Leg duration in minutes.',
      resolve: ({ departure, arrival }: Leg): ?number =>
        FlightDurationInMinutes(departure, arrival),
    },

    flightNumber: {
      type: GraphQLInt,
      resolve: ({ flightNo }: Leg): number => flightNo,
    },

    recheckRequired: {
      type: GraphQLBoolean,
      resolve: ({ recheckRequired }): boolean => recheckRequired,
    },
  },
});
