// @flow

import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from 'graphql';

import type { AirlineType } from '../Entities';

export default new GraphQLObjectType({
  name: 'Airline',
  fields: {
    name: {
      type: GraphQLString,
      resolve: ({ name }: AirlineType): string => name,
    },

    code: {
      type: GraphQLString,
      resolve: ({ code }: AirlineType): string => code,
    },

    logoUrl: {
      type: GraphQLString,
      resolve: ({ logoUrl }: AirlineType): string => logoUrl,
    },

    isLowCost: {
      type: GraphQLBoolean,
      resolve: ({ isLowCost }: AirlineType): boolean => isLowCost,
    },
  },
});
