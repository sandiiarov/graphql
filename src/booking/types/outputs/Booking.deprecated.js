// @flow

import { GraphQLList } from 'graphql';

import GraphQLRouteStop from '../../../flight/types/outputs/RouteStop';
import GraphQLLeg from '../../../flight/types/outputs/Leg';

import type { Booking } from '../../Booking';
import type { DepartureArrival, Leg } from '../../../flight/Flight';

export default {
  arrival: {
    type: GraphQLRouteStop,
    deprecationReason:
      'Use "oneWay", "return" & "multicity"  fields to retrieve booking info.',
    resolve: ({ arrival }: Booking): DepartureArrival => arrival,
  },

  departure: {
    type: GraphQLRouteStop,
    deprecationReason:
      'Use "oneWay", "return" & "multicity"  fields to retrieve booking info.',
    resolve: ({ departure }: Booking): DepartureArrival => departure,
  },

  legs: {
    type: new GraphQLList(GraphQLLeg),
    description: 'Flight segments, e.g. stopover, change of aircraft, etc.',
    deprecationReason:
      'Use "oneWay", "return" & "multicity"  fields to retrieve booking info.',
    resolve: ({ legs }: Booking): Leg[] => legs,
  },
};
