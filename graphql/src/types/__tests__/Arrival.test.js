// @flow

import Arrival from '../Arrival';

describe('airport field', () => {
  const airport = Arrival.getFields().airport;
  it('should be non-null Airport type', () => {
    expect(airport.type.toString()).toBe('Airport!');
  });
});

describe('time fields returns nullable DateTime types', () => {
  const arrivalFields = Arrival.getFields();

  it('for local time', () => {
    expect(arrivalFields.localTime.type.toString()).toBe('DateTime');
  });

  it('for global time', () => {
    expect(arrivalFields.time.type.toString()).toBe('DateTime');
  });
});