// @flow

import DataLoader from 'dataloader';
import { get } from '../../common/services/HttpRequest';
import Config from '../../../config/application';
import { sanitizeDetail } from './ApiSanitizer';

import type { Booking } from '../Booking';
import type BookingsLoader from './Bookings';

export default function createInstance(
  accessToken: ?string,
  bookingsLoader: BookingsLoader,
) {
  return new DataLoader(
    (ids: $ReadOnlyArray<number | string>) =>
      batchLoad(accessToken, bookingsLoader)(ids),
    {
      cacheKeyFn: key => parseInt(key, 10),
    },
  );
}

function batchLoad(
  accessToken: ?string,
  bookingsLoader: BookingsLoader,
): ($ReadOnlyArray<number | string>) => Promise<Array<Object>> {
  if (typeof accessToken !== 'string') {
    return () => Promise.reject(new Error('Undefined access token'));
  }
  return ids => Promise.all(ids.map(id => fetch(parseInt(id), bookingsLoader)));
}

async function fetch(bid, bookingsLoader): Promise<Booking> {
  const { authToken } = await bookingsLoader.loadItem(bid);
  const data = await get(Config.restApiEndpoint.singleBooking(bid, authToken));

  return sanitizeDetail(data);
}
