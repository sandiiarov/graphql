// @flow

import { GraphQLNonNull, GraphQLID } from 'graphql';
import GraphQLBooking from '../types/Booking';
import request from '../services/HttpRequest';
import config from '../../config/application';

import type { GraphqlContextType } from '../services/GraphqlContext';
import type { BookingType, LegType } from '../Entities';

export default {
  type: GraphQLBooking, // may be null (doesn't exist)
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (
    ancestor: mixed,
    args: Object,
    context: GraphqlContextType,
  ): Promise<BookingType> =>
    sanitizeApiResponse(
      await request(
        `${config.restApiEndpoint.allBookings}/${args.id}`,
        context.apiToken,
      ),
    ),
};

export function sanitizeApiResponse(singleBooking: Object): BookingType {
  const { bag_params } = singleBooking;
  return {
    id: singleBooking.bid,
    allowedBaggage: {
      cabin: [
        {
          height: bag_params.hand_height,
          length: bag_params.hand_length,
          width: bag_params.hand_width,
          weight: bag_params.hand_weight,
          note: bag_params.hand_note === '' ? null : bag_params.hand_note,
        },
        {
          height: bag_params.hand2_height,
          length: bag_params.hand2_length,
          width: bag_params.hand2_width,
          weight: bag_params.hand2_weight,
          note: bag_params.hand2_note === '' ? null : bag_params.hand2_note,
        },
      ],
      checked: [
        {
          height: bag_params.hold_height,
          length: bag_params.hold_length,
          width: bag_params.hold_width,
          weight: bag_params.hold_weight,
          note: bag_params.note === '' ? null : bag_params.note,
        },
      ],
    },
    arrival: {
      when: singleBooking.arrival.when === 0
        ? null
        : {
            utc: new Date(singleBooking.arrival.when.utc * 1000),
            local: new Date(singleBooking.arrival.when.local * 1000),
          },
      where: {
        code: singleBooking.arrival.where.code,
        name: singleBooking.arrival.where.name,
      },
    },
    departure: {
      when: singleBooking.departure.when === 0
        ? null
        : {
            utc: new Date(singleBooking.departure.when.utc * 1000),
            local: new Date(singleBooking.departure.when.local * 1000),
          },
      where: {
        code: singleBooking.departure.where.code,
        name: singleBooking.departure.where.name,
      },
    },
    legs: singleBooking.flights.map((flight): LegType => ({
      id: flight.id,
      recheckRequired: flight.bags_recheck_required,
      flightNo: flight.flight_no,
      departure: {
        when: {
          utc: new Date(flight.departure.when.utc * 1000),
          local: new Date(flight.departure.when.local * 1000),
        },
        where: {
          code: flight.departure.where.code,
          name: flight.departure.where.name,
        },
      },
      arrival: {
        when: {
          utc: new Date(flight.arrival.when.utc * 1000),
          local: new Date(flight.arrival.when.local * 1000),
        },
        where: {
          code: flight.arrival.where.code,
          name: flight.arrival.where.name,
        },
      },
      airline: flight.airline.iata,
    })),
  };
}
