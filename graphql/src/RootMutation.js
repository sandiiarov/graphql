// @flow

import { GraphQLObjectType } from 'graphql';

import Login from './identity/mutations/Login';

export default new GraphQLObjectType({
  name: 'RootMutation',
  description: 'Root Mutation.',
  fields: {
    login: Login,
  },
});
