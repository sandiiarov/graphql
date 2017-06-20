// @flow

import DataLoader from 'dataloader';
import createIdentityLoader from '../dataLoaders/Identity';
import createBookingLoader from '../dataLoaders/Booking';
import createAirlineLoader from '../dataLoaders/Airline';
import BookingsLoader from '../dataLoaders/Bookings';
import LocationSuggestions from '../dataLoaders/LocationSuggestions';
import Location from '../dataLoaders/Location';
import OptionsStorage from './context/OptionsStorage';

import type { Booking } from '../types/Booking';
import type { Identity } from '../types/User';
import type { Airline } from '../types/Flight';

export type GraphqlContextType = {
  apiToken: ?string,
  dataLoader: {
    airline: DataLoader<string, ?Airline | Error>,
    booking: DataLoader<number | string, Booking>,
    bookings: BookingsLoader,
    identity: DataLoader<string, Identity | Error>,
    location: Location,
    locationSuggestions: LocationSuggestions,
  },
  options: OptionsStorage,
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
    options: new OptionsStorage(),
  };
}
