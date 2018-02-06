// @flow

import type { Flight, Leg } from '../Flight';
import { sanitizeRoute } from './RouteSanitizer';

const arrivalPropsMap = {
  utc: 'aTimeUTC',
  local: 'aTime',
  code: 'flyTo',
  cityName: 'cityTo',
};

const departurePropsMap = {
  utc: 'dTimeUTC',
  local: 'dTime',
  code: 'flyFrom',
  cityName: 'cityFrom',
};

export function sanitizeApiResponse(
  flight: Object,
  currency: string,
  passengers: number,
): Flight {
  return {
    id: flight.id,
    airlines: flight.airlines,
    arrival: sanitizeRoute(flight, arrivalPropsMap),
    departure: sanitizeRoute(flight, departurePropsMap),
    legs: flight.route.map((leg): Leg => ({
      id: leg.id,
      recheckRequired: leg.bags_recheck_required,
      flightNo: leg.flight_no,
      departure: sanitizeRoute(leg, departurePropsMap),
      arrival: sanitizeRoute(leg, arrivalPropsMap),
      airlineCode: leg.airline,
    })),
    price: {
      amount: flight.price,
      currency: currency,
    },
    bookingToken: flight.booking_token,
    passengers: passengers,
  };
}
