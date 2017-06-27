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
      description: '2-letter IATA code of airline.',
      resolve: ({ code }: AirlineType): string => code,
    },

    logoUrl: {
      type: GraphQLString,
      resolve: ({ logoUrl }: AirlineType): string => logoUrl,
    },

    isLowCost: {
      type: GraphQLBoolean,
      description: 'Airline is low cost carrier.',
      resolve: ({ isLowCost }: AirlineType): boolean => isLowCost,
    },
  },
});
