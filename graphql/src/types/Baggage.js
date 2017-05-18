// @flow

import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';

import type { BaggageType } from '../Entities';

export default new GraphQLObjectType({
  name: 'Baggage',
  fields: {
    height: {
      type: GraphQLInt,
      resolve: ({ height }: BaggageType) => height,
    },

    length: {
      type: GraphQLInt,
      resolve: ({ length }: BaggageType) => length,
    },

    width: {
      type: GraphQLInt,
      resolve: ({ width }: BaggageType) => width,
    },

    weight: {
      type: GraphQLInt,
      resolve: ({ weight }: BaggageType) => weight,
    },

    note: {
      type: GraphQLString,
      resolve: ({ note }: BaggageType) => note,
    },
  },
});
