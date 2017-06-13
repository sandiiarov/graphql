// @flow

import _ from 'lodash';
import { GraphQLObjectType, GraphQLList, GraphQLInt } from 'graphql';
import GraphQLRouteStop from './RouteStop';
import GraphQLLeg from './Leg';
import GraphQLAirline from './Airline';
import GraphQLPrice from './Price';
import type { GraphqlContextType } from '../services/GraphqlContext';
import { flightDurationInMinutes } from '../services/GraphqlResolvers';

import type {
  AirlineType,
  ArrivalType,
  FlightType,
  DepartureType,
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
      resolve: ({ arrival }: FlightType): ArrivalType => arrival,
    },

    departure: {
      type: GraphQLRouteStop,
      resolve: ({ departure }: FlightType): DepartureType => departure,
    },

    duration: {
      type: GraphQLInt,
      resolve: ({ departure, arrival }: FlightType): ?number =>
        flightDurationInMinutes(departure, arrival),
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
