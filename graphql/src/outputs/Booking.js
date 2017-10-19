// @flow

import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType } from 'graphql';

import GraphQLRouteStop from './RouteStop';
import GraphQLAllowedBaggage from './AllowedBaggage';
import GraphQLLeg from './Leg';
import GraphQLBookingAssets from './BookingAssets';
import { toGlobalId } from '../services/OpaqueIdentifier';

import type { AllowedBaggage } from '../types/Baggage';
import type { Booking, BookingAssets } from '../types/Booking';
import type { DepartureArrival, Leg } from '../types/Flight';
import type { GraphqlContextType } from '../services/GraphqlContext';

export default new GraphQLObjectType({
  name: 'Booking',
  fields: {
    id: {
      type: GraphQLID,
      resolve: ({ id }: Booking): string => toGlobalId('booking', id),
    },

    databaseId: {
      type: GraphQLInt,
      description: 'Internal database ID.',
      deprecationReason: 'Use id field instead.',
      resolve: ({ id }: Booking): number => id,
    },

    allowedBaggage: {
      type: GraphQLAllowedBaggage,
      resolve: async (
        { id }: Booking,
        params: Object,
        { dataLoader }: GraphqlContextType,
      ): Promise<AllowedBaggage> => {
        const { allowedBaggage } = await dataLoader.booking.load(id);
        return allowedBaggage;
      },
    },

    arrival: {
      type: GraphQLRouteStop,
      resolve: ({ arrival }: Booking): DepartureArrival => arrival,
    },

    assets: {
      type: GraphQLBookingAssets,
      description: 'Static assets related to this booking.',
      resolve: async (
        { id }: Booking,
        params: Object,
        { dataLoader }: GraphqlContextType,
      ): Promise<BookingAssets> => {
        const { assets } = await dataLoader.booking.load(id);
        return assets;
      },
    },

    departure: {
      type: GraphQLRouteStop,
      resolve: ({ departure }: Booking): DepartureArrival => departure,
    },

    legs: {
      type: new GraphQLList(GraphQLLeg),
      description: 'Flight segments, e.g. stopover, change of aircraft, etc.',
      resolve: ({ legs }: Booking): Leg[] => legs,
    },
  },
});
