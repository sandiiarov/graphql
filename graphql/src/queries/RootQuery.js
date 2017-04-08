import { GraphQLObjectType } from 'graphql';
import Flight from './Flight';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields() {
    return {
      flight: Flight,
    };
  },
});
