// @flow

import { GraphQLObjectType } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';
import Location from './Location';

import type { DepartureArrival } from '../types/Flight';
import type { Location as LocationType } from '../types/Location';
import type { GraphqlContextType } from '../services/GraphqlContext';

export default new GraphQLObjectType({
  name: 'RouteStop',
  fields: {
    airport: {
      type: Location,
      resolve: (
        { where }: DepartureArrival,
        args: Object,
        context: GraphqlContextType,
      ): Promise<LocationType> => context.dataLoader.location.load(where.code),
    },

    time: {
      type: GraphQLDateTime,
      resolve: ({ when }: DepartureArrival): ?Date =>
        when == null ? null : when.utc, // intentional ==, can be null or undefined
    },

    localTime: {
      type: GraphQLDateTime,
      resolve: ({ when }: DepartureArrival): ?Date =>
        when == null ? null : when.local, // intentional ==, can be null or undefined
    },
  },
});
