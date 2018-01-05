// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
} from 'graphql-relay';

import { globalIdField } from '../../../common/services/OpaqueIdentifier';
import GraphQLHotelFacility from './HotelFacility';
import GraphQLHotelRoom from './HotelRoom';
import GraphQLHotelPhoto from './HotelPhoto';
import GraphQLHotelRating from './HotelRating';
import GraphQLHotelReview, { type HotelReviewType } from './HotelReview';
import GraphQLCoordinates from '../../../location/types/outputs/Coordinates';
import GraphQLAddress from '../../../common/types/outputs/Address';

import type { HotelExtendedType } from '../../dataloaders/flow/HotelExtendedType';
import type { GraphqlContextType } from '../../../common/services/GraphqlContext';
import type { Address } from '../../../common/types/outputs/Address';

export default new GraphQLObjectType({
  name: 'Hotel',
  description: 'General information about the hotel.',
  fields: {
    id: globalIdField('hotel', ({ id }: HotelExtendedType): string => id),

    originalId: {
      description:
        'Original (low level ID of the hotel). You are probably looking for "id" field.',
      deprecationReason:
        'Use field "id" instead. This field is used only because of compatibility reasons with old APIs.',
      type: GraphQLString,
      resolve: ({ id }: HotelExtendedType): string => id,
    },

    name: {
      description: 'Name of the hotel.',
      type: GraphQLString,
      resolve: ({ name }: HotelExtendedType) => name,
    },

    cityName: {
      type: GraphQLString,
      resolve: ({ cityName }: HotelExtendedType) => cityName,
    },

    whitelabelUrl: {
      description: 'URL to our whitelabel page of this hotel.',
      type: GraphQLString,
      resolve: ({ whitelabelUrl }: HotelExtendedType) => whitelabelUrl,
    },

    summary: {
      description: 'Main description (summary) of the hotel.',
      type: GraphQLString,
      resolve: ({ summary }: HotelExtendedType) => summary,
    },

    mainPhoto: {
      description: 'Main photo of the hotel.',
      type: GraphQLHotelPhoto,
      resolve: async ({ photos }: HotelExtendedType) => {
        return photos[0]; // just the first one
      },
    },

    coordinates: {
      description: 'Location of the hotel.',
      type: GraphQLCoordinates,
      resolve: async (
        { id }: HotelExtendedType,
        args: Object,
        { dataLoader }: GraphqlContextType,
      ) => {
        const { location } = await dataLoader.hotel.byID.load(id);
        return {
          lat: location.latitude,
          lng: location.longitude,
        };
      },
    },

    address: {
      type: GraphQLAddress,
      resolve: ({ address }: HotelExtendedType): Address => {
        return {
          street: address.street,
          city: address.city,
          zip: address.zip,
        };
      },
    },

    rating: {
      // see: https://en.wikipedia.org/wiki/Hotel_rating
      description: 'The star rating of the hotel.',
      type: GraphQLHotelRating,
      resolve: ({ rating }: HotelExtendedType) => rating,
    },

    review: {
      description: 'Hotel review from hotel visitors.',
      type: GraphQLHotelReview,
      resolve: ({ review }: HotelExtendedType): HotelReviewType => ({
        score: review.score,
        count: review.count,
        description: undefined, // we still do not have data
      }),
    },

    facilities: {
      description: 'All facilities available in the hotel.',
      type: connectionDefinitions({
        nodeType: GraphQLHotelFacility,
      }).connectionType,
      args: connectionArgs,
      resolve: async (
        { id }: HotelExtendedType,
        args: Object,
        { dataLoader }: GraphqlContextType,
      ) => {
        const { facilities } = await dataLoader.hotel.byID.load(id);
        return connectionFromArray(facilities, args);
      },
    },

    rooms: {
      description: 'All rooms available in the hotel.',
      type: connectionDefinitions({
        nodeType: GraphQLHotelRoom,
      }).connectionType,
      args: connectionArgs,
      resolve: async ({ rooms }: HotelExtendedType, args: Object) => {
        return connectionFromArray(rooms, args);
      },
    },

    photos: {
      description: 'All available photos of the hotel.',
      type: connectionDefinitions({
        nodeType: GraphQLHotelPhoto,
      }).connectionType,
      args: connectionArgs,
      resolve: async ({ photos }: HotelExtendedType, args: Object) => {
        return connectionFromArray(photos, args);
      },
    },
  },
});
