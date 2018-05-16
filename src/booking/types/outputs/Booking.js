// @flow

import { GraphQLObjectType } from 'graphql';

import BookingOneWay from './BookingOneWay';
import BookingReturn from './BookingReturn';
import BookingMulticity from './BookingMulticity';
import DeprecatedField from './Booking.deprecated';
import { commonFields } from './BookingInterface';
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

    oneWay: {
      type: BookingOneWay,
      resolve: (booking: Booking) => {
        if (booking.type !== 'BookingOneWay') {
          return null;
        }

        return booking;
      },
    },

    return: {
      type: BookingReturn,
      resolve: (booking: Booking) => {
        if (booking.type !== 'BookingReturn') {
          return null;
        }

        return booking;
      },
    },

    multicity: {
      type: BookingMulticity,
      resolve: (booking: Booking) => {
        if (booking.type !== 'BookingMulticity') {
          return null;
        }

        return booking;
      },
    },
  },
});
