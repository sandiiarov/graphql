// @flow

import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from 'graphql';
import Identity from './Identity';

import type { Login } from '../../User';
import type { GraphqlContextType } from '../../../services/GraphqlContext';

export default new GraphQLObjectType({
  name: 'User',
  fields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }: Login): string => token,
    },

    isLoggedIn: {
      type: GraphQLBoolean,
      resolve: ({ token }: Login): boolean => typeof token === 'string',
    },

    identity: {
      type: Identity,
      resolve: async (
        { userId }: Login,
        args: Object,
        { dataLoader }: GraphqlContextType,
      ) => dataLoader.identity.load(userId),
    },
  },
});
