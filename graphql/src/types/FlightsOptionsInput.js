// @flow

import { GraphQLInputObjectType } from 'graphql';
import GraphQLCurrency from '../types/Currency';

export default new GraphQLInputObjectType({
  name: 'FlightsOptionsInput',
  fields: {
    currency: {
      type: GraphQLCurrency,
    },
  },
});
