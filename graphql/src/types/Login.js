// @flow

import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import type { LoginType } from '../Entities';

export default new GraphQLObjectType({
  name: 'Login',
  fields: {
    token: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ token }: LoginType): string => token,
    },

    userId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ userId }: LoginType): string => userId,
    },
  },
});
