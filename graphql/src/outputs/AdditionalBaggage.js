// @flow

import { GraphQLObjectType, GraphQLInt } from 'graphql';
import GraphQLPrice from './Price';

import type { AdditionalBaggageInfo } from '../types/Baggage';
import type { Price } from '../types/Price';

export default new GraphQLObjectType({
  name: 'AdditionalBaggage',
  fields: {
    price: {
      type: GraphQLPrice,
      resolve: ({ price }: AdditionalBaggageInfo): Price => price,
    },

    quantity: {
      type: GraphQLInt,
      description: 'Number of baggage.',
      resolve: ({ quantity }: AdditionalBaggageInfo): number => quantity,
    },
  },
});
