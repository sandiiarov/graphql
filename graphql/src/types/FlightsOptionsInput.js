// @flow

import { GraphQLInputObjectType, GraphQLString } from 'graphql';

export default new GraphQLInputObjectType({
  name: 'FlightsOptionsInput',
  fields: {
    currency: {
      type: GraphQLString,
    },
  },
});
