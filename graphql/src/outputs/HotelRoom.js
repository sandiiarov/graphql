// @flow

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';
import { globalIdField } from '../services/OpaqueIdentifier';

import GraphQLHotelRoomBedding from './HotelRoomBedding';

import type { HotelRoomType } from '../dataLoaders/SingleHotel';

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
  },
});
