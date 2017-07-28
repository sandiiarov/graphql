// @flow

import { GraphQLInputObjectType, GraphQLInt } from 'graphql';

export default new GraphQLInputObjectType({
  name: 'FlightsFiltersInput',
  fields: {
    maxStopovers: {
      type: GraphQLInt,
    },
  },
});
