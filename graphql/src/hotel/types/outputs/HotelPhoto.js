// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from '../../../common/services/OpaqueIdentifier';

import type { PhotoType as HotelPhotoType } from '../../dataloaders/flow/PhotoType';

export default new GraphQLObjectType({
  name: 'HotelPhoto',
  fields: {
    id: globalIdField('hotelPhoto', ({ id }: HotelPhotoType) => id),

    lowResUrl: {
      type: GraphQLString,
      resolve: ({ lowResolution }: HotelPhotoType) => lowResolution,
    },

    highResUrl: {
      type: GraphQLString,
      resolve: ({ highResolution }: HotelPhotoType) => highResolution,
    },

    thumbnailUrl: {
      type: GraphQLString,
      resolve: ({ thumbnail }: HotelPhotoType) => thumbnail,
    },
  },
});
