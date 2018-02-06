// @flow

import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from 'graphql';

import type { Airline } from '../../Flight';

export default new GraphQLObjectType({
  name: 'Airline',
  fields: {
    name: {
      type: GraphQLString,
      resolve: ({ name }: Airline): string => name,
    },

    code: {
      type: GraphQLString,
      description: '2-letter IATA code of airline.',
      resolve: ({ code }: Airline): string => code,
    },

    logoUrl: {
      type: GraphQLString,
      resolve: ({ logoUrl }: Airline): string => logoUrl,
    },

    isLowCost: {
      type: GraphQLBoolean,
      description: 'Airline is low cost carrier.',
      resolve: ({ isLowCost }: Airline): boolean => isLowCost,
    },
  },
});
