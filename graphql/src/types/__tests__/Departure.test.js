// @flow

import Departure from '../Departure';

describe('airport field', () => {
  const airport = Departure.getFields().airport;
  it('should be non-null Airport type', () => {
    expect(airport.type.toString()).toBe('Airport!');
  });
});

describe('time fields returns nullable DateTime types', () => {
  const departureFields = Departure.getFields();

  it('for local time', () => {
    expect(departureFields.localTime.type.toString()).toBe('DateTime');
  });

  it('for global time', () => {
    expect(departureFields.time.type.toString()).toBe('DateTime');
  });
});
