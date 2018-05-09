// @flow

import { GraphQLObjectType } from 'graphql';

import BookingOneWay, { type BookingOneWayData } from './BookingOneWay';
import BookingType from '../enums/BookingType';
import BookingReturn, { type BookingReturnData } from './BookingReturn';
import BookingMulticity, {
  type BookingMulticityData,
} from './BookingMulticity';
import DeprecatedField from './Booking.deprecated';
import { commonFields } from './BookingInterface';
import { createTrips, splitLegs } from '../../BookingHelpers';
import type { Booking } from '../../Booking';

export default new GraphQLObjectType({
  name: 'Booking',
  description:
    'You can fetch here almost every information related to the booking itself. ' +
    'However when you want to fetch legs you have to use "oneWay", "return" and ' +
    '"multicity" fields because they highly depend on the booking type.',

  fields: {
    ...DeprecatedField,
    ...commonFields,

    type: {
      type: BookingType,
      resolve: ({ type }: Booking) => type,
    },

    oneWay: {
      type: BookingOneWay,
      resolve: (booking: Booking): ?BookingOneWayData => {
        if (booking.type !== 'BookingOneWay') {
          return null;
        }

        return booking;
      },
    },

    return: {
      type: BookingReturn,
      resolve: (booking: Booking): ?BookingReturnData => {
        if (booking.type !== 'BookingReturn') {
          return null;
        }

        const { inbound, outbound } = splitLegs(booking.legs);

        return { ...booking, inbound, outbound };
      },
    },

    multicity: {
      type: BookingMulticity,
      resolve: (booking: Booking): ?BookingMulticityData => {
        if (booking.type !== 'BookingMulticity') {
          return null;
        }

        if (!Array.isArray(booking.segments)) {
          throw new Error(
            'Unexpected - booking is of type "BookingMulticity" but segments are missing.',
          );
        }

        const trips = createTrips(booking.segments, booking.legs);

        return { ...booking, trips };
      },
    },
  },
});
