// @flow

import type { HotelRoomType } from './flow/HotelRoomType';
import sanitizePhotos from './PhotoSanitizer';

export default (rooms: Object, hotelId: number): HotelRoomType[] => {
  return rooms.map(room => ({
    id: room.room_id,
    hotelId,
    type: room.room_info.room_type,
    maxPersons: room.room_info.max_persons,
    bedding: null, // not provided by API v2
    descriptions: [
      {
        title: room.room_name,
        text: room.room_description,
      },
    ],
    photos: sanitizePhotos(room.room_photos),
    // Some hotels return metre_square: 0, we change this to null instead
    // so we can handle this as an error on frontend.
    roomSize: room.room_info.room_size.metre_square || null,
  }));
};
