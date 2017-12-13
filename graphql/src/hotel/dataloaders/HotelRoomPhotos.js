// @flow

import Dataloader from 'dataloader';

import { get } from '../../common/services/HttpRequest';
import { queryWithParameters } from '../../../config/application';

import type { PhotoType as HotelRoomPhotoType } from './flow/PhotoType';

/**
 * This data-loader loads photos of the hotel.
 */
export default new Dataloader(async (roomIds: string[]): Promise<
  Array<HotelRoomPhotoType[] | Error>,
> =>
  sanitizeHotelRoomPhotos(
    roomIds,
    await get(
      queryWithParameters('https://hotels-api.skypicker.com/api/roomPhotos', {
        room_ids: roomIds.join(','),
      }),
    ),
  ),
);

function sanitizeHotelRoomPhotos(
  roomIds: string[],
  photos,
): Array<HotelRoomPhotoType[] | Error> {
  // it returns one array with mixed hotel room IDs
  return roomIds.map(roomId =>
    photos.filter(photo => photo.room_id === roomId).map(photo => ({
      id: photo.photo_id,
      lowResolution: photo.url_max300,
      highResolution: photo.url_original,
      thumbnail: photo.url_square60,
    })),
  );
}
