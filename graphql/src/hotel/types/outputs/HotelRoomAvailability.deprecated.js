// @flow

import GraphQLHotelRoom from './HotelRoom';

import type { GraphqlContextType } from '../../../common/services/GraphqlContext';
import type { HotelRoomAvailabilityType } from '../../dataloaders/flow/HotelRoomAvailabilityType';

/**
 * These fields are deprecated and will be removed in the future.
 */
export default {
  roomInformation: {
    type: GraphQLHotelRoom,
    deprecationReason: "Use field 'room' instead.",
    resolve: async (
      ancestor: HotelRoomAvailabilityType,
      args: Object,
      { dataLoader }: GraphqlContextType,
    ) => {
      const room = await dataLoader.hotel.room.load(
        ancestor.hotelId,
        ancestor.roomId,
      );
      return room || null;
    },
  },
};
