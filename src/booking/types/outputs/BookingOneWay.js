// @flow

import { GraphQLObjectType } from 'graphql';

import BookingInterface, {
  commonFields,
  type BookingInterfaceData,
} from './BookingInterface';
import Trip, { type TripData } from './Trip';

export type BookingOneWayData = BookingInterfaceData & {};

export default new GraphQLObjectType({
  name: 'BookingOneWay',
  description:
    'Booking with simple trip from origin to destination, with possible stopovers.',
  interfaces: [BookingInterface],
  fields: {
    ...commonFields,
    trip: {
      type: Trip,
      resolve: ({ departure, arrival, legs }: BookingOneWayData): TripData => ({
        departure,
        arrival,
        legs,
      }),
    },
  },
});
