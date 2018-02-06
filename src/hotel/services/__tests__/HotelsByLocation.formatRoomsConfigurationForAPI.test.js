// @flow

import { formatRoomsConfigurationForAPI } from '../ParametersFormatter';

it('works for one adult', () => {
  expect(formatRoomsConfigurationForAPI([{ adultsCount: 1 }])).toEqual(['A']);
});

it('works for multiple adults', () => {
  expect(formatRoomsConfigurationForAPI([{ adultsCount: 3 }])).toEqual([
    'A,A,A',
  ]);
});

it('works for one adult with child', () => {
  expect(
    formatRoomsConfigurationForAPI([
      { adultsCount: 1, children: [{ age: 6 }] },
    ]),
  ).toEqual(['A,6']);
});

it('works for family', () => {
  expect(
    formatRoomsConfigurationForAPI([
      {
        adultsCount: 2,
        children: [{ age: 4 }, { age: 6 }],
      },
    ]),
  ).toEqual(['A,A,4,6']);
});

it('works for families', () => {
  expect(
    formatRoomsConfigurationForAPI([
      {
        adultsCount: 2,
        children: [{ age: 4 }, { age: 6 }],
      },
      {
        adultsCount: 1,
        children: [{ age: 2 }],
      },
    ]),
  ).toEqual(['A,A,4,6', 'A,2']);
});

// false inputs

it('works for one adult with not really child', () => {
  expect(
    formatRoomsConfigurationForAPI([
      { adultsCount: 1, children: [{ age: 6 }, { age: 24 }] },
    ]),
  ).toEqual(['A,6,A']);
});

it('works for one adult with "not born yet" child', () => {
  expect(
    formatRoomsConfigurationForAPI([
      { adultsCount: 1, children: [{ age: -2 }] },
    ]),
  ).toEqual(['A,A']);
});
