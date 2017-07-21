// @flow

import { validateDates } from '../FlightDatesValidator';

describe('Function validateDates specific dates', () => {
  it('should pass dates without error', () => {
    const dateFrom = new Date('2017-08-08');
    const dateTo = new Date('2017-09-08');
    expect(() => validateDates(dateFrom, dateTo)).not.toThrowError();
  });

  it('should throw error for dateFrom after dateTo', () => {
    const dateFrom = new Date('2017-09-08');
    const dateTo = new Date('2017-08-08');
    expect(() => validateDates(dateFrom, dateTo)).toThrowError(
      'DateFrom should start before dateTo',
    );
  });
});
