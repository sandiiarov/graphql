// @flow

import { GraphQLInt, GraphQLList } from 'graphql';
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

export default {
  id: {
    ...globalIdField(),
    deprecationReason:
      'Use "oneWay", "return" & "multicity"  fields to retrieve booking info.',
  },

  databaseId: {
    type: GraphQLInt,
    description:
      'Unique number identifying the booking in communication with support.',
    deprecationReason:
      'Use "oneWay", "return" & "multicity"  fields to retrieve booking info.',
    resolve: ({ id }: Booking): number => id,
  },

  allowedBaggage: {
    type: GraphQLAllowedBaggage,
    deprecationReason:
      'Use "oneWay", "return" & "multicity"  fields to retrieve booking info.',
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
    deprecationReason:
      'Use "oneWay", "return" & "multicity"  fields to retrieve booking info.',
    resolve: ({ arrival }: Booking): DepartureArrival => arrival,
  },

  assets: {
    type: GraphQLBookingAssets,
    description: 'Static assets related to this booking.',
    deprecationReason:
      'Use "oneWay", "return" & "multicity"  fields to retrieve booking info.',
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
    deprecationReason:
      'Use "oneWay", "return" & "multicity"  fields to retrieve booking info.',
    resolve: ({ departure }: Booking): DepartureArrival => departure,
  },

  legs: {
    type: new GraphQLList(GraphQLLeg),
    description: 'Flight segments, e.g. stopover, change of aircraft, etc.',
    deprecationReason:
      'Use "oneWay", "return" & "multicity"  fields to retrieve booking info.',
    resolve: ({ legs }: Booking): Leg[] => legs,
  },

  status: {
    type: GraphQLBookingStatus,
    deprecationReason:
      'Use "oneWay", "return" & "multicity"  fields to retrieve booking info.',
    resolve: ({ status }: Booking): string => status,
  },
};
