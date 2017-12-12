// @flow

import { sanitizeDetail, sanitizeListItem } from '../ApiSanitizer';
import bookingDetail from './__datasets__/booking.detail.json';
import bookingsItem from './__datasets__/bookings.item.json';

describe('Sanitize list item', () => {
  it('should work', async () => {
    expect(sanitizeDetail(bookingDetail)).toMatchSnapshot();
  });
});

describe('Sanitize detail', () => {
  it('should work', async () => {
    expect(sanitizeListItem(bookingsItem)).toMatchSnapshot();
  });
});
