// @flow

import { GraphQLInputObjectType } from 'graphql';
import GraphQLLocale from '../../../common/types/enums/Locale';

export default new GraphQLInputObjectType({
  name: 'LocationsOptionsInput',
  fields: {
    locale: {
      type: GraphQLLocale,
    },
  },
});
