// @flow

import { getDepartureDate, sortBookingsByDate } from '../AllBookingsSort';

const booking1 = {
  departure: {
    when: {
      utc: new Date('2018-05-01'),
    },
  },
};

const booking2 = {
  departure: {
    when: {
      utc: new Date('2018-05-02'),
    },
  },
};

const booking3 = {
  departure: {
    when: {
      utc: new Date('2018-05-03'),
    },
  },
};

const missingDeparture = {
  departure: {},
};

describe('AllBookingsSort', () => {
  it('gets departure date', () => {
    // $FlowExpectedError: Intentionally just passing what is needed to test method
    expect(getDepartureDate(booking1)).toEqual(new Date('2018-05-01'));
  });

  it('gets throws an error if departure date is missing', () => {
    expect(() => {
      // $FlowExpectedError: Intentionally just passing what is needed to test method
      getDepartureDate(missingDeparture);
    }).toThrow('Flight does not contain a departure date.');
  });

  it('sorts bookings by departureDate', () => {
    expect(
      // $FlowExpectedError: Intentionally just passing what is needed to test method
      sortBookingsByDate([booking3, booking1, booking2]),
    ).toEqual([booking1, booking2, booking3]);
  });
});
