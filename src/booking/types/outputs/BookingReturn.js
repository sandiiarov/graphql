// @flow

import { GraphQLObjectType } from 'graphql';

import BookingInterface, {
  commonFields,
  type BookingInterfaceData,
} from './BookingInterface';
import Trip, { type TripData } from './Trip';
import type { Leg } from '../../../flight/Flight';

type InboundOutboundData = {
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
      resolve: ({ outbound }: BookingReturnData): TripData => outbound,
    },
    inbound: {
      type: Trip,
      description: 'Return trip back from destination to origin.',
      resolve: ({ inbound }: BookingReturnData): TripData => inbound,
    },
  },
});

export function splitLegs(legs: Leg[]): InboundOutboundData {
  const inboundLegs = [];
  const outboundLegs = [];

  legs.forEach(leg => {
    if (leg.isReturn) {
      inboundLegs.push(leg);
      return;
    }

    outboundLegs.push(leg);
  });

  if (!inboundLegs.length || !outboundLegs.length) {
    throw new Error('Unexpected - these are not Legs with return trip.');
  }

  return {
    inbound: {
      departure: inboundLegs[0].departure,
      arrival: inboundLegs[inboundLegs.length - 1].arrival,
      legs: inboundLegs,
    },
    outbound: {
      departure: outboundLegs[0].departure,
      arrival: outboundLegs[outboundLegs.length - 1].arrival,
      legs: outboundLegs,
    },
  };
}
