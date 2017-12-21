// @flow

import { GraphQLObjectType, GraphQLList } from 'graphql';

import DeprecatedHotelRoomAvailability from './HotelRoomAvailability.deprecated';
import { globalIdField } from '../../../common/services/OpaqueIdentifier';
import GraphQLHotelRoom from './HotelRoom';
import GraphQLPrice from '../../../common/types/outputs/Price';

import type { GraphqlContextType } from '../../../common/services/GraphqlContext';
import type { HotelRoomAvailabilityType } from '../../dataloaders/flow/HotelRoomAvailabilityType';

export default new GraphQLObjectType({
  name: 'HotelRoomAvailability',
  fields: {
    id: globalIdField(),

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

    ...DeprecatedHotelRoomAvailability,
  },
});
