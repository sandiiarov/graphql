// @flow

import { sanitizeDetail, sanitizeListItem } from '../ApiSanitizer';
import bookingDetail from './__datasets__/booking.detail.json';
import bookingsItem from './__datasets__/bookings.item.json';
import bookingItemWithReturn from '../../datasets/booking-item-return-3222550.json';

describe('Sanitize list item', () => {
  it('should work', async () => {
    expect(sanitizeDetail(bookingDetail)).toMatchSnapshot();
  });
});

describe('Sanitize detail', () => {
  it('should work', async () => {
    expect(sanitizeListItem(bookingsItem)).toMatchSnapshot();
  });

  it('should work with return flight', () => {
    expect(sanitizeListItem(bookingItemWithReturn)).toMatchSnapshot();
  });
});
