import { GraphQLObjectType } from 'graphql';
import Bookings from './Bookings';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields() {
    return {
      bookings: Bookings,
    };
  },
});
