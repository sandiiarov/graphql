// @flow

import { GraphQLObjectType } from 'graphql';

import Login from './identity/mutations/Login';
import addFAQArticleComment from './FAQ/mutations/addFAQArticleComment';

export default new GraphQLObjectType({
  name: 'RootMutation',
  description: 'Root Mutation.',
  fields: {
    login: Login,
    addFAQArticleComment,
  },
});
