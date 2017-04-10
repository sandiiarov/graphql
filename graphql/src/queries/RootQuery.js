// @flow

import { GraphQLObjectType } from 'graphql';
import AllBookings from './AllBookings';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields() {
    return {
      allBookings: AllBookings,
    };
  },
});
