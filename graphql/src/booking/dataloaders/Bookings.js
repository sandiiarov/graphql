// @flow

import { get } from '../../services/HttpRequest';
import Config from '../../../config/application';
import { sanitizeListItem } from './ApiSanitizer';

import type { BookingsItem } from '../Booking';

// This is only "semi-dataloader" that will probably not be needed once there
// will be batch API endpoint for Booking details.
// It's response is to provide list of bookings and access to data
// (booking access token) in Booking dataloader.

export default class DataLoader {
  accessToken: ?string;
  bookings: ?Array<BookingsItem>;

  constructor(accessToken: ?string) {
    this.accessToken = accessToken;
    this.bookings = null;
  }

  async load(): Promise<BookingsItem[]> {
    if (typeof this.accessToken !== 'string') {
      throw new Error('Undefined access token');
    }
    if (!Array.isArray(this.bookings)) {
      this.bookings = await fetch(this.accessToken);
    }
    return Promise.resolve(this.bookings);
  }

  async loadItem(id: number | string): Promise<BookingsItem> {
    const bid = parseInt(id);
    const bookings = await this.load();
    const booking = bookings.find(b => b.id === bid);
    if (!booking) {
      throw new Error(`Booking not found. id: ${bid}`);
    }
    return booking;
  }
}

async function fetch(accessToken: string): Promise<BookingsItem[]> {
  const response = await get(Config.restApiEndpoint.allBookings, accessToken);

  return response.map(booking => sanitizeListItem(booking));
}
