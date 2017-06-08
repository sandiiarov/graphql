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
      resolve: ({ currency }: PriceType): string => currency,
    },
  },
});
