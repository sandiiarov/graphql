// @flow

import { GraphQLObjectType, GraphQLList } from 'graphql';
import Leg from '../../../flight/types/outputs/Leg';
import GraphQLRouteStop from '../../../flight/types/outputs/RouteStop';
import type { DepartureArrival, Leg as LegType } from '../../../flight/Flight';

export type TripData = {
  departure: DepartureArrival,
  arrival: DepartureArrival,
  legs: LegType[],
};

export default new GraphQLObjectType({
  name: 'Trip',
  description:
    'Single travel from origin to destination, with possible stopovers.',
  fields: {
    departure: {
      type: GraphQLRouteStop,
      resolve: ({ departure }: TripData): DepartureArrival => departure,
    },
    arrival: {
      type: GraphQLRouteStop,
      resolve: ({ arrival }: TripData): DepartureArrival => arrival,
    },
    legs: {
      type: new GraphQLList(Leg),
      resolve: ({ legs }: TripData): LegType[] => legs,
    },
  },
});
