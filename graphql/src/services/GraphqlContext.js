// @flow

import DataLoader from 'dataloader';
import createIdentityLoader from '../dataLoaders/Identity';
import createBookingLoader from '../dataLoaders/Booking';
import BookingsLoader from '../dataLoaders/Bookings';
import type { IdentityType, BookingType } from '../Entities';

export type GraphqlContextType = {
  apiToken: ?string,
  dataLoader: {
    booking: DataLoader<number | string, BookingType>,
    bookings: BookingsLoader,
    identity: DataLoader<string, IdentityType>,
  },
};

export function createContext(token: ?string): GraphqlContextType {
  const bookings = new BookingsLoader(token);
  return {
    apiToken: token,
    dataLoader: {
      booking: createBookingLoader(token, bookings),
      bookings: bookings,
      identity: createIdentityLoader(token),
    },
  };
}
