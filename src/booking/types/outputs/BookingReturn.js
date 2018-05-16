// @flow

import { GraphQLObjectType } from 'graphql';

import BookingInterface, {
  commonFields,
  type BookingInterfaceData,
} from './BookingInterface';
import Trip, { type TripData } from './Trip';

export type InboundOutboundData = {
  inbound: TripData,
  outbound: TripData,
};

export type BookingReturnData = BookingInterfaceData & InboundOutboundData;

export default new GraphQLObjectType({
  name: 'BookingReturn',
  description: 'Booking with return trip. A <-> B',
  interfaces: [BookingInterface],
  fields: {
    ...commonFields,
    outbound: {
      type: Trip,
      description: 'Trip from origin to destination.',
      resolve: ({ outbound }: BookingReturnData): ?TripData => outbound,
    },
    inbound: {
      type: Trip,
      description: 'Return trip back from destination to origin.',
      resolve: ({ inbound }: BookingReturnData): ?TripData => inbound,
    },
  },
});
