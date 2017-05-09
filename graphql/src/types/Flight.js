// @flow

import { GraphQLObjectType, GraphQLNonNull, GraphQLList } from 'graphql';
import GraphQLRouteStop from './RouteStop';
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
      type: new GraphQLNonNull(GraphQLRouteStop),
      resolve: ({ arrival }: FlightType): ArrivalType => arrival,
    },

    departure: {
      type: new GraphQLNonNull(GraphQLRouteStop),
      resolve: ({ departure }: FlightType): DepartureType => departure,
    },

    legs: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLLeg))),
      resolve: ({ legs }: FlightType): Array<LegType> => legs,
    },
  },
});
