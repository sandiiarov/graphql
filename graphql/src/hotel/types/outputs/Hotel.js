// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  connectionFromPromisedArray,
} from 'graphql-relay';

import { globalIdField } from '../../../common/services/OpaqueIdentifier';
import GraphQLHotelFacility from './HotelFacility';
import GraphQLHotelRoom from './HotelRoom';
import GraphQLHotelPhoto from './HotelPhoto';
import GraphQLHotelRating from './HotelRating';
import GraphQLHotelReview from './HotelReview';
import GraphQLCoordinates from '../../../location/types/outputs/Coordinates';
import GraphQLAddress from '../../../common/types/outputs/Address';
import HotelPhotosDataloader from '../../dataloaders/HotelPhotos';

import type { HotelType } from '../../dataloaders/flow/HotelType';
import type { GraphqlContextType } from '../../../common/services/GraphqlContext';
import type { Address } from '../../../common/types/outputs/Address';

export default new GraphQLObjectType({
  name: 'Hotel',
  description: 'General information about the hotel.',
  fields: {
    id: globalIdField('hotel', ({ id }: HotelType): string => id),

    originalId: {
      description:
        'Original (low level ID of the hotel). You are probably looking for "id" field.',
      deprecationReason:
        'Use field "id" instead. This field is used only because of compatibility reasons with old APIs.',
      type: GraphQLString,
      resolve: ({ id }: HotelType): string => id,
    },

    name: {
      description: 'Name of the hotel.',
      type: GraphQLString,
      resolve: ({ name }: HotelType) => name,
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

    summary: {
      description: 'Main description (summary) of the hotel.',
      type: GraphQLString,
      resolve: ({ summary }: HotelType) => summary,
    },

    mainPhoto: {
      description: 'Main photo of the hotel.',
      type: GraphQLHotelPhoto,
      resolve: async ({ id }: HotelType) => {
        const allPhotos = await HotelPhotosDataloader.load(id);
        return allPhotos[0]; // just the first one
      },
    },

    coordinates: {
      description: 'Location of the hotel.',
      type: GraphQLCoordinates,
      resolve: async (
        { id }: HotelType,
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
      resolve: ({ address }: HotelType): Address => {
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
      resolve: ({ rating }: HotelType) => rating,
    },

    review: {
      description: 'Hotel review from hotel visitors.',
      type: GraphQLHotelReview,
      resolve: () => true, // we do not have necessary data yet, see: https://gitlab.skypicker.com/mobile/hotels-bookingcom-api/issues/1
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
      resolve: async (
        { id }: HotelType,
        args: Object,
        { dataLoader }: GraphqlContextType,
      ) => {
        return connectionFromPromisedArray(
          dataLoader.hotel.room.loadAll([id]),
          args,
        );
      },
    },

    photos: {
      description: 'All available photos of the hotel.',
      type: connectionDefinitions({
        nodeType: GraphQLHotelPhoto,
      }).connectionType,
      args: connectionArgs,
      resolve: async ({ id }: HotelType, args: Object) => {
        return connectionFromPromisedArray(
          HotelPhotosDataloader.load(id),
          args,
        );
      },
    },
  },
});
