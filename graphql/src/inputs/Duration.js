// @flow

import { GraphQLInputObjectType, GraphQLInt } from 'graphql';
import GraphQLStopovers from './Stopovers';

export default new GraphQLInputObjectType({
  name: 'DurationInput',
  fields: {
    stopovers: {
      type: GraphQLStopovers,
    },
    maxFlightDuration: {
      type: GraphQLInt,
    },
  },
});
