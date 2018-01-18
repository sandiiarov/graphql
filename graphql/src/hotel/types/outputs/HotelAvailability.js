// @flow

import { GraphQLObjectType, GraphQLList } from 'graphql';

import { globalIdField } from '../../../common/services/OpaqueIdentifier';
import GraphQLPrice from '../../../common/types/outputs/Price';
import GraphQLHotel from './Hotel';
import GraphQLHotelRoomAvailability from './HotelRoomAvailability';

import type { HotelType } from '../../dataloaders/flow/HotelType';
import type { GraphqlContextType } from '../../../common/services/GraphqlContext';

export default new GraphQLObjectType({
  name: 'HotelAvailability',
  description:
    'Information about hotel availability during selected time period.',
  fields: {
    id: globalIdField(),

    price: {
      type: GraphQLPrice,
      description:
        'Total price for all guests and nights and in the hotel. (including VAT)',
      resolve: ({ price, currencyCode }: HotelType) => ({
        amount: price,
        currency: currencyCode,
      }),
    },

    availableRooms: {
      type: new GraphQLList(GraphQLHotelRoomAvailability),
      resolve: async (
        ancestor: Object,
        args: Object,
        { dataLoader }: GraphqlContextType,
      ) => {
        return dataLoader.hotel.roomAvailability.load(
          [ancestor.id],
          ancestor.args.checkin,
          ancestor.args.checkout,
          ancestor.currencyCode,
        );
      },
    },

    hotel: {
      type: GraphQLHotel,
      resolve: async (
        ancestor: HotelType,
        args: Object,
        { dataLoader }: GraphqlContextType,
      ) => {
        return dataLoader.hotel.byID.load(ancestor.id);
      },
    },
  },
});
