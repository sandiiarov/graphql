// @flow

import { connectionArgs, connectionFromPromisedArray } from 'graphql-relay';
import * as R from 'ramda';

import { getCurrencies } from '../api';
import { currencyConnection } from '../types/outputs/CurrencyDetail';

const arrayByID = R.compose(R.sortBy(R.prop('id')), R.values);

const currencyQuery = {
  type: currencyConnection,
  description: 'Currencies used on Kiwi.com frontend',
  args: connectionArgs,
  resolve: async (_: any, args: any) => {
    const data = await getCurrencies();

    return connectionFromPromisedArray(arrayByID(data), args);
  },
};

export default currencyQuery;
