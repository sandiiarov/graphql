// @flow

import DataLoader from 'dataloader';
import request from '../services/HttpRequest';
import Config from '../../config/application';
import { sanitizeDetail } from '../queries/booking/ApiSanitizer';
import type { BookingType } from '../Entities';
import type BookingsLoader from '../dataLoaders/Bookings';

export default function createInstance(
  accessToken: ?string,
  bookingsLoader: BookingsLoader,
) {
  return new DataLoader(
    (ids: Array<number | string>) =>
      batchLoad(accessToken, bookingsLoader)(ids),
    {
      cacheKeyFn: key => parseInt(key, 10),
    },
  );
}

function batchLoad(
  accessToken: ?string,
  bookingsLoader: BookingsLoader,
): (Array<number | string>) => Promise<Array<Object>> {
  if (typeof accessToken !== 'string') {
    return () => Promise.reject(new Error('Undefined access token'));
  }
  return ids => Promise.all(ids.map(id => fetch(parseInt(id), bookingsLoader)));
}

async function fetch(bid, bookingsLoader): Promise<BookingType> {
  const { authToken } = await bookingsLoader.loadItem(bid);
  const data = await request(
    Config.restApiEndpoint.singleBooking(bid, authToken),
  );

  return sanitizeDetail(data);
}
