// @flow

import idx from 'idx';
import { get } from '../services/BookingComRequest';
import OptimisticDataloader from '../../common/services/OptimisticDataloader';

import type { RoomBeddingType } from './flow/RoomBeddingType';

type input = {
  hotelId: number,
  roomId: number,
};

/**
 * Fetch bedding data from Booking.com API v1, because v2 does not provide
 * bedding info yet.
 *
 * @see https://distribution-xml.booking.com/json/bookings.getRooms?hotel_ids=121543,25215
 */
export default new OptimisticDataloader(
  async (
    inputs: $ReadOnlyArray<input>,
  ): Promise<Array<RoomBeddingType[] | Error>> => {
    const hotelIds = Array.from(new Set(inputs.map(i => i.hotelId))).join(',');
    const response = await get(
      `https://distribution-xml.booking.com/json/bookings.getRooms?hotel_ids=${hotelIds}`,
    );

    return inputs.map(({ hotelId, roomId }) => {
      const room = response.find(
        r => r.hotel_id == hotelId && r.room_id == roomId,
      );
      if (!room) {
        return new Error('Requested room does not exist.');
      }
      const beds = idx(room, _ => _.bedding.beds) || [];
      return beds.map(b => ({
        amount: Number(b.amount),
        type: b.type,
      }));
    });
  },
);
