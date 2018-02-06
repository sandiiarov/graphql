// @flow

import type { HotelType } from './HotelType';
import type { PhotoType as HotelPhotoType } from './PhotoType';
import type { HotelFacilityType } from './HotelFacilityType';
import type { HotelRoomType } from './HotelRoomType';

export type HotelExtendedType = {
  ...HotelType,
  facilities: HotelFacilityType[],
  photos: HotelPhotoType[],
  location: {|
    longitude: string,
    latitude: string,
  |},
  rooms: HotelRoomType[],
};
