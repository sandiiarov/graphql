// @flow

import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';

import GraphQLArrival from './Arrival';
import GraphQLDeparture from './Departure';
import GraphQLLeg from './Leg';
import { toGlobalId } from '../services/OpaqueIdentifier';

import type {
  BookingType,
  LegType,
  ArrivalType,
  DepartureType,
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

    arrival: {
      type: new GraphQLNonNull(GraphQLArrival),
      resolve: ({ arrival }: BookingType): ArrivalType => arrival,
    },

    departure: {
      type: new GraphQLNonNull(GraphQLDeparture),
      resolve: ({ departure }: BookingType): DepartureType => departure,
    },

    legs: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLLeg))),
      resolve: ({ legs }: BookingType): Array<LegType> => legs,
    },
  },
});
