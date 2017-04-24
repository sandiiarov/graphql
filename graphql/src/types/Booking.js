// @flow

import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';

import GraphQLRouteStop from './RouteStop';
import GraphQLAllowedBaggage from './AllowedBaggage';
import GraphQLLeg from './Leg';
import { toGlobalId } from '../services/OpaqueIdentifier';

import type {
  ArrivalType,
  AllowedBaggageType,
  BookingType,
  DepartureType,
  LegType,
} from '../Entities';

export default new GraphQLObjectType({
  name: 'Booking',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: ({ id }: BookingType): string => toGlobalId('booking', id),
    },

    databaseId: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: ({ id }: BookingType): number => id,
    },

    allowedBaggage: {
      type: new GraphQLNonNull(GraphQLAllowedBaggage),
      resolve: ({ allowedBaggage }: BookingType): AllowedBaggageType =>
        allowedBaggage,
    },

    arrival: {
      type: new GraphQLNonNull(GraphQLRouteStop),
      resolve: ({ arrival }: BookingType): ArrivalType => arrival,
    },

    departure: {
      type: new GraphQLNonNull(GraphQLRouteStop),
      resolve: ({ departure }: BookingType): DepartureType => departure,
    },

    legs: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLLeg))),
      resolve: ({ legs }: BookingType): Array<LegType> => legs,
    },
  },
});
