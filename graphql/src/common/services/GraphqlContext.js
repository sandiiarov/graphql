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
import HotelsByLocation from '../../hotel/dataloaders/HotelsByLocation';
import HotelByID from '../../hotel/dataloaders/HotelByID';
import HotelRoomsLoader from '../../hotel/dataloaders/HotelRooms';
import HotelRoomAvailabilityLoader from '../../hotel/dataloaders/HotelRoomAvailability';

import type { Booking } from '../../booking/Booking';
import type { Airline } from '../../flight/Flight';
import type { SearchParameters as HotelKey } from '../../hotel/dataloaders/HotelsByLocation';
import type { HotelType } from '../../hotel/dataloaders/flow/HotelType';

export type GraphqlContextType = {|
  // DataLoader<K, V>
  apiToken: ?string,
  dataLoader: {|
    airline: DataLoader<string, ?Airline>,
    booking: DataLoader<number | string, Booking>,
    bookings: BookingsLoader,
    flight: FlightLoader,
    identity: IdentityDataloader,
    location: LocationLoader,
    locationSuggestions: LocationSuggestionsLoader,
    rates: DataLoader<string, ?number>,
    hotel: {
      byLocation: DataLoader<HotelKey, HotelType[]>,
      byId: typeof HotelByID,
      room: HotelRoomsLoader,
      roomAvailability: HotelRoomAvailabilityLoader,
    },
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
      identity: new IdentityDataloader(token),
      location: location,
      locationSuggestions: locationSuggestions,
      rates: createRatesLoader(),
      hotel: {
        byLocation: HotelsByLocation,
        byId: HotelByID,
        room: new HotelRoomsLoader(),
        roomAvailability: new HotelRoomAvailabilityLoader(),
      },
    },
    options: new OptionsStorage(),
  };
}
