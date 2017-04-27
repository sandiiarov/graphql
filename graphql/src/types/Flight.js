// @flow

import { GraphQLObjectType, GraphQLNonNull, GraphQLList } from 'graphql';
import GraphQLArrival from './Arrival';
import GraphQLDeparture from './Departure';
import GraphQLLeg from './Leg';

import type {
  ArrivalType,
  FlightType,
  DepartureType,
  LegType,
} from '../Entities';

export default new GraphQLObjectType({
  name: 'Flight',
  fields: {
    arrival: {
      type: new GraphQLNonNull(GraphQLArrival),
      resolve: ({ arrival }: FlightType): ArrivalType => arrival,
    },

    departure: {
      type: new GraphQLNonNull(GraphQLDeparture),
      resolve: ({ departure }: FlightType): DepartureType => departure,
    },

    legs: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLLeg))),
      resolve: ({ legs }: FlightType): Array<LegType> => legs,
    },
  },
});
