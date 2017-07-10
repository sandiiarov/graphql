// @flow

import _ from 'lodash';
import { GraphQLInt, GraphQLList, GraphQLObjectType } from 'graphql';
import GraphQLRouteStop from './RouteStop';
import GraphQLLeg from './Leg';
import GraphQLAirline from './Airline';
import GraphQLPrice from './Price';
import type { GraphqlContextType } from '../services/GraphqlContext';
import FlightDurationInMinutes from '../resolvers/FlightDuration';

import type { Price } from '../types/Price';
import type { DepartureArrival, Flight, Leg, Airline } from '../types/Flight';

export default new GraphQLObjectType({
  name: 'Flight',
  fields: {
    airlines: {
      type: new GraphQLList(GraphQLAirline),
      description: 'List of all Airlines involved.',
      resolve: async (
        { airlines }: Flight,
        args: Object,
        { dataLoader }: GraphqlContextType,
      ): Promise<Array<?Airline>> =>
        _.uniq(airlines).map(airlineCode =>
          dataLoader.airline.load(airlineCode),
        ),
    },

    arrival: {
      type: GraphQLRouteStop,
      resolve: ({ arrival }: Flight): DepartureArrival => arrival,
    },

    departure: {
      type: GraphQLRouteStop,
      resolve: ({ departure }: Flight): DepartureArrival => departure,
    },

    duration: {
      type: GraphQLInt,
      description: 'Flight duration in minutes.',
      resolve: ({ departure, arrival }: Flight): ?number =>
        FlightDurationInMinutes(departure, arrival),
    },

    legs: {
      type: new GraphQLList(GraphQLLeg),
      description: 'Flight segments, e.g. stopover, change of aircraft, etc.',
      resolve: ({ legs }: Flight): Array<Leg> => legs,
    },

    price: {
      type: GraphQLPrice,
      description: 'Total flight price.',
      resolve: ({ price }: Flight): Price => price,
    },
  },
});
