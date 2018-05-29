// @flow

import idx from 'idx';

import type { BookingsItem } from '../Booking';

export const getDepartureDate = (booking: BookingsItem): Date => {
  const utc = idx(booking.departure, _ => _.when.utc);
  if (utc != null) {
    return new Date(utc);
  }
  throw Error('Flight does not contain a departure date.');
};

export const sortBookingsByDate = (
  bookings: Array<BookingsItem>,
): Array<BookingsItem> => {
  return bookings.sort((a: BookingsItem, b: BookingsItem) => {
    const dateA = getDepartureDate(a);
    const dateB = getDepartureDate(b);

    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
    // a must be equal to b
    return 0;
  });
};
