// @flow

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
} from 'graphql-relay';

import { globalIdField } from '../../../common/services/OpaqueIdentifier';
import GraphQLHotelRoomBedding from './HotelRoomBedding';
import GraphQLHotelRoomDescription from './HotelRoomDescription';
import GraphQLHotelPhoto from './HotelPhoto';
import HotelRoomPhotoDataloader from '../../dataloaders/HotelRoomPhotos';

import type { HotelRoomType } from '../../dataloaders/flow/HotelRoomType';

export default new GraphQLObjectType({
  name: 'HotelRoom',
  fields: {
    id: globalIdField('hotelRoom', ({ id }: HotelRoomType) => id),

    type: {
      type: GraphQLString,
      description: 'Type of the hotel room.',
      resolve: ({ type }: HotelRoomType) => type,
    },

    maxPersons: {
      type: GraphQLInt,
      resolve: ({ maxPersons }: HotelRoomType) => maxPersons,
    },

    bedding: {
      type: new GraphQLList(GraphQLHotelRoomBedding),
      resolve: ({ bedding }: HotelRoomType) => bedding,
    },

    photos: {
      description: 'All available photos of the hotel room.',
      type: connectionDefinitions({
        name: 'HotelRoomPhoto',
        nodeType: GraphQLHotelPhoto,
      }).connectionType,
      args: connectionArgs,
      resolve: async ({ id }: HotelRoomType, args: Object) => {
        return connectionFromPromisedArray(
          HotelRoomPhotoDataloader.load(id),
          args,
        );
      },
    },

    description: {
      type: GraphQLHotelRoomDescription,
      resolve: ({ descriptions }: HotelRoomType) =>
        descriptions.length > 0 ? descriptions[0] : null,
    },
  },
});
