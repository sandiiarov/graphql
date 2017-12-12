// @flow

import { GraphQLInputObjectType, GraphQLInt } from 'graphql';

export default new GraphQLInputObjectType({
  name: 'StopoversInput',
  fields: {
    from: {
      type: GraphQLInt,
      description: 'Minimum number of hours of stopover duration.',
    },
    to: {
      type: GraphQLInt,
      description: 'Maximum number of hours of stopover duration.',
    },
  },
});
