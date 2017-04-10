// @flow

import { GraphQLObjectType, GraphQLNonNull, GraphQLList } from 'graphql';
import Arrival from './Arrival';
import Departure from './Departure';
import Flight from './Flight';

import type { ArrivalType } from './Arrival';
import type { DepartureType } from './Departure';

export default new GraphQLObjectType({
  name: 'Booking',
  fields() {
    return {
      arrival: {
        type: new GraphQLNonNull(Arrival),
        resolve(booking): ArrivalType {
          return booking.arrival;
        },
      },

      departure: {
        type: new GraphQLNonNull(Departure),
        resolve(booking): DepartureType {
          return booking.departure;
        },
      },

      flights: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Flight))),
      },
    };
  },
});
