// @flow

import { compareAsc } from '../FlightDatesValidator';

it('returns "+1" for left date after right date', () => {
  expect(compareAsc(new Date(2043), new Date(2000))).toBe(1);
});

it('returns "-1" for left date before right date', () => {
  expect(compareAsc(new Date(2000), new Date(2043))).toBe(-1);
});

it('returns "0" for same dates', () => {
  expect(compareAsc(new Date(2000), new Date(2000))).toBe(0);
  expect(
    compareAsc(
      new Date('2000-11-30'), // UTC
      new Date(Date.UTC(2000, 10, 30)), // "new Date" itself creates date with local timezone
    ),
  ).toBe(0);
});
