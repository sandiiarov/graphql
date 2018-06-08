// @flow

import { GraphQLObjectType, GraphQLList } from 'graphql';

import BookingInterface, {
  commonFields,
  type BookingInterfaceData,
} from './BookingInterface';
import Trip from './Trip';
import RouteStop from '../../../flight/types/outputs/RouteStop';
import { nodeInterface } from '../../../node/node';
import type { TripData } from './Trip';
import type { DepartureArrival } from '../../../flight/Flight';
import { register } from '../../../node/typeStore';

type BookingMulticityData = BookingInterfaceData & {
  trips: TripData[],
};

const BookingMulticity = new GraphQLObjectType({
  name: 'BookingMulticity',
  interfaces: [BookingInterface, nodeInterface],
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
      resolve: ({ trips }: BookingMulticityData): ?(TripData[]) => trips,
    },
  },
});

register('BookingMulticity', BookingMulticity);

export default BookingMulticity;
