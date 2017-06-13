// @flow

import { GraphQLObjectType, GraphQLInt } from 'graphql';
import GraphQLPrice from './Price';

import type { AdditionalBaggageInfoType, PriceType } from '../Entities';

export default new GraphQLObjectType({
  name: 'AdditionalBaggage',
  fields: {
    price: {
      type: GraphQLPrice,
      resolve: ({ price }: AdditionalBaggageInfoType): PriceType => price,
    },

    quantity: {
      type: GraphQLInt,
      resolve: ({ quantity }: AdditionalBaggageInfoType): number => quantity,
    },
  },
});
