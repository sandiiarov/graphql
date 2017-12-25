// @flow

import { GraphQLID, GraphQLNonNull } from 'graphql';

import GraphQLBooking from '../types/outputs/Booking';
import type { GraphqlContextType } from '../../common/services/GraphqlContext';
import type { BookingsItem } from '../Booking';

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
  ): Promise<BookingsItem> => dataLoader.bookings.loadItem(id),
};
