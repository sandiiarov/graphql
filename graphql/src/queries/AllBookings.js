// @flow

import { GraphQLNonNull, GraphQLList } from 'graphql';
import GraphQLBooking from '../types/Booking';
import request from '../services/HttpRequest';
import config from '../../config/application';

import type { GraphqlContextType } from '../services/GraphqlContext';
import type { BookingType } from '../types/Booking';

export default {
  type: new GraphQLList(new GraphQLNonNull(GraphQLBooking)),
  resolve: async (
    ancestor: mixed,
    args: Object,
    context: GraphqlContextType,
  ): Promise<Array<BookingType>> => {
    const response = await request(
      config.restApiEndpoint.allBookings,
      context.apiToken,
    );

    const bookingPromises = response.map((booking): Promise<BookingType> =>
      request(
        config.restApiEndpoint.singleBooking(booking.bid, booking.auth_token),
      ));

    return Promise.all(bookingPromises);
  },
};
