// @flow

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
} from 'graphql-relay';
import GraphQLBooking from '../outputs/Booking';

import type { GraphqlContextType } from '../services/GraphqlContext';

const { connectionType: AllBookingsConnection } = connectionDefinitions({
  nodeType: GraphQLBooking,
});

export default {
  type: AllBookingsConnection,
  description: 'Search for your flight bookings.',
  args: connectionArgs,
  resolve: async (
    ancestor: mixed,
    args: Object,
    { dataLoader }: GraphqlContextType,
  ) => connectionFromPromisedArray(dataLoader.bookings.load(), args),
};
