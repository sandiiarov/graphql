// @flow

import Leg from '../Leg';

const fields = Leg.getFields();

it('Leg type should have description', () => {
  expect(Leg.description).not.toBe(undefined);
});

it('Field "id" should be non-null ID type', () => {
  expect(fields.id.type.toString()).toBe('ID!');
});

it('Field "id" should use opaque identifiers', () => {
  expect(fields.id.resolve({ id: 1 })).toBe('bGVnOjE='); // leg:1
});

it('Field "arrival" should be non-null Arrival type', () => {
  expect(fields.arrival.type.toString()).toBe('Arrival!');
});

it('Field "Departure" should be non-null ID type', () => {
  expect(fields.departure.type.toString()).toBe('Departure!');
});

it('Field "recheckRequired" should be non-null Boolean type', () => {
  expect(fields.recheckRequired.type.toString()).toBe('Boolean!');
});
