// @flow

import { sanitizeDetail, sanitizeListItem } from '../ApiSanitizer';
import bookingDetail from './__datasets__/booking.detail.json';
import bookingsItem from './__datasets__/bookings.item.json';
import bookingItemWithReturn from '../../datasets/booking-item-return-3222550.json';
import bookingItemMulticity from '../../datasets/booking-item-multicity-4903131.json';

describe('Sanitize detail', () => {
  it('should work', async () => {
    expect(sanitizeDetail(bookingDetail)).toMatchSnapshot();
  });
});

describe('Sanitize list item', () => {
  it('should work', async () => {
    expect(sanitizeListItem(bookingsItem)).toMatchSnapshot();
  });

  it('should work with return flight', () => {
    expect(sanitizeListItem(bookingItemWithReturn)).toMatchSnapshot();
  });

  it('should create trips from legs for multicity', () => {
    const sanitizedItem = sanitizeListItem(bookingItemMulticity);
    const expectedNoOfTrips = bookingItemMulticity.segments.length + 1;

    expect(sanitizedItem).toHaveProperty('trips');
    expect(sanitizedItem.trips).toHaveLength(expectedNoOfTrips);
    // $FlowExpectedError: it's array if above expectations passed
    sanitizedItem.trips.forEach(trip =>
      expect(trip).toEqual(
        expect.objectContaining({
          departure: expect.any(Object),
          arrival: expect.any(Object),
          legs: expect.any(Array),
        }),
      ),
    );
  });
});
