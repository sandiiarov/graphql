// @flow

import FlightDurationInMinutes from '../FlightDuration';
import type { ArrivalType, DepartureType } from '../../Entities';

let departure: DepartureType;
let arrival: ArrivalType;

let nullDeparture: DepartureType;
let nullArrival: ArrivalType;

beforeEach(() => {
  nullDeparture = {
    when: null,
    where: {
      code: 'string',
      cityName: 'string',
    },
  };

  nullArrival = nullDeparture;

  departure = {
    ...nullDeparture,
    when: {
      local: new Date(), // not used
      utc: new Date('2017-12-29T13:20:00.000Z'),
    },
  };

  arrival = {
    ...nullArrival,
    when: {
      local: new Date(), // not used
      utc: new Date('2017-12-29T14:45:00.000Z'),
    },
  };
});

describe('Function dateDurationInMinutes', () => {
  it('should return duration in minutes', () => {
    expect(FlightDurationInMinutes(departure, arrival)).toBe(85);
  });

  it('should return null when arrival date is null', () => {
    expect(FlightDurationInMinutes(departure, nullArrival)).toBe(null);
  });

  it('should return null when departure date is null', () => {
    expect(FlightDurationInMinutes(nullDeparture, arrival)).toBe(null);
  });

  it('should return null when both dates are null', () => {
    expect(FlightDurationInMinutes(nullDeparture, nullArrival)).toBe(null);
  });

  it('should return null when departure date is after arrival date', () => {
    expect(FlightDurationInMinutes(arrival, departure)).toBe(null);
  });
});
