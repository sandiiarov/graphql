// @flow

import GraphQLHotel from './Hotel';

import type { HotelType } from '../../dataloaders/flow/HotelType';
import type { GraphqlContextType } from '../../../common/services/GraphqlContext';

/**
 * These fields are deprecated and will be removed in the future.
 */
export default {
  hotelInformation: {
    type: GraphQLHotel,
    deprecationReason: "Use field 'hotel' instead.",
    resolve: async (
      ancestor: HotelType,
      args: Object,
      { dataLoader }: GraphqlContextType,
    ) => {
      return dataLoader.hotel.byId.load(ancestor.id);
    },
  },
};
