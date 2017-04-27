// @flow

import { GraphQLObjectType } from 'graphql';

import AllBookings from './AllBookings';
import Booking from './Booking';
import AllFlights from './AllFlights';
import AllPlaces from './AllPlaces';

export default new GraphQLObjectType({
  name: 'RootQuery',
  description: 'Root Query',
  fields: {
    allBookings: AllBookings,
    booking: Booking,
    allFlights: AllFlights,
    allPlaces: AllPlaces,
  },
});
