// @flow

import { GraphQLObjectType, GraphQLBoolean } from 'graphql';

export default new GraphQLObjectType({
  name: 'ResetPasswordResponse',
  fields: {
    success: {
      type: GraphQLBoolean,
    },
  },
});
