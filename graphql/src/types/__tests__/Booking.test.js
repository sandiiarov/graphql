// @flow

import Booking from '../Booking';

const fields = Booking.getFields();

describe('Field "id"', () => {
  it('should be non-null ID type', () => {
    expect(fields.id.type.toString()).toBe('ID!');
  });

  it('should use opaque identifier', () => {
    expect(fields.id.resolve({ id: 1 })).toBe('Ym9va2luZzox'); // booking:1
  });
});

it('Field "databaseId" should be non-null Int type', () => {
  expect(fields.databaseId.type.toString()).toBe('Int!');
});

it('Field "arrival" should be non-null RouteStop type', () => {
  expect(fields.arrival.type.toString()).toBe('RouteStop!');
});

it('Field "departure" should be non-null RouteStop type', () => {
  expect(fields.departure.type.toString()).toBe('RouteStop!');
});

it('Field "flights" should be non-null list of non-null Flight types', () => {
  expect(fields.legs.type.toString()).toBe('[Leg!]!');
});
