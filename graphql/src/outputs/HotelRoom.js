// @flow

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';
import { globalIdField } from '../services/OpaqueIdentifier';

import GraphQLHotel from './Hotel';
import GraphQLHotelRoomBedding from './HotelRoomBedding';

import type { GraphqlContextType } from '../services/GraphqlContext';
import type { HotelRoomType } from '../dataLoaders/SingleHotel';

export default new GraphQLObjectType({
  name: 'HotelRoom',
  // fields are thunk because there is circular dependency with Hotel type
  fields: () => ({
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

    hotel: {
      type: GraphQLHotel,
      resolve: (
        { hotelId }: HotelRoomType,
        params: Object,
        { dataLoader }: GraphqlContextType,
      ) => {
        return dataLoader.singleHotel.load(hotelId);
      },
    },
  }),
});
