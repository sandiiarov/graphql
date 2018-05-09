// @flow

import { GraphQLObjectType, GraphQLList } from 'graphql';

import BookingInterface, {
  commonFields,
  type BookingInterfaceData,
} from './BookingInterface';
import Trip from './Trip';
import RouteStop from '../../../flight/types/outputs/RouteStop';
import type { TripData } from './Trip';
import type { DepartureArrival } from '../../../flight/Flight';

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
