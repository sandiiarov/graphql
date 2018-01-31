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
import HotelsAvailability from '../../hotel/dataloaders/HotelsAvailability';
import { type SearchParameters as HotelKey } from '../../hotel/dataloaders/flow/SearchParameters';
import HotelByID from '../../hotel/dataloaders/HotelByID';
import HotelCities from '../../hotel/dataloaders/HotelCities';
import HotelRoomsLoader from '../../hotel/dataloaders/HotelRooms';
import HotelRoomAvailabilityLoader from '../../hotel/dataloaders/HotelRoomAvailability';
import HotelRoomBeddingLoader from '../../hotel/dataloaders/RoomBedding';
import PriceStatsLoader from '../../hotel/dataloaders/PriceStats';

import type { Booking } from '../../booking/Booking';
import type { Airline } from '../../flight/Flight';
import type { HotelType } from '../../hotel/dataloaders/flow/HotelType';
import type { HotelCity } from '../../hotel/types/outputs/HotelCity';

/**
 * FIXME: this is stupid - it's already defined by data-loader itself
 */
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
      availabilityByLocation: DataLoader<HotelKey, HotelType[]>,
      availabilityByID: DataLoader<HotelKey, HotelType[]>,
      byID: typeof HotelByID,
      cities: DataLoader<string, HotelCity[]>,
      room: HotelRoomsLoader,
      roomAvailability: HotelRoomAvailabilityLoader,
      roomBedding: typeof HotelRoomBeddingLoader,
      priceStats: DataLoader<
        { searchParams: HotelKey, boundary: 'MAX' | 'MIN' },
        number,
      >,
    },
  |},
  options: OptionsStorage,
  _traceCollector?: Object,
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
        availabilityByLocation: HotelsAvailability,
        availabilityByID: HotelsAvailability,
        byID: HotelByID,
        cities: HotelCities,
        room: new HotelRoomsLoader(),
        roomAvailability: new HotelRoomAvailabilityLoader(),
        roomBedding: HotelRoomBeddingLoader,
        priceStats: PriceStatsLoader,
      },
    },
    options: new OptionsStorage(),
  };
}
