// @flow

import _ from 'lodash';
import { GraphQLObjectType, GraphQLNonNull, GraphQLList } from 'graphql';
import GraphQLRouteStop from './RouteStop';
import GraphQLLeg from './Leg';
import GraphQLAirline from './Airline';
import { createAirline } from '../dataLoaders/Airline';

import type {
  AirlineType,
  ArrivalType,
  FlightType,
  DepartureType,
  LegType,
} from '../Entities';

export default new GraphQLObjectType({
  name: 'Flight',
  fields: {
    airlines: {
      type: new GraphQLList(GraphQLAirline),
      resolve: ({ airlines }: FlightType): Array<AirlineType> =>
        _.uniq(airlines).map(airlineCode => createAirline(airlineCode)),
    },

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
