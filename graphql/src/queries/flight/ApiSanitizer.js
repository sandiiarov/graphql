// @flow

import type { FlightType, LegType } from '../../Entities';

export type FlightsMetadataType = {
  currency: string,
};

export function sanitizeApiResponse(
  singleFlight: Object,
  flightsMetadata: FlightsMetadataType,
): FlightType {
  return {
    id: singleFlight.id,
    airlines: singleFlight.airlines,
    arrival: {
      when: {
        utc: new Date(singleFlight.aTimeUTC * 1000),
        local: new Date(singleFlight.aTime * 1000),
      },
      where: {
        code: singleFlight.flyTo,
        cityName: singleFlight.cityTo,
      },
    },
    departure: {
      when: {
        utc: new Date(singleFlight.dTimeUTC * 1000),
        local: new Date(singleFlight.dTime * 1000),
      },
      where: {
        code: singleFlight.flyFrom,
        cityName: singleFlight.cityFrom,
      },
    },
    legs: singleFlight.route.map((leg): LegType => ({
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
      amount: singleFlight.price,
      currency: flightsMetadata.currency,
    },
  };
}
