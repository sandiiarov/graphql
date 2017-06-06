// @flow

import { dateDurationInMinutes } from '../GraphqlResolvers';

describe('Function dateDurationInMinutes', () => {
  const departure: Date = new Date('2017-12-29T13:20:00.000Z');
  const arrival: Date = new Date('2017-12-29T14:45:00.000Z');

  it('should return duration in minutes', () => {
    expect(dateDurationInMinutes(departure, arrival)).toBe(85);
  });

  it('should return null when arrival date is null', () => {
    expect(dateDurationInMinutes(departure, null)).toBe(null);
  });

  it('should return null when departure date is null', () => {
    expect(dateDurationInMinutes(null, arrival)).toBe(null);
  });

  it('should return null when both dates are null', () => {
    expect(dateDurationInMinutes(null, null)).toBe(null);
  });

  it('should return null when departure date is after arrival date', () => {
    expect(dateDurationInMinutes(arrival, departure)).toBe(null);
  });
});
