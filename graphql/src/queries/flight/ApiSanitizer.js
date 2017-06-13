// @flow

import type { FlightType, LegType } from '../../Entities';

export type FlightsMetadataType = {
  currency: string,
};

export function sanitizeApiResponse(
  flight: Object,
  flightsMetadata: FlightsMetadataType,
): FlightType {
  return {
    id: flight.id,
    airlines: flight.airlines,
    arrival: {
      when: {
        utc: new Date(flight.aTimeUTC * 1000),
        local: new Date(flight.aTime * 1000),
      },
      where: {
        code: flight.flyTo,
        cityName: flight.cityTo,
      },
    },
    departure: {
      when: {
        utc: new Date(flight.dTimeUTC * 1000),
        local: new Date(flight.dTime * 1000),
      },
      where: {
        code: flight.flyFrom,
        cityName: flight.cityFrom,
      },
    },
    legs: flight.route.map((leg): LegType => ({
      id: leg.id,
      recheckRequired: leg.bags_recheck_required,
      flightNo: leg.flight_no,
      departure: {
        when: {
          utc: new Date(leg.dTimeUTC * 1000),
          local: new Date(leg.dTime * 1000),
        },
        where: {
          code: leg.flyFrom,
          cityName: leg.cityFrom,
        },
      },
      arrival: {
        when: {
          utc: new Date(leg.aTimeUTC * 1000),
          local: new Date(leg.aTime * 1000),
        },
        where: {
          code: leg.flyTo,
          cityName: leg.cityTo,
        },
      },
      airlineCode: leg.airline,
    })),
    price: {
      amount: flight.price,
      currency: flightsMetadata.currency,
    },
  };
}
