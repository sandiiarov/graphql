// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from '../services/OpaqueIdentifier';

import GraphQLHotel from './Hotel';

import type { GraphqlContextType } from '../services/GraphqlContext';
import type { HotelFacilityType } from '../dataLoaders/SingleHotel';

export default new GraphQLObjectType({
  name: 'HotelFacility',
  // fields are thunk because there is circular dependency with Hotel type
  fields: () => ({
    id: globalIdField('hotelFacility', ({ id }: HotelFacilityType) => id),

    name: {
      description: 'Name of the facility.',
      type: GraphQLString,
      resolve: ({ name }: HotelFacilityType) => name,
    },

    hotel: {
      type: GraphQLHotel,
      resolve: (
        { hotelId }: HotelFacilityType,
        params: Object,
        { dataLoader }: GraphqlContextType,
      ) => {
        return dataLoader.singleHotel.load(hotelId);
      },
    },
  }),
});
