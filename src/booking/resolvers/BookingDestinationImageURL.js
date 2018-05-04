// @flow

import { splitLegs } from '../types/outputs/BookingReturn';
import { createTrips } from '../types/outputs/BookingMulticity';
import type { Booking } from '../Booking';

export function getCityId(legs: Object[]) {
  return legs[legs.length - 1].arrival.where.cityId;
}

export function castURL(dimensions: string, cityId: string) {
  return `https://images.kiwi.com/photos/${dimensions}/${cityId}.jpg`;
}

export default (booking: Booking, args: {| dimensions: string |}): string => {
  if (booking.type === 'BookingOneWay') {
    // destination of the last leg
    return castURL(args.dimensions, getCityId(booking.legs));
  } else if (booking.type === 'BookingReturn') {
    // destination of the last outbound leg
    const { outbound } = splitLegs(booking.legs);
    return castURL(args.dimensions, getCityId(outbound.legs));
  } else if (booking.type === 'BookingMulticity') {
    // destination of the last leg of the last trip
    const trips = createTrips(booking.segments || [], booking.legs);
    const legs = trips[trips.length - 1].legs;
    return castURL(args.dimensions, getCityId(legs));
  }

  throw new Error('Unknown booking type.');
};
