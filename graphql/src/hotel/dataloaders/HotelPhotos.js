// @flow

import Dataloader from 'dataloader';

import { get } from '../../common/services/HttpRequest';
import { queryWithParameters } from '../../../config/application';

import type { PhotoType as HotelPhotoType } from './flow/PhotoType';

/**
 * This data-loader loads photos of the hotel.
 */
export default new Dataloader(async (hotelIds: string[]): Promise<
  Array<HotelPhotoType[] | Error>,
> =>
  sanitizeHotelPhotos(
    hotelIds,
    await get(
      queryWithParameters('https://hotels-api.skypicker.com/api/hotelPhotos', {
        hotel_ids: hotelIds.join(','),
      }),
    ),
  ),
);

function sanitizeHotelPhotos(
  hotelIds: string[],
  photos,
): Array<HotelPhotoType[] | Error> {
  // it returns one array with mixed hotel IDs
  return hotelIds.map(hotelId =>
    photos.filter(photo => photo.hotel_id === hotelId).map(photo => ({
      id: photo.photo_id,
      lowResolution: photo.url_max300,
      highResolution: photo.url_original,
      thumbnail: photo.url_square60,
    })),
  );
}
