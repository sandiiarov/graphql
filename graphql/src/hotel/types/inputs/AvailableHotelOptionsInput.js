// @flow

import { GraphQLInputObjectType } from 'graphql';
import GraphQLLocale from '../../../common/types/enums/Currency';

export default new GraphQLInputObjectType({
  name: 'AvailableHotelOptionsInput',
  fields: {
    currency: {
      type: GraphQLLocale,
      description: 'Three-letters ISO 4217 currency code, e.g. EUR or USD',
    },
  },
});
