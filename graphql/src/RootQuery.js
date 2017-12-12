// @flow

import { GraphQLObjectType } from 'graphql';

import AllBookings from './booking/queries/AllBookings';
import AllFlights from './flight/queries/AllFlights';
import AllHotels from './queries/AllHotels';
import AllLocations from './location/queries/AllLocations';
import Booking from './booking/queries/Booking';
import CurrentUser from './identity/queries/CurrentUser';
import Hotel from './queries/Hotel';

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
