// @flow

import { GraphQLObjectType } from 'graphql';

import Login from './identity/mutations/Login';
import ResetPassword from './identity/mutations/ResetPassword';
import addFAQArticleComment from './FAQ/mutations/addFAQArticleComment';

export default new GraphQLObjectType({
  name: 'RootMutation',
  description: 'Root Mutation.',
  fields: {
    login: Login,
    resetPassword: ResetPassword,
    addFAQArticleComment,
  },
});
