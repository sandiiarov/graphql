// @flow

import { GraphQLInterfaceType, GraphQLInt } from 'graphql';

import { globalIdField } from '../../../common/services/OpaqueIdentifier';
import type { GraphqlContextType } from '../../../common/services/GraphqlContext';
import type { BookingAssets, BookingsItem } from '../../Booking';
import type { AllowedBaggage } from '../../Baggage';
import GraphQLAllowedBaggage from './AllowedBaggage';
import GraphQLBookingAssets from './BookingAssets';
import GraphQLBookingStatus from '../enums/BookingStatus';
import Price from '../../../common/types/outputs/Price';

export type BookingInterfaceData = BookingsItem;

export const commonFields = {
  id: globalIdField(),
  databaseId: {
    type: GraphQLInt,
    description:
      'Unique number identifying the booking in communication with support.',
    resolve: ({ id }: BookingInterfaceData): number => id,
  },
  status: {
    type: GraphQLBookingStatus,
    resolve: ({ status }: BookingInterfaceData): string => status,
  },
  price: {
    type: Price,
    resolve: ({ price }: BookingInterfaceData) => price,
    description: 'Total price of the whole booking.',
  },
  allowedBaggage: {
    type: GraphQLAllowedBaggage,
    resolve: async (
      { id }: BookingInterfaceData,
      params: Object,
      { dataLoader }: GraphqlContextType,
    ): Promise<AllowedBaggage> => {
      const { allowedBaggage } = await dataLoader.booking.load(id);
      return allowedBaggage;
    },
  },
  assets: {
    type: GraphQLBookingAssets,
    description: 'Static assets related to this booking.',
    resolve: async (
      { id }: BookingInterfaceData,
      params: Object,
      { dataLoader }: GraphqlContextType,
    ): Promise<BookingAssets> => {
      const { assets } = await dataLoader.booking.load(id);
      return assets;
    },
  },
};

export default new GraphQLInterfaceType({
  name: 'BookingInterface',
  resolveType: ({ type }) => type,
  fields: commonFields,
});
