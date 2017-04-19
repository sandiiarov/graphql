// @flow

import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
} from 'graphql';
import Arrival from './Arrival';
import Departure from './Departure';
import Flight from './Flight';

import type { ArrivalType } from './Arrival';
import type { DepartureType } from './Departure';
import type { FlightType } from './Flight';

export type BookingType = {
  arrival: ArrivalType,
  bid: number,
  departure: DepartureType,
  flights: FlightType,
};

export default new GraphQLObjectType({
  name: 'Booking',
  fields() {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        resolve: ({ bid }: BookingType): number => bid,
      },

      arrival: {
        type: new GraphQLNonNull(Arrival),
      },

      departure: {
        type: new GraphQLNonNull(Departure),
      },

      flights: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Flight))),
      },
    };
  },
});
