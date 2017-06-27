// @flow

import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLBoolean,
  GraphQLInt,
} from 'graphql';
import { toGlobalId } from '../services/OpaqueIdentifier';
import GraphQLRouteStop from './RouteStop';
import GraphQLAirline from './Airline';
import type { GraphqlContextType } from '../services/GraphqlContext';
import FlightDurationInMinutes from '../resolvers/FlightDuration';

import type { DepartureArrivalType, LegType, AirlineType } from '../Entities';

export default new GraphQLObjectType({
  name: 'Leg',
  description: 'Leg is the operation of an aircraft from one scheduled departure station to its next scheduled arrival station.',
  fields: {
    id: {
      type: GraphQLID,
      resolve: ({ id }: LegType): string => toGlobalId('leg', id),
    },

    airline: {
      type: GraphQLAirline,
      resolve: async (
        { airlineCode }: LegType,
        args: Object,
        { dataLoader }: GraphqlContextType,
      ): Promise<?AirlineType> => dataLoader.airline.load(airlineCode),
    },

    arrival: {
      type: GraphQLRouteStop,
      resolve: ({ arrival }: LegType): DepartureArrivalType => arrival,
    },

    departure: {
      type: GraphQLRouteStop,
      resolve: ({ departure }: LegType): DepartureArrivalType => departure,
    },

    duration: {
      type: GraphQLInt,
      description: 'Leg duration in minutes.',
      resolve: ({ departure, arrival }: LegType): ?number =>
        FlightDurationInMinutes(departure, arrival),
    },

    flightNumber: {
      type: GraphQLInt,
      resolve: ({ flightNo }: LegType): number => flightNo,
    },

    recheckRequired: {
      type: GraphQLBoolean,
      resolve: ({ recheckRequired }): boolean => recheckRequired,
    },
  },
});
