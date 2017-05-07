// @flow

import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import type { LoginType, IdentityType } from '../Entities';
import type { GraphqlContextType } from '../services/GraphqlContext';
import Identity from './Identity';

export default new GraphQLObjectType({
  name: 'User',
  fields: {
    token: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ token }: LoginType): string => token,
    },

    isLoggedIn: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: ({ token }: LoginType): boolean => typeof token === 'string',
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
