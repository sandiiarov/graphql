// @flow

import { GraphQLSchema } from 'graphql';
import RootQuery from './queries/RootQuery';
import RootMutation from './mutations/RootMutation';

export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
