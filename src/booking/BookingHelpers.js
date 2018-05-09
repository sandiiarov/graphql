// @flow

import type { Leg } from '../flight/Flight';
import type { TripData } from './types/outputs/Trip';

export function createTrips(segments: string[], legs: Leg[]): TripData[] {
  const trips = [];

  const lastIndex = segments.reduce((lastIndex: number, segment: string) => {
    const indexOfNewSegment = parseInt(segment);
    const trip = legs.slice(lastIndex, indexOfNewSegment);
    trips.push(trip);

    return indexOfNewSegment;
  }, 0);
  trips.push(legs.slice(lastIndex));

  return trips.map(trip => ({
    departure: trip[0].departure,
    arrival: trip[trip.length - 1].arrival,
    legs: trip,
  }));
}

type InboundOutboundData = {
  inbound: TripData,
  outbound: TripData,
};

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
