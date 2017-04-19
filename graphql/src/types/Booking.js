// @flow

import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import Arrival from './Arrival';
import Departure from './Departure';
import Flight from './Flight';
import { toGlobalId } from '../services/OpaqueIdentifier';

import type { ArrivalType } from './Arrival';
import type { DepartureType } from './Departure';
import type { FlightType } from './Flight';

export type BookingType = {
  arrival: ArrivalType,
  auth_token: string,
  bid: number,
  departure: DepartureType,
  flights: Array<FlightType>,
};

export default new GraphQLObjectType({
  name: 'Booking',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: ({ bid }: BookingType): string => toGlobalId('booking', bid),
    },

    databaseId: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: ({ bid }: BookingType): number => bid,
    },

    arrival: {
      type: new GraphQLNonNull(Arrival),
      resolve: ({ arrival }: BookingType): ArrivalType => arrival,
    },

    departure: {
      type: new GraphQLNonNull(Departure),
      resolve: ({ departure }: BookingType): DepartureType => departure,
    },

    flights: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Flight))),
      resolve: ({ flights }: BookingType): Array<FlightType> => flights,
    },
  },
});
