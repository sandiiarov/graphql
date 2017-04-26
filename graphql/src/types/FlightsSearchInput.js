// @flow

import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { GraphQLDate } from 'graphql-iso-date';

export default new GraphQLInputObjectType({
  name: 'FlightsSearchInput',
  fields: {
    from: {
      type: new GraphQLNonNull(GraphQLString),
    },
    to: {
      type: new GraphQLNonNull(GraphQLString),
    },
    dateFrom: {
      type: new GraphQLNonNull(GraphQLDate),
    },
    dateTo: {
      type: new GraphQLNonNull(GraphQLDate),
    },
  },
});
