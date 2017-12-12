// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
} from 'graphql-relay';

import { globalIdField } from '../services/OpaqueIdentifier';
import GraphQLPrice from '../common/types/outputs/Price';
import GraphQLHotelFacility from './HotelFacility';
import GraphQLHotelRoom from './HotelRoom';
import GraphQLHotelRating from './HotelRating';
import GraphQLHotelReview from './HotelReview';

import type { HotelType } from '../dataLoaders/AllHotels';
import type { GraphqlContextType } from '../services/GraphqlContext';

export default new GraphQLObjectType({
  name: 'Hotel',
  fields: {
    id: globalIdField('hotel', ({ id }) => id),

    price: {
      type: GraphQLPrice,
      description:
        'Total price for all guests and nights and in the hotel. (including VAT)',
      resolve: ({ price, currencyCode }: HotelType) => ({
        amount: price,
        currency: currencyCode,
      }),
    },

    name: {
      description: 'Name of the hotel.',
      type: GraphQLString,
      resolve: ({ name }: HotelType) => name,
    },

    rating: {
      // see: https://en.wikipedia.org/wiki/Hotel_rating
      description: 'The star rating of the hotel.',
      type: GraphQLHotelRating,
      resolve: ({ rating }: HotelType) => rating,
    },

    review: {
      description: 'Hotel review from hotel visitors.',
      type: GraphQLHotelReview,
      resolve: () => true, // we do not have necessary data yet, see: https://gitlab.skypicker.com/mobile/hotels-bookingcom-api/issues/1
    },

    photoUrl: {
      description: 'Main photo of the hotel.',
      type: GraphQLString,
      resolve: ({ photoUrl }: HotelType) => photoUrl,
    },

    cityName: {
      type: GraphQLString,
      resolve: ({ cityName }: HotelType) => cityName,
    },

    whitelabelUrl: {
      description: 'URL to our whitelabel page of this hotel.',
      type: GraphQLString,
      resolve: ({ whitelabelUrl }: HotelType) => whitelabelUrl,
    },

    facilities: {
      description: 'All facilities available in the hotel.',
      type: connectionDefinitions({
        nodeType: GraphQLHotelFacility,
      }).connectionType,
      args: connectionArgs,
      resolve: async (
        { id }: HotelType,
        args: Object,
        { dataLoader }: GraphqlContextType,
      ) => {
        const { facilities } = await dataLoader.singleHotel.load(id);
        return connectionFromArray(facilities, args);
      },
    },

    rooms: {
      description: 'All rooms available in the hotel.',
      type: connectionDefinitions({
        nodeType: GraphQLHotelRoom,
      }).connectionType,
      args: connectionArgs,
      resolve: async (
        { id }: HotelType,
        args: Object,
        { dataLoader }: GraphqlContextType,
      ) => {
        const { rooms } = await dataLoader.singleHotel.load(id);
        return connectionFromArray(rooms, args);
      },
    },
  },
});
