// @flow

import idx from 'idx';
import { DateTime } from 'luxon';

import type { BookingTimelineEvent } from '../BookingTimeline';
import type { Booking } from '../Booking';
import type { Leg } from '../../flight/Flight';

export default function generateEventsFrom(
  booking: Booking,
): $ReadOnlyArray<BookingTimelineEvent> {
  const events = [];

  const bookedFlightEvent = generateBookedFlightEvent(booking);
  const bookingConfirmedEvent = generateBookingConfirmedEvent(booking);
  const paymentConfirmedEvent = generatePaymentConfirmedEvent(booking);
  const downloadReceiptEvent = generateDownloadReceiptEvent(booking);
  const downloadETicketEvent = generateDownloadETicketEvent(booking);
  const leaveForAirportEvent = generateLeaveForAirportEvent(booking);
  const airportArrivalEvent = generateAirportArrivalEvent(booking);

  if (bookedFlightEvent) events.push(bookedFlightEvent);
  if (bookingConfirmedEvent) events.push(bookingConfirmedEvent);
  if (paymentConfirmedEvent) events.push(paymentConfirmedEvent);
  if (downloadReceiptEvent) events.push(downloadReceiptEvent);
  if (downloadETicketEvent) events.push(downloadETicketEvent);
  if (leaveForAirportEvent) events.push(leaveForAirportEvent);
  if (airportArrivalEvent) events.push(airportArrivalEvent);

  if (booking.legs) {
    booking.legs.forEach(leg => {
      const boardingEvent = generateBoardingEvent(leg);
      if (boardingEvent) events.push(boardingEvent);

      const departureEvent = generateDepartureEvent(leg);
      if (departureEvent) events.push(departureEvent);

      const arrivalEvent = generateArrivalEvent(leg);
      if (arrivalEvent) events.push(arrivalEvent);
    });
  }

  const transportFromAirportEvent = generateTransportFromAirportEvent(booking);
  if (transportFromAirportEvent) events.push(transportFromAirportEvent);

  return events;
}

export function generateBookedFlightEvent(
  booking: Booking,
): BookingTimelineEvent {
  return {
    timestamp: booking.created,
    type: 'BookedFlight',
  };
}

export function generateBookingConfirmedEvent(
  booking: Booking,
): ?BookingTimelineEvent {
  if (booking.status === 'confirmed')
    return {
      timestamp: booking.created,
      type: 'BookingConfirmed',
    };
  return null;
}

export function generatePaymentConfirmedEvent(
  booking: Booking,
): ?BookingTimelineEvent {
  if (booking.status)
    return {
      timestamp: booking.created,
      type: 'PaymentConfirmed',
    };
  return null;
}

export function generateDownloadReceiptEvent(
  booking: Booking,
): ?BookingTimelineEvent {
  const invoiceUrl = idx(booking.assets, _ => _.invoiceUrl) || '';
  return {
    timestamp: booking.created,
    type: 'DownloadReceipt',
    data: invoiceUrl,
  };
}

export function generateDownloadETicketEvent(
  booking: Booking,
): ?BookingTimelineEvent {
  const ticketUrl = idx(booking.assets, _ => _.ticketUrl) || '';
  return {
    timestamp: booking.created,
    type: 'DownloadETicket',
    data: ticketUrl,
  };
}

export function generateLeaveForAirportEvent(
  booking: Booking,
): ?BookingTimelineEvent {
  const localDepartureTime = idx(booking.departure, _ => _.when.local);
  if (localDepartureTime) {
    const leaveForAiportTime = DateTime.fromJSDate(localDepartureTime, {
      zone: 'UTC',
    })
      .minus({
        hours: 4,
      })
      .toJSDate();
    return {
      timestamp: leaveForAiportTime,
      type: 'LeaveForAirport',
    };
  }
  return null;
}

export function generateAirportArrivalEvent(
  booking: Booking,
): ?BookingTimelineEvent {
  const localDepartureTime = idx(booking.departure, _ => _.when.local);
  if (localDepartureTime) {
    const cityName = idx(booking.departure, _ => _.where.cityName) || '';
    const AiportArrivalTime = DateTime.fromJSDate(localDepartureTime, {
      zone: 'UTC',
    })
      .minus({
        hours: 2,
      })
      .toJSDate();
    return {
      timestamp: AiportArrivalTime,
      type: 'AirportArrival',
      data: cityName,
    };
  }
  return null;
}

export function generateBoardingEvent(leg: Leg): ?BookingTimelineEvent {
  const localDepartureTime = idx(leg, _ => _.departure.when.local);
  if (localDepartureTime) {
    const BoardingTime = DateTime.fromJSDate(localDepartureTime, {
      zone: 'UTC',
    })
      .minus({
        minutes: 30,
      })
      .toJSDate();
    return {
      timestamp: BoardingTime,
      type: 'Boarding',
      data: 'gate number', // @TODO Gate Number does not seem available for now...
    };
  }
  return null;
}

export function generateDepartureEvent(leg: Leg): ?BookingTimelineEvent {
  const departureTime = idx(leg, _ => _.departure.when.local);
  if (departureTime) {
    const cityName = idx(leg, _ => _.departure.where.cityName) || '';
    return {
      timestamp: departureTime,
      type: 'Departure',
      data: cityName,
    };
  }
  return null;
}

export function generateArrivalEvent(leg: Leg): ?BookingTimelineEvent {
  const arrivalTime = idx(leg, _ => _.arrival.when.local);
  if (arrivalTime) {
    const cityName = idx(leg, _ => _.arrival.where.cityName) || '';
    return {
      timestamp: arrivalTime,
      type: 'Arrival',
      data: cityName,
    };
  }
  return null;
}

export function generateTransportFromAirportEvent(
  booking: Booking,
): ?BookingTimelineEvent {
  const arrivalTime = idx(booking.arrival, _ => _.when.local);
  if (arrivalTime) {
    const transportFromAirportTime = DateTime.fromJSDate(arrivalTime, {
      zone: 'UTC',
    })
      .plus({ minutes: 15 })
      .toJSDate();
    return {
      timestamp: transportFromAirportTime,
      type: 'TransportFromAirport',
    };
  }
  return null;
}
