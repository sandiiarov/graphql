// @flow

import type { Price } from '../../../common/Price';

export type HotelRoomAvailabilityType = {|
  id: string,
  hotelId: string,
  roomId: string,
  minPrice: Price,
  incrementalPrice: Price[],
|};
