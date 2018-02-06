// @flow

import { GraphQLObjectType, GraphQLInt } from 'graphql';
import GraphQLPrice from '../../../common/types/outputs/Price';

import type { AdditionalBaggageInfo } from '../../Baggage';
import type { Price } from '../../../common/Price';

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
