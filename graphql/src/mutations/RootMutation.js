// @flow

import { GraphQLObjectType } from 'graphql';

import Login from './Login';

export default new GraphQLObjectType({
  name: 'RootMutation',
  description: 'Root Mutation.',
  fields: {
    login: Login,
  },
});
