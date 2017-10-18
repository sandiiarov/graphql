// @flow

import type { DepartureArrival, Leg } from './Flight';
import type { Price } from './Price';
import type { AllowedBaggage } from './Baggage';

/**
 * This is fetched from 'bookings' endpoint.
 */
export type BookingsItem = {
  id: number,
  arrival: DepartureArrival,
  departure: DepartureArrival,
  legs: Array<Leg>,
  price: Price,
  authToken: string,
};

/**
 * This is additionally fetched from 'booking/12..' endpoint if needed.
 */
export type Booking = BookingsItem & {
  allowedBaggage: AllowedBaggage,
  assets: BookingAssets,
};

export type BookingAssets = {
  ticketUrl: string,
  invoiceUrl: string,
};
