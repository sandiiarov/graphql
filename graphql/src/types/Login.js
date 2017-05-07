// @flow

import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import type { LoginType, IdentityType } from '../Entities';
import type { GraphqlContextType } from '../services/GraphqlContext';
import Identity from './Identity';

export default new GraphQLObjectType({
  name: 'Login',
  fields: {
    token: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ token }: LoginType): string => token,
    },

    userId: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: ({ userId }: LoginType): string => userId,
    },

    identity: {
      type: Identity,
      resolve: async (
        { userId }: LoginType,
        args: Object,
        { dataLoader }: GraphqlContextType,
      ): Promise<IdentityType> => dataLoader.identity.load(userId),
    },
  },
});
