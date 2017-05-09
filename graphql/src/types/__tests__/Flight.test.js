// @flow

import Flight from '../Flight';

const fields = Flight.getFields();

describe('arrival field', () => {
  it('should be non-null RouteStop type', () => {
    expect(fields.arrival.type.toString()).toBe('RouteStop!');
  });
});

describe('departure field', () => {
  it('should be non-null RouteStop string', () => {
    expect(fields.departure.type.toString()).toBe('RouteStop!');
  });
});
