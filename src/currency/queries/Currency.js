// @flow

import { GraphQLNonNull, GraphQLString } from 'graphql';

import currencyType from '../types/outputs/CurrencyDetail';
import type { GraphqlContextType } from '../../common/services/GraphqlContext';

const currencyQuery = {
  type: currencyType,
  description: 'Detail of a currency as used on Kiwi.com frontend',
  args: {
    code: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The currency code used on Kiwi.com frontend',
    },
  },
  resolve: (_: any, args: any, ctx: GraphqlContextType) =>
    ctx.dataLoader.currency.load(args.code),
};

export default currencyQuery;
