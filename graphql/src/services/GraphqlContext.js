// @flow

import DataLoader from 'dataloader';
import createIdentityLoader from '../dataLoaders/Identity';
import createBookingLoader from '../dataLoaders/Booking';
import createAirlineLoader from '../dataLoaders/Airline';
import BookingsLoader from '../dataLoaders/Bookings';
import LocationSuggestions from '../dataLoaders/LocationSuggestions';
import Location from '../dataLoaders/Location';

import type { IdentityType, BookingType, AirlineType } from '../Entities';

export type GraphqlContextType = {
  apiToken: ?string,
  dataLoader: {
    airline: DataLoader<string, ?AirlineType>,
    booking: DataLoader<number | string, BookingType>,
    bookings: BookingsLoader,
    identity: DataLoader<string, IdentityType>,
    location: Location,
    locationSuggestions: LocationSuggestions,
  },
};

export function createContext(token: ?string): GraphqlContextType {
  const bookings = new BookingsLoader(token);
  const locationSuggestions = new LocationSuggestions();
  return {
    apiToken: token,
    dataLoader: {
      airline: createAirlineLoader(),
      booking: createBookingLoader(token, bookings),
      bookings: bookings,
      identity: createIdentityLoader(token),
      location: new Location(locationSuggestions),
      locationSuggestions: locationSuggestions,
    },
  };
}
