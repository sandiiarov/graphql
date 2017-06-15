// @flow

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
} from 'graphql-relay';
import GraphQLBooking from '../types/Booking';

import type { GraphqlContextType } from '../services/GraphqlContext';

const { connectionType: AllBookingsConnection } = connectionDefinitions({
  nodeType: GraphQLBooking,
});

export default {
  type: AllBookingsConnection,
  args: connectionArgs,
  resolve: async (
    ancestor: mixed,
    args: Object,
    { dataLoader }: GraphqlContextType,
  ) => connectionFromPromisedArray(dataLoader.bookings.load(), args),
};
