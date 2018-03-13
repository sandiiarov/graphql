// @flow

import type { PhotoType as HotelPhotoType } from './PhotoType';

export type HotelRoomType = {|
  id: string,
  hotelId: number,
  type: string,
  maxPersons: string,
  bedding: Array<{|
    amount: string,
    type: string,
  |}>,
  descriptions: Array<{|
    title: string,
    text: string,
  |}>,
  photos: HotelPhotoType[],
  roomSize: number,
|};
