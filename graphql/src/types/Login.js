// @flow

import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { toGlobalId } from '../services/OpaqueIdentifier';
import type { LoginType } from '../Entities';

export default new GraphQLObjectType({
  name: 'Login',
  fields: {
    token: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ token }: LoginType): string => token,
    },

    userId: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: ({ userId }: LoginType): string => toGlobalId('user', userId),
    },
  },
});
