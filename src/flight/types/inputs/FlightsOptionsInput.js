// @flow

import { GraphQLInputObjectType } from 'graphql';
import GraphQLCurrency from '../../../common/types/enums/Currency';
import GraphQLLocale from '../../../common/types/enums/Locale';

export default new GraphQLInputObjectType({
  name: 'FlightsOptionsInput',
  fields: {
    currency: {
      type: GraphQLCurrency,
      description: 'An ISO-4217 currency code.',
    },
    locale: {
      type: GraphQLLocale,
    },
  },
});
