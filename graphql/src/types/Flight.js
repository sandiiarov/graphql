// @flow

import _ from 'lodash';
import { GraphQLObjectType, GraphQLList, GraphQLInt } from 'graphql';
import GraphQLRouteStop from './RouteStop';
import GraphQLLeg from './Leg';
import GraphQLAirline from './Airline';
import GraphQLPrice from './Price';
import type { GraphqlContextType } from '../services/GraphqlContext';
import FlightDurationInMinutes from '../resolvers/FlightDuration';

import type {
  AirlineType,
  DepartureArrivalType,
  FlightType,
  LegType,
  PriceType,
} from '../Entities';

export default new GraphQLObjectType({
  name: 'Flight',
  fields: {
    airlines: {
      type: new GraphQLList(GraphQLAirline),
      resolve: async (
        { airlines }: FlightType,
        args: Object,
        { dataLoader }: GraphqlContextType,
      ): Promise<Array<?AirlineType>> =>
        _.uniq(airlines).map(airlineCode =>
          dataLoader.airline.load(airlineCode),
        ),
    },

    arrival: {
      type: GraphQLRouteStop,
      resolve: ({ arrival }: FlightType): DepartureArrivalType => arrival,
    },

    departure: {
      type: GraphQLRouteStop,
      resolve: ({ departure }: FlightType): DepartureArrivalType => departure,
    },

    duration: {
      type: GraphQLInt,
      resolve: ({ departure, arrival }: FlightType): ?number =>
        FlightDurationInMinutes(departure, arrival),
    },

    legs: {
      type: new GraphQLList(GraphQLLeg),
      resolve: ({ legs }: FlightType): Array<LegType> => legs,
    },

    price: {
      type: GraphQLPrice,
      resolve: ({ price }: FlightType): PriceType => price,
    },
  },
});
