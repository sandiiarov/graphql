// @flow

import {
  GraphQLInterfaceType,
  GraphQLInt,
  GraphQLString,
  GraphQLEnumType,
} from 'graphql';

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

  directAccessURL: {
    type: GraphQLString,
    description:
      'You can use this link to access one particular booking directly WITHOUT PASSWORD. Use it carefully.',
    args: {
      deeplinkTo: {
        type: new GraphQLEnumType({
          name: 'DirectAccessURLValues',
          values: {
            CHANGE_TRIP: { value: 'change-trip' },
            INSURANCE: { value: 'insurance' },
            SEATING: { value: 'seating' },
            // MEALS are deprecated (?)
            PETS: { value: 'travelling-with-pets' },
            ASSISTANCE: { value: 'special-assistance' },
            SPORT_EQUIPMENT: { value: 'sports-equipment' },
            MUSICAL_EQUIPMENT: { value: 'musical-equipment' },
            HOTELS: { value: 'hotels' },
            CAR_RENTS: { value: 'car-rental' },
            REFUND: { value: 'refund-application' },
            BAGS: { value: 'bags' },
            EDIT_PASSENGERS: { value: 'passengers' },
            CANCEL: { value: 'cancel-booking' },
            PENDING_SERVICES: { value: 'pending-services' },
            VALIDATE_PAYMENT: { value: 'validate-payment' },
            TRAVEL_DOCUMENTS: { value: 'completion' },
            PAYMENT: { value: 'payment' },
          },
        }),
      },
    },
    resolve: (
      { id, authToken }: BookingInterfaceData,
      args: {| deeplinkTo?: string |},
    ): string => {
      const baseURL = `https://kiwi.com/content/manage/${id}/${authToken}`;
      if (args.deeplinkTo !== undefined) {
        return baseURL + '?deeplink=' + args.deeplinkTo;
      }
      return baseURL;
    },
  },
};

export default new GraphQLInterfaceType({
  name: 'BookingInterface',
  resolveType: ({ type }) => type,
  fields: commonFields,
});
