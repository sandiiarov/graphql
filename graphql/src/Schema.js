import { GraphQLSchema } from 'graphql';
import RootQuery from './queries/RootQuery';

export default new GraphQLSchema({
  query: RootQuery,
});
