// @flow

import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';
import { toGlobalId } from '../services/OpaqueIdentifier';
import type { IdentityType } from '../Entities';

export default new GraphQLObjectType({
  name: 'Identity',
  fields: {
    id: {
      type: GraphQLID,
      resolve: ({ userId }: IdentityType): string =>
        toGlobalId('identity', userId),
    },

    databaseId: {
      type: GraphQLString,
      description: 'Internal database ID.',
      deprecationReason: 'Use id field instead.',
      resolve: ({ userId }: IdentityType): string => userId,
    },

    email: {
      type: GraphQLString,
      description: 'Raw input by user, use "login" if you want normalized email.',
      resolve: ({ email }: IdentityType): string => email,
    },

    emailVerified: {
      type: GraphQLBoolean,
      resolve: ({ emailVerified }: IdentityType): boolean => emailVerified,
    },

    firstName: {
      type: GraphQLString,
      resolve: ({ firstName }: IdentityType) => firstName,
    },

    lastName: {
      type: GraphQLString,
      resolve: ({ lastName }: IdentityType) => lastName,
    },

    fullName: {
      type: GraphQLString,
      description: 'Concatenation of first and last name with fallback to the login field.',
      resolve: ({ firstName, lastName, login }: IdentityType): string => {
        if (firstName === null && lastName === null) {
          return login;
        }
        return [firstName, lastName].filter(word => word !== null).join(' ');
      },
    },

    login: {
      type: GraphQLString,
      description: 'Use this in API calls. It is email but normalized.',
      resolve: ({ login }: IdentityType): string => login,
    },
  },
});
