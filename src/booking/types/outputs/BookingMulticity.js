// @flow

import { GraphQLObjectType, GraphQLList } from 'graphql';

import BookingInterface, {
  commonFields,
  type BookingInterfaceData,
} from './BookingInterface';
import Trip from './Trip';
import RouteStop from '../../../flight/types/outputs/RouteStop';
import type { TripData } from './Trip';
import type { DepartureArrival, Leg } from '../../../flight/Flight';

export type BookingMulticityData = BookingInterfaceData & {
  departure: DepartureArrival,
  arrival: DepartureArrival,
  trips: TripData[],
};

export default new GraphQLObjectType({
  name: 'BookingMulticity',
  interfaces: [BookingInterface],
  fields: {
    ...commonFields,
    start: {
      type: RouteStop,
      description: 'Initial origin.',
      resolve: ({ departure }: BookingMulticityData): DepartureArrival =>
        departure,
    },
    end: {
      type: RouteStop,
      description: 'Final destination.',
      resolve: ({ arrival }: BookingMulticityData): DepartureArrival => arrival,
    },
    trips: {
      type: new GraphQLList(Trip),
      description: 'List of trips in each multicity segment.',
      resolve: ({ trips }: BookingMulticityData): TripData[] => trips,
    },
  },
});

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
