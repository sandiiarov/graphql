// @flow

import request from '../services/HttpRequest';
import Config from '../../config/application';
import { sanitizeListItem } from '../queries/booking/ApiSanitizer';
import type { BookingsItemType } from '../Entities';

// This is only "semi-dataloader" that will probably not be needed once there
// will be batch API endpoint for Booking details.
// It's response is to provide list of bookings and access to data
// (booking access token) in Booking dataloader.

export default class DataLoader {
  accessToken: ?string;
  bookings: ?Array<BookingsItemType>;

  constructor(accessToken: ?string) {
    this.accessToken = accessToken;
    this.bookings = null;
  }

  async load(): Promise<Array<BookingsItemType>> {
    if (typeof this.accessToken !== 'string') {
      throw new Error('Undefined access token');
    }
    if (!Array.isArray(this.bookings)) {
      this.bookings = await fetch(this.accessToken);
    }
    return Promise.resolve(this.bookings);
  }

  async loadItem(id: number | string): Promise<BookingsItemType> {
    const bid = parseInt(id);
    const bookings = await this.load();
    const booking = bookings.find(b => b.id === bid);
    if (!booking) {
      throw new Error(`Booking not found. id: ${bid}`);
    }
    return booking;
  }
}

async function fetch(accessToken: string): Promise<Array<BookingsItemType>> {
  const response = await request(
    Config.restApiEndpoint.allBookings,
    accessToken,
  );

  return response.map(booking => sanitizeListItem(booking));
}
