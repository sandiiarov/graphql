// @flow

import type { Price } from '../../../common/types/Price';

export type HotelRoomAvailabilityType = {|
  id: string,
  hotelId: string,
  roomId: string,
  minPrice: Price,
  incrementalPrice: Price[],
  isRefundable: boolean,
  isBreakfastIncluded: boolean,
  args: {
    language: string,
  },
|};
