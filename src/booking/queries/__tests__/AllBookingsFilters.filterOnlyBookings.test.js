// @flow

import MockDate from 'mockdate';

import { filterOnlyBookings } from '../AllBookingsFilters';

beforeEach(() => MockDate.set(2));

const createBooking = milliseconds => ({
  arrival: {
    when: {
      utc: new Date(milliseconds),
    },
  },
});

const timeFrame = {
  PAST: 'past',
  FUTURE: 'future',
};

it('returns only past bookings', () => {
  expect(
    // $FlowExpectedError: we do not need all the booking properties to test this
    filterOnlyBookings(timeFrame.PAST, [
      createBooking(1),
      createBooking(2),
      createBooking(3),
    ]),
  ).toEqual([createBooking(1)]);
});

it('returns only future bookings', () => {
  expect(
    // $FlowExpectedError: we do not need all the booking properties to test this
    filterOnlyBookings(timeFrame.FUTURE, [
      createBooking(1),
      createBooking(2),
      createBooking(3),
    ]),
  ).toEqual([createBooking(2), createBooking(3)]);
});

it('is able to handle no past bookings', () => {
  expect(
    // $FlowExpectedError: we do not need all the booking properties to test this
    filterOnlyBookings(timeFrame.PAST, [
      createBooking(3),
      createBooking(3),
      createBooking(3),
    ]),
  ).toEqual([]);
});

it('is able to handle no future bookings', () => {
  expect(
    // $FlowExpectedError: we do not need all the booking properties to test this
    filterOnlyBookings(timeFrame.FUTURE, [
      createBooking(1),
      createBooking(1),
      createBooking(1),
    ]),
  ).toEqual([]);
});
