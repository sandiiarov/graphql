// @flow

import Flight from '../Flight';

const fields = Flight.getFields();

describe('arrival field', () => {
  it('should be non-null Arrival type', () => {
    expect(fields.arrival.type.toString()).toBe('Arrival!');
  });
});

describe('departure field', () => {
  it('should be non-null Departure string', () => {
    expect(fields.departure.type.toString()).toBe('Departure!');
  });
});
