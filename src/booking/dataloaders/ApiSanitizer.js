// @flow

import idx from 'idx';

import { sanitizeRoute } from '../../flight/dataloaders/RouteSanitizer';
import type { BookingsItem, Booking, BookingType } from '../Booking';
import type { Leg } from '../../flight/Flight';

/**
 * Implementation details (weirdnesses) explained:
 *
 * arrival: computed from the last flight leg because API returns "0" for times
 * departure: computed from the first flight leg because API returns "0" for times
 */
export function sanitizeListItem(apiData: Object): BookingsItem {
  const legs = apiData.flights.map((flight): Leg => ({
    id: flight.id,
    recheckRequired: flight.bags_recheck_required,
    isReturn: flight.return === 1,
    flightNo: flight.flight_no,
    departure: sanitizeRoute({
      utc: idx(flight.departure, _ => _.when.utc),
      local: idx(flight.departure, _ => _.when.local),
      code: idx(flight.departure, _ => _.where.code),
      cityName: idx(flight.departure, _ => _.where.name),
      cityId: idx(flight.departure, _ => _.where.city_id),
    }),
    arrival: sanitizeRoute({
      utc: idx(flight.arrival, _ => _.when.utc),
      local: idx(flight.arrival, _ => _.when.local),
      code: idx(flight.arrival, _ => _.where.code),
      cityName: idx(flight.arrival, _ => _.where.name),
      cityId: idx(flight.arrival, _ => _.where.city_id),
    }),
    airlineCode: flight.airline.iata,
  }));
  const lastLeg = legs[legs.length - 1];
  const firstLeg = legs[0];

  return {
    id: parseInt(apiData.bid),
    departure: firstLeg.departure,
    arrival: lastLeg.arrival,
    legs,
    price: {
      amount: apiData.original_price,
      currency: apiData.original_currency,
    },
    authToken: apiData.auth_token,
    status: apiData.status,
    type: detectType(apiData),
    segments: apiData.segments,
    passengerCount: apiData.passengers.length,
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
    assets: {
      ticketUrl: apiData.assets.eticket,
      invoiceUrl: apiData.assets.invoice,
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

function detectType(apiData): BookingType {
  if (Array.isArray(apiData.flights)) {
    const returnFlight = apiData.flights.find(flight => flight.return === 1);

    if (returnFlight) {
      return 'BookingReturn';
    }
  }

  if (Array.isArray(apiData.segments) && apiData.segments.length) {
    return 'BookingMulticity';
  }

  return 'BookingOneWay';
}
