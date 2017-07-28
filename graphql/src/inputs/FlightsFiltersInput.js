// @flow

import { GraphQLInputObjectType, GraphQLInt } from 'graphql';
import GraphQLDuration from './Duration';

export default new GraphQLInputObjectType({
  name: 'FlightsFiltersInput',
  fields: {
    maxStopovers: {
      type: GraphQLInt,
    },
    duration: {
      type: GraphQLDuration,
    },
  },
});
