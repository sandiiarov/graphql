// @flow

import { validateDates } from '../FlightDatesValidator';

describe('Function validateDates specific dates', () => {
  it('should pass dates without error', () => {
    const dateFrom = { exact: new Date('2017-08-08') };
    const dateTo = { exact: new Date('2017-09-08') };
    expect(() => validateDates(dateFrom, dateTo)).not.toThrowError();
  });

  it('should throw error for dateFrom after dateTo', () => {
    const dateFrom = { exact: new Date('2017-09-08') };
    const dateTo = { exact: new Date('2017-08-08') };
    expect(() => validateDates(dateFrom, dateTo)).toThrowError(
      'DateFrom should start before dateTo',
    );
  });
});

describe('Function validateDates range dates', () => {
  it('should pass dateFrom and dateTo range without error', () => {
    const dateFrom = { exact: new Date('2017-09-08') };
    const dateTo = {
      range: { from: new Date('2017-09-08'), to: new Date('2017-10-08') },
    };
    expect(() => validateDates(dateFrom, dateTo)).not.toThrowError();
  });

  it('should pass dateFrom range and dateTo without error', () => {
    const dateFrom = {
      range: { from: new Date('2017-09-08'), to: new Date('2017-10-08') },
    };
    const dateTo = { exact: new Date('2017-10-08') };
    expect(() => validateDates(dateFrom, dateTo)).not.toThrowError();
  });

  it('should throw error for dateFrom is after dateTo range', () => {
    const dateFrom = { exact: new Date('2017-09-09') };
    const dateTo = {
      range: { from: new Date('2017-09-08'), to: new Date('2017-10-08') },
    };
    expect(() => validateDates(dateFrom, dateTo)).toThrowError(
      'DateFrom should start before dateTo range starts',
    );
  });

  it('should throw error for dateTo is before dateFrom range', () => {
    const dateFrom = {
      range: { from: new Date('2017-09-08'), to: new Date('2017-10-08') },
    };
    const dateTo = { exact: new Date('2017-10-07') };
    expect(() => validateDates(dateFrom, dateTo)).toThrowError(
      'DateTo should start after dateFrom range',
    );
  });
});

// Anytime
describe('Function validateDates anytime', () => {
  it('should pass dateFrom and dateTo anytime without error', () => {
    const dateFrom = { exact: new Date('2017-09-08') };
    const dateTo = { anytime: true };
    expect(() => validateDates(dateFrom, dateTo)).not.toThrowError();
  });

  it('should pass dateFrom anytime and dateT without error', () => {
    const dateFrom = { anytime: true };
    const dateTo = { exact: new Date('2017-09-08') };
    expect(() => validateDates(dateFrom, dateTo)).not.toThrowError();
  });

  it('should pass dateFrom anytime and dateTo anytime without error', () => {
    const dateFrom = { anytime: true };
    const dateTo = { anytime: true };
    expect(() => validateDates(dateFrom, dateTo)).not.toThrowError();
  });
});

// Time to stay
describe('Function validateDates time to stay', () => {
  it('should pass dateFrom and dateTo timeToStay without error', () => {
    const dateFrom = { exact: new Date('2017-09-08') };
    const dateTo = { timeToStay: { from: 2, to: 10 } };
    expect(() => validateDates(dateFrom, dateTo)).not.toThrowError();
  });

  it('should throw error for negative timeToStay', () => {
    const dateFrom = { exact: new Date('2017-09-08') };
    const dateTo = { timeToStay: { from: -2, to: 10 } };
    expect(() => validateDates(dateFrom, dateTo)).toThrowError(
      'TimeToStay should be range of positive numbers',
    );
  });

  it('should throw error for timeToStay from higher than to', () => {
    const dateFrom = { exact: new Date('2017-09-08') };
    const dateTo = {
      timeToStay: {
        from: 10,
        to: 2,
      },
    };
    expect(() => validateDates(dateFrom, dateTo)).toThrowError(
      'TimeToStay should be range of positive numbers',
    );
  });
});
