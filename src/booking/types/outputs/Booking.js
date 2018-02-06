// @flow

import { GraphQLInt, GraphQLList, GraphQLObjectType } from 'graphql';
import { globalIdField } from '../../../common/services/OpaqueIdentifier';

import GraphQLRouteStop from '../../../flight/types/outputs/RouteStop';
import GraphQLAllowedBaggage from './AllowedBaggage';
import GraphQLLeg from '../../../flight/types/outputs/Leg';
import GraphQLBookingAssets from './BookingAssets';
import GraphQLBookingStatus from '../enums/BookingStatus';

import type { AllowedBaggage } from '../../Baggage';
import type { Booking, BookingAssets } from '../../Booking';
import type { DepartureArrival, Leg } from '../../../flight/Flight';
import type { GraphqlContextType } from '../../../common/services/GraphqlContext';

export default new GraphQLObjectType({
  name: 'Booking',
  fields: {
    id: globalIdField(),

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

    status: {
      type: GraphQLBookingStatus,
      resolve: ({ status }: Booking): string => status,
    },
  },
});
