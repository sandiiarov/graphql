// @flow

import { GraphQLEnumType } from 'graphql';
import CurrenciesValues from './CurrenciesValues';

export default new GraphQLEnumType({
  name: 'Currency',
  values: CurrenciesValues,
});
