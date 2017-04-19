// @flow

import { GraphQLObjectType } from 'graphql';

import AllBookings from './AllBookings';
import Booking from './Booking';

export default new GraphQLObjectType({
  name: 'RootQuery',
  description: 'Root Query',
  fields: {
    allBookings: AllBookings,
    booking: Booking,
  },
});
