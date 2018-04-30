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
  resolve: async (_: any, args: any, ctx: GraphqlContextType) => {
    const data = await ctx.dataLoader.currency.load(args.code);
    if (!data) {
      throw new Error(`Currency with code "${args.code}" not found`);
    }

    return data;
  },
};

export default currencyQuery;
