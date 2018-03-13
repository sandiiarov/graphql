// @flow

import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

import { globalIdField } from '../../../common/services/OpaqueIdentifier';
import GraphQLHotelRoom from './HotelRoom';
import GraphQLPrice from '../../../common/types/outputs/Price';

import type { GraphqlContextType } from '../../../common/services/GraphqlContext';
import type { HotelRoomAvailabilityType } from '../../dataloaders/flow/HotelRoomAvailabilityType';

export default new GraphQLObjectType({
  name: 'HotelRoomAvailability',
  fields: {
    id: globalIdField(),

    originalId: {
      type: GraphQLString,
      deprecationReason: 'Use "id" field whenever possible.',
      description: 'Original block ID used to open Booking.com page.',
      resolve: ({ id }: HotelRoomAvailabilityType) => id,
    },

    minimalPrice: {
      type: GraphQLPrice,
      description: 'Base price for the room in this configuration.',
      resolve: ({ minPrice }: HotelRoomAvailabilityType) => minPrice,
    },

    incrementalPrice: {
      type: new GraphQLList(GraphQLPrice),
      resolve: ({ incrementalPrice }: HotelRoomAvailabilityType) =>
        incrementalPrice,
    },

    isRefundable: {
      type: GraphQLBoolean,
      description: 'Is the hotelroom refundable',
      resolve: ({ isRefundable }: HotelRoomAvailabilityType) => isRefundable,
    },

    isBreakfastIncluded: {
      type: GraphQLBoolean,
      description: 'Is breakfast included in the hotelroom',
      resolve: ({ isBreakfastIncluded }: HotelRoomAvailabilityType) =>
        isBreakfastIncluded,
    },

    room: {
      type: GraphQLHotelRoom,
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
  },
});
