// @flow

import { GraphQLNonNull, GraphQLList } from 'graphql';
import GraphQLBooking from '../types/Booking';
import request from '../services/HttpRequest';
import config from '../../config/application';
import { sanitizeApiResponse } from './Booking';

import type { GraphqlContextType } from '../services/GraphqlContext';
import type { BookingType } from '../Entities';

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
      ),
    );

    const allBookings = await Promise.all(bookingPromises);
    return allBookings.map(
      (booking): BookingType => sanitizeApiResponse(booking), // Warning: responses from all bookings and single booking endpoints are not exactly the same
    );
  },
};
