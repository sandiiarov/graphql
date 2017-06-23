// @flow

import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType } from 'graphql';

import GraphQLRouteStop from './RouteStop';
import GraphQLAllowedBaggage from './AllowedBaggage';
import GraphQLLeg from './Leg';
import { toGlobalId } from '../services/OpaqueIdentifier';

import type {
  DepartureArrivalType,
  AllowedBaggageType,
  BookingType,
  LegType,
} from '../Entities';
import type { GraphqlContextType } from '../services/GraphqlContext';

export default new GraphQLObjectType({
  name: 'Booking',
  fields: {
    id: {
      type: GraphQLID,
      resolve: ({ id }: BookingType): string => toGlobalId('booking', id),
    },

    databaseId: {
      type: GraphQLInt,
      resolve: ({ id }: BookingType): number => id,
    },

    allowedBaggage: {
      type: GraphQLAllowedBaggage,
      resolve: async (
        { id }: BookingType,
        params: Object,
        { dataLoader }: GraphqlContextType,
      ): Promise<AllowedBaggageType> => {
        const { allowedBaggage } = await dataLoader.booking.load(id);
        return allowedBaggage;
      },
    },

    arrival: {
      type: GraphQLRouteStop,
      resolve: ({ arrival }: BookingType): DepartureArrivalType => arrival,
    },

    departure: {
      type: GraphQLRouteStop,
      resolve: ({ departure }: BookingType): DepartureArrivalType => departure,
    },

    legs: {
      type: new GraphQLList(GraphQLLeg),
      resolve: ({ legs }: BookingType): Array<LegType> => legs,
    },
  },
});
