// @flow

import { GraphQLInputObjectType } from 'graphql';
import GraphQLLocale from '../enums/Locale';

export default new GraphQLInputObjectType({
  name: 'LocationsOptionsInput',
  fields: {
    locale: {
      type: GraphQLLocale,
    },
  },
});
