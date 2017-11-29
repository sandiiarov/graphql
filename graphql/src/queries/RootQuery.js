// @flow

import { GraphQLObjectType } from 'graphql';

import AllBookings from './AllBookings';
import AllFlights from './AllFlights';
import AllHotels from './AllHotels';
import AllLocations from './AllLocations';
import Booking from './Booking';
import CurrentUser from './CurrentUser';
import Hotel from './Hotel';

export default new GraphQLObjectType({
  name: 'RootQuery',
  description: 'Root Query',
  fields: {
    allBookings: AllBookings,
    allFlights: AllFlights,
    allHotels: AllHotels,
    allLocations: AllLocations,
    booking: Booking,
    currentUser: CurrentUser,
    hotel: Hotel,
  },
});
