// @flow

import { GraphQLObjectType, GraphQLString, GraphQLFloat } from 'graphql';

import type { Price } from '../../Price';

export default new GraphQLObjectType({
  name: 'Price',
  fields: {
    amount: {
      type: GraphQLFloat,
      resolve: ({ amount }: Price): number => amount,
    },

    currency: {
      type: GraphQLString,
      description: 'An ISO-4217 currency code.',
      resolve: ({ currency }: Price): string => currency,
    },
  },
});
