// @flow

import { GraphQLInputObjectType } from 'graphql';
import { GraphQLDate } from 'graphql-iso-date';

export default new GraphQLInputObjectType({
  name: 'DateRangeInput',
  fields: {
    from: {
      type: GraphQLDate,
    },
    to: {
      type: GraphQLDate,
    },
  },
});
