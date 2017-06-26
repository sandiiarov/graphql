// @flow

import { GraphQLInputObjectType, GraphQLBoolean } from 'graphql';
import { GraphQLDate } from 'graphql-iso-date';
import GraphQLDateRange from './DateRangeInput';
import GraphQLTimeToStay from './TimeToStay';

export default new GraphQLInputObjectType({
  name: 'DateToInput',
  fields: {
    exact: {
      type: GraphQLDate,
    },
    range: {
      type: GraphQLDateRange,
    },
    timeToStay: {
      type: GraphQLTimeToStay,
    },
    anytime: {
      type: GraphQLBoolean,
    },
  },
});
