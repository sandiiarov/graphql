// @flow

import { GraphQLNonNull, GraphQLID } from 'graphql';
import GraphQLBooking from '../types/Booking';

import type { GraphqlContextType } from '../services/GraphqlContext';
import type { BookingsItemType } from '../Entities';

export default {
  type: GraphQLBooking, // may be null (doesn't exist)
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
