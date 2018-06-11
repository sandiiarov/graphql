// @flow

import Dataloader from 'dataloader';
import { get } from '../../common/services/HttpRequest';
import Config from '../../../config/application';
import { sanitizeListItem } from './ApiSanitizer';

import { type BookingsItem } from '../Booking';

/**
 * This is only "semi-dataloader" that will probably not be needed once there
 * will be batch API endpoint for Booking details. It's responsibility is to
 * provide list of bookings and access to data (booking access token)
 * in Booking dataloader.
 */
export default class DataLoader {
  accessToken: ?string;
  dataloader: Dataloader<string, BookingsItem[]>;

  constructor(accessToken: ?string) {
    this.accessToken = accessToken;
    this.dataloader = new Dataloader(this.batchFetch);
  }

  load = async (): Promise<BookingsItem[]> => {
    if (typeof this.accessToken !== 'string') {
      throw new Error('Undefined access token');
    }

    return this.dataloader.load(this.accessToken);
  };

  loadItem = async (id: number | string): Promise<BookingsItem> => {
    const bid = parseInt(id);
    const bookings = await this.load();
    const booking = bookings.find(b => b.id === bid);
    if (!booking) {
      throw new Error(`Booking not found. id: ${bid}`);
    }
    return booking;
  };

  batchFetch = async (
    accessTokens: $ReadOnlyArray<string>,
  ): Promise<$ReadOnlyArray<BookingsItem[]>> => {
    return Promise.all(
      accessTokens.map(accessToken =>
        get(Config.restApiEndpoint.allBookings, accessToken),
      ),
      // eslint-disable-next-line promise/prefer-await-to-then
    ).then(bookingsByToken => {
      return bookingsByToken.map(bookings => bookings.map(sanitizeListItem));
    });
  };
}
