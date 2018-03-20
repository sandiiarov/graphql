// @flow

import type { Flight, Leg } from '../Flight';
import { sanitizeRoute } from './RouteSanitizer';

export function sanitizeApiResponse(
  flight: Object,
  currency: string,
  passengers: number,
): Flight {
  return {
    id: flight.id,
    airlines: flight.airlines,
    arrival: sanitizeRoute({
      utc: flight.aTimeUTC,
      local: flight.aTime,
      code: flight.flyTo,
      cityName: flight.cityTo,
    }),
    departure: sanitizeRoute({
      utc: flight.dTimeUTC,
      local: flight.dTime,
      code: flight.flyFrom,
      cityName: flight.cityFrom,
    }),
    legs: flight.route.map((leg): Leg => ({
      id: leg.id,
      recheckRequired: leg.bags_recheck_required,
      flightNo: leg.flight_no,
      departure: sanitizeRoute({
        utc: leg.dTimeUTC,
        local: leg.dTime,
        code: leg.flyFrom,
        cityName: leg.cityFrom,
      }),
      arrival: sanitizeRoute({
        utc: leg.aTimeUTC,
        local: leg.aTime,
        code: leg.flyTo,
        cityName: leg.cityTo,
      }),
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
