// @flow

import DataLoader from 'dataloader';

import IdentityDataloader from '../../identity/dataloaders/Identity';
import createBookingLoader from '../../booking/dataloaders/Booking';
import createAirlineLoader from '../../flight/dataloaders/Airline';
import createRatesLoader from '../dataloaders/Rates';
import BookingsLoader from '../../booking/dataloaders/Bookings';
import LocationSuggestionsLoader from '../../location/dataloaders/LocationSuggestions';
import LocationLoader from '../../location/dataloaders/Location';
import FlightLoader from '../../flight/dataloaders/Flight';
import OptionsStorage from './context/OptionsStorage';
import AllHotelsLoader from '../../hotel/dataloaders/AllHotels';
import SingleHotelLoader from '../../hotel/dataloaders/SingleHotel';

import type { Booking } from '../../booking/Booking';
import type { Airline } from '../../flight/Flight';
import type {
  RequiredParameters as HotelKey,
  HotelType,
} from '../../hotel/dataloaders/AllHotels';

export type GraphqlContextType = {|
  // DataLoader<K, V>
  apiToken: ?string,
  dataLoader: {|
    airline: DataLoader<string, ?Airline>,
    booking: DataLoader<number | string, Booking>,
    bookings: BookingsLoader,
    flight: FlightLoader,
    allHotels: DataLoader<HotelKey, HotelType[]>,
    singleHotel: typeof SingleHotelLoader,
    identity: IdentityDataloader,
    location: LocationLoader,
    locationSuggestions: LocationSuggestionsLoader,
    rates: DataLoader<string, ?number>,
  |},
  options: OptionsStorage,
  opticsContext?: Object,
|};

export function createContext(token: ?string): GraphqlContextType {
  const bookings = new BookingsLoader(token);
  const locationSuggestions = new LocationSuggestionsLoader();
  const location = new LocationLoader(locationSuggestions);

  return {
    apiToken: token,
    dataLoader: {
      airline: createAirlineLoader(),
      booking: createBookingLoader(token, bookings),
      bookings: bookings,
      flight: new FlightLoader(location),
      allHotels: AllHotelsLoader,
      singleHotel: SingleHotelLoader,
      identity: new IdentityDataloader(token),
      location: location,
      locationSuggestions: locationSuggestions,
      rates: createRatesLoader(),
    },
    options: new OptionsStorage(),
  };
}
