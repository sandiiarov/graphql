// @flow

import { GraphQLObjectType, GraphQLNonNull } from 'graphql';
import Arrival from './Arrival';
import Departure from './Departure';

import type { ArrivalType } from './Arrival';
import type { DepartureType } from './Departure';

export type FlightType = {
  arrival: ArrivalType,
  departure: DepartureType,
};

export default new GraphQLObjectType({
  name: 'Flight',
  fields() {
    return {
      arrival: {
        type: new GraphQLNonNull(Arrival),
        resolve: ({ arrival }: FlightType): ArrivalType => arrival,
      },

      departure: {
        type: new GraphQLNonNull(Departure),
        resolve: ({ departure }: FlightType): DepartureType => departure,
      },
    };
  },
});
