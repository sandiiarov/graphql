// @flow

import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean,
} from 'graphql';
import { toGlobalId } from '../services/OpaqueIdentifier';
import GraphQLRouteStop from './RouteStop';
import GraphQLAirline from './Airline';
import { createAirline } from '../dataLoaders/Airline';

import type {
  ArrivalType,
  DepartureType,
  LegType,
  AirlineType,
} from '../Entities';

export default new GraphQLObjectType({
  name: 'Leg',
  description: 'Leg is the operation of an aircraft from one scheduled departure station to its next scheduled arrival station.',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: ({ id }: LegType): string => toGlobalId('leg', id),
    },

    airline: {
      type: GraphQLAirline,
      resolve: ({ airline }: LegType): AirlineType => createAirline(airline),
    },

    arrival: {
      type: new GraphQLNonNull(GraphQLRouteStop),
      resolve: ({ arrival }: LegType): ArrivalType => arrival,
    },

    departure: {
      type: new GraphQLNonNull(GraphQLRouteStop),
      resolve: ({ departure }: LegType): DepartureType => departure,
    },

    recheckRequired: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: ({ recheckRequired }): boolean => recheckRequired,
    },
  },
});
