// @flow

import { GraphQLID, GraphQLNonNull } from 'graphql';
import GraphQLBooking from '../types/Booking';

import type { GraphqlContextType } from '../services/GraphqlContext';
import type { BookingsItemType } from '../Entities';

export default {
  type: GraphQLBooking, // may be null (doesn't exist)
  description: 'Flight booking by ID.',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (
    ancestor: mixed,
    { id }: Object,
    { dataLoader }: GraphqlContextType,
  ): Promise<BookingsItemType> => dataLoader.bookings.loadItem(id),
};
