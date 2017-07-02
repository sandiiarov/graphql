// @flow

import type { DepartureArrival, Leg } from './Flight';
import type { Price } from './Price';
import type { AllowedBaggage } from './Baggage';

export type BookingsItem = {
  id: number,
  arrival: DepartureArrival,
  departure: DepartureArrival,
  legs: Array<Leg>,
  price: Price,
  authToken: string,
};

export type Booking = BookingsItem & {
  allowedBaggage: AllowedBaggage,
};
