// @flow

import { GraphQLInputObjectType, GraphQLBoolean } from 'graphql';
import { GraphQLDate } from 'graphql-iso-date';
import GraphQLDateRange from './DateRangeInput';

export default new GraphQLInputObjectType({
  name: 'DateFromInput',
  fields: {
    exact: {
      type: GraphQLDate,
    },
    range: {
      type: GraphQLDateRange,
    },
    anytime: {
      type: GraphQLBoolean,
    },
  },
});
