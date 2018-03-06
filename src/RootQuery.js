// @flow

import { GraphQLObjectType } from 'graphql';

import AllBookings from './booking/queries/AllBookings';
import AllFlights from './flight/queries/AllFlights';
import AllAvailableHotels from './hotel/queries/AllAvailableHotels';
import AvailableHotel from './hotel/queries/AvailableHotel';
import AllLocations from './location/queries/AllLocations';
import Location from './location/queries/Location';
import Booking from './booking/queries/Booking';
import CurrentUser from './identity/queries/CurrentUser';
import Hotel from './hotel/queries/Hotel';
import HotelCities from './hotel/queries/HotelCities';

export default new GraphQLObjectType({
  name: 'RootQuery',
  description: 'Root Query',
  fields: {
    allBookings: AllBookings,
    allFlights: AllFlights,
    allAvailableHotels: AllAvailableHotels,
    availableHotel: AvailableHotel,
    allLocations: AllLocations,
    location: Location,
    booking: Booking,
    currentUser: CurrentUser,
    hotel: Hotel,
    hotelCities: HotelCities,
  },
});
