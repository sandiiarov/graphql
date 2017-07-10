// @flow

import { sanitizeRoute } from '../flight/RouteSanitizer';

import type { BookingsItem, Booking } from '../../types/Booking';
import type { Leg } from '../../types/Flight';

const routePropsMap = {
  utc: 'when.utc',
  local: 'when.local',
  code: 'where.code',
  cityName: 'where.name',
};

export function sanitizeListItem(apiData: Object): BookingsItem {
  return {
    id: parseInt(apiData.bid),
    arrival: sanitizeRoute(apiData.arrival, routePropsMap),
    departure: sanitizeRoute(apiData.departure, routePropsMap),
    legs: apiData.flights.map((flight): Leg => ({
      id: flight.id,
      recheckRequired: flight.bags_recheck_required,
      flightNo: flight.flight_no,
      departure: sanitizeRoute(flight.departure, routePropsMap),
      arrival: sanitizeRoute(flight.arrival, routePropsMap),
      airlineCode: flight.airline.iata,
    })),
    price: {
      amount: apiData.original_price,
      currency: apiData.original_currency,
    },
    authToken: apiData.auth_token,
  };
}

export function sanitizeDetail(apiData: Object): Booking {
  const common = sanitizeListItem(apiData);
  const { bag_params } = apiData;
  return {
    ...common,
    allowedBaggage: {
      additionalBaggage: parseAdditionalBaggage(
        apiData.additional_bags_prices,
        apiData.currency,
      ),
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

function parseAdditionalBaggage(
  additionalBagsPrices: Object,
  currency: string,
) {
  const additionalBaggage = [];
  for (const quantity in additionalBagsPrices) {
    additionalBaggage.push({
      price: {
        amount: additionalBagsPrices[quantity],
        currency: currency,
      },
      quantity: Number(quantity),
    });
  }
  return additionalBaggage;
}
