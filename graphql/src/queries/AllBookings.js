// @flow

import { GraphQLNonNull, GraphQLList } from 'graphql';
import GraphQLBooking from '../types/Booking';

import type { GraphqlContextType } from '../services/GraphqlContext';
import type { BookingsItemType } from '../Entities';

export default {
  type: new GraphQLList(new GraphQLNonNull(GraphQLBooking)),
  resolve: async (
    ancestor: mixed,
    args: Object,
    { dataLoader }: GraphqlContextType,
  ): Promise<Array<BookingsItemType>> => dataLoader.bookings.load(),
};
