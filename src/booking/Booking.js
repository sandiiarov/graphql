// @flow

import type { DepartureArrival, Leg } from '../flight/Flight';
import type { Price } from '../common/types/Price';
import type { AllowedBaggage } from './Baggage';
import type { TripData } from './types/outputs/Trip';

/**
 * This is fetched from 'bookings' endpoint.
 */
export type BookingType =
  | 'BookingOneWay'
  | 'BookingReturn'
  | 'BookingMulticity';

export type BookingsItem = {
  id: number,
  arrival: DepartureArrival,
  departure: DepartureArrival,
  legs: Array<Leg>,
  price: Price,
  authToken: string,
  status: string,
  type: BookingType,
  passengerCount: number,
  trips?: TripData[],
  inbound?: TripData,
  outbound?: TripData,
};

export type BookedService = {|
  category: string,
  status: string,
|};

/**
 * This is additionally fetched from 'booking/12..' endpoint if needed.
 */
export type Booking = BookingsItem & {
  allowedBaggage: AllowedBaggage,
  assets: BookingAssets,
  bookedServices: BookedService[],
};

export type BookingAssets = {
  ticketUrl: string,
  invoiceUrl: string,
};
