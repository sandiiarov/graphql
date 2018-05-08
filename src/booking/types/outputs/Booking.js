// @flow

import { GraphQLEnumType, GraphQLObjectType, GraphQLString } from 'graphql';

import BookingOneWay, { type BookingOneWayData } from './BookingOneWay';
import BookingType from '../enums/BookingType';
import BookingReturn, {
  type BookingReturnData,
  splitLegs,
} from './BookingReturn';
import BookingMulticity, {
  type BookingMulticityData,
  createTrips,
} from './BookingMulticity';
import BookingDestinationImageURL from '../../resolvers/BookingDestinationImageURL';
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

    destinationImageUrl: {
      type: GraphQLString,
      args: {
        dimensions: {
          type: new GraphQLEnumType({
            name: 'BookingDestinationImageDimensions',
            values: {
              _1200x628: { value: '1200x628' },
              _1280x720: { value: '1280x720' },
              _220x165: { value: '220x165' },
              _275x250: { value: '275x250' },
              _300x165: { value: '300x165' },
              _375x165: { value: '375x165' },
              _600x330: { value: '600x330' },
              _600x600: { value: '600x600' },
              _610x251: { value: '610x251' },
            },
            defaultValue: '600x600',
          }),
        },
      },
      resolve: BookingDestinationImageURL,
    },

    ...commonFields,
  },
});
