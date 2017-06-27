// @flow

import { GraphQLObjectType, GraphQLString, GraphQLFloat } from 'graphql';

import type { PriceType } from '../Entities';

export default new GraphQLObjectType({
  name: 'Price',
  fields: {
    amount: {
      type: GraphQLFloat,
      resolve: ({ amount }: PriceType): number => amount,
    },

    currency: {
      type: GraphQLString,
      description: 'An ISO-4217 currency code.',
      resolve: ({ currency }: PriceType): string => currency,
    },
  },
});
