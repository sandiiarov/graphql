// @flow

import type { BookingsItemType, BookingType, LegType } from '../../Entities';

export function sanitizeListItem(apiData: Object): BookingsItemType {
  return {
    id: parseInt(apiData.bid),
    arrival: parseRouteEndpoint(apiData.arrival),
    departure: parseRouteEndpoint(apiData.departure),
    legs: apiData.flights.map((flight): LegType => ({
      id: flight.id,
      recheckRequired: flight.bags_recheck_required,
      flightNo: flight.flight_no,
      departure: parseRouteEndpoint(flight.departure),
      arrival: parseRouteEndpoint(flight.arrival),
      airline: flight.airline.iata,
    })),
    authToken: apiData.auth_token,
  };
}

export function sanitizeDetail(apiData: Object): BookingType {
  const common = sanitizeListItem(apiData);
  const { bag_params } = apiData;
  return {
    ...common,
    allowedBaggage: {
      cabin: [
        {
          height: bag_params.hand_height,
          length: bag_params.hand_length,
          width: bag_params.hand_width,
          weight: bag_params.hand_weight,
          note: bag_params.hand_note === '' ? null : bag_params.hand_note,
        },
        {
          height: bag_params.hand2_height,
          length: bag_params.hand2_length,
          width: bag_params.hand2_width,
          weight: bag_params.hand2_weight,
          note: bag_params.hand2_note === '' ? null : bag_params.hand2_note,
        },
      ],
      checked: [
        {
          height: bag_params.hold_height,
          length: bag_params.hold_length,
          width: bag_params.hold_width,
          weight: bag_params.hold_weight,
          note: bag_params.note === '' ? null : bag_params.note,
        },
      ],
    },
  };
}

function parseWhen(data: Object | number): ?Object {
  if (typeof data === 'number') return null;
  return {
    utc: new Date(data.utc * 1000),
    local: new Date(data.local * 1000),
  };
}

function parseRouteEndpoint(data: Object): Object {
  return {
    when: parseWhen(data.when),
    where: {
      code: data.where.code,
      name: data.where.name,
    },
  };
}
