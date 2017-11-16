// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

import GraphQLPrice from './Price';

import type { SanitizedHotelApiResponse as ApiResponse } from '../dataLoaders/Hotels';

export default new GraphQLObjectType({
  name: 'Hotel',
  fields: {
    id: globalIdField('hotel', ({ hotelId }) => hotelId),

    price: {
      type: GraphQLPrice,
      description:
        'Total price for all guests and nights and in the hotel. (including VAT)',
      resolve: ({ price, hotelCurrencyCode }: ApiResponse) => ({
        amount: price,
        currency: hotelCurrencyCode,
      }),
    },

    photoUrl: {
      description: 'Main photo of the hotel.',
      type: GraphQLString,
      resolve: ({ photo }: ApiResponse) => photo,
    },

    url: {
      description: 'URL to our whitelabel page of this hotel.',
      type: GraphQLString,
      resolve: ({ url }: ApiResponse) => url,
    },

    cityName: {
      type: GraphQLString,
      resolve: ({ city }: ApiResponse) => city,
    },
  },
});
