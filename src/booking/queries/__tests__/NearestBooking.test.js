// @flow

import MockDate from 'mockdate';

import { findNearestBooking } from '../NearestBooking';
import config from '../../../../config/application';
import BookingItem2707224 from '../../datasets/booking-2707224.json';
import BookingItem2707229 from '../../datasets/booking-2707229.json';
import { graphql, RestApiMock } from '../../../common/services/TestingTools';

const createFlight = milliseconds => ({
  arrival: {
    when: {
      utc: milliseconds / 1000,
      local: milliseconds / 1000 + 60 * 60,
    },
  },
  airline: {},
});
const createLeg = milliseconds => ({
  arrival: {
    when: {
      utc: new Date(milliseconds),
    },
  },
});

MockDate.set(1000);

describe('NearestBooking', () => {
  describe('query', () => {
    beforeEach(() => {
      RestApiMock.onGet(config.restApiEndpoint.allBookings).replyWithData([
        {
          ...BookingItem2707224,
          flights: [createFlight(1150), createFlight(1600)],
        },
        {
          ...BookingItem2707229,
          status: 'CANCELLED',
          flights: [createFlight(900), createFlight(2000)],
        },
      ]);
    });

    it('should return nearest booking', async () => {
      const query = `
        {
          nearestBooking {
            databaseId
          }
        }
      `;
      expect(await graphql(query)).toEqual({
        data: {
          nearestBooking: { databaseId: 2707224 },
        },
      });
    });
  });

  describe('findNearestBooking', () => {
    const bookings = [
      {
        legs: [createLeg(900), createLeg(1500), createLeg(1600)],
      },
      {
        legs: [createLeg(1150), createLeg(1200)],
      },
    ];
    const pastBookings = [
      {
        legs: [createLeg(100), createLeg(200), createLeg(900)],
      },
      {
        legs: [createLeg(500), createLeg(600)],
      },
    ];

    it('should find nearest booking', () => {
      // $FlowExpectedError: full booking not needed for this test
      const nearest = findNearestBooking(bookings);

      expect(nearest).toBe(bookings[0]);
    });

    it('should find nearest future booking', () => {
      // $FlowExpectedError: full booking not needed for this test
      const nearest = findNearestBooking(bookings, true);

      expect(nearest).toBe(bookings[1]);
    });

    it('should not find future booking in list of past bookings', () => {
      // $FlowExpectedError: full booking not needed for this test
      const nearest = findNearestBooking(pastBookings, true);

      expect(nearest).toBe(null);
    });

    it('should find nearest past booking', () => {
      // $FlowExpectedError: full booking not needed for this test
      const nearest = findNearestBooking(pastBookings);

      expect(nearest).toBe(pastBookings[0]);
    });
  });
});
