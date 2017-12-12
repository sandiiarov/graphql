// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from '../services/OpaqueIdentifier';

import type { HotelFacilityType } from '../dataLoaders/SingleHotel';

export default new GraphQLObjectType({
  name: 'HotelFacility',
  fields: {
    id: globalIdField('hotelFacility', ({ id }: HotelFacilityType) => id),

    name: {
      description: 'Name of the facility.',
      type: GraphQLString,
      resolve: ({ name }: HotelFacilityType) => name,
    },
  },
});
