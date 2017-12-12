// @flow

import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from 'graphql';
import { globalIdField } from '../../../services/OpaqueIdentifier';

import type { Identity } from '../../User';

export default new GraphQLObjectType({
  name: 'Identity',
  fields: {
    id: globalIdField('identity', ({ userId }: Identity) => userId),

    databaseId: {
      type: GraphQLString,
      description: 'Internal database ID.',
      deprecationReason: 'Use id field instead.',
      resolve: ({ userId }: Identity): string => userId,
    },

    email: {
      type: GraphQLString,
      description:
        'Raw input by user, use "login" if you want normalized email.',
      resolve: ({ email }: Identity): string => email,
    },

    emailVerified: {
      type: GraphQLBoolean,
      resolve: ({ emailVerified }: Identity): boolean => emailVerified,
    },

    firstName: {
      type: GraphQLString,
      resolve: ({ firstName }: Identity) => firstName,
    },

    lastName: {
      type: GraphQLString,
      resolve: ({ lastName }: Identity) => lastName,
    },

    fullName: {
      type: GraphQLString,
      description:
        'Concatenation of first and last name with fallback to the login field.',
      resolve: ({ firstName, lastName, login }: Identity): string => {
        if (firstName === null && lastName === null) {
          return login;
        }
        return [firstName, lastName].filter(word => word !== null).join(' ');
      },
    },

    login: {
      type: GraphQLString,
      description: 'Use this in API calls. It is email but normalized.',
      resolve: ({ login }: Identity): string => login,
    },
  },
});
