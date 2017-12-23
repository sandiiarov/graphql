// @flow

import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

import GraphQLCoordinates from '../../../location/types/outputs/Coordinates';
import { globalIdField } from '../../../common/services/OpaqueIdentifier';

import type { Coordinates } from '../../../location/Location';

export type HotelCity = {|
  id: string,
  name: string,
  location: Coordinates,
  numberOfHotels: number,
|};

export default new GraphQLObjectType({
  name: 'HotelCity',
  fields: {
    id: globalIdField('hotelCity', ({ id }: HotelCity): string => id),

    name: {
      description: 'Name of the hotel.',
      type: GraphQLString,
      resolve: ({ name }: HotelCity): string => name,
    },

    location: {
      type: GraphQLCoordinates,
      resolve: ({ location: { lat, lng } }: HotelCity): Coordinates => ({
        lat,
        lng,
      }),
    },

    numberOfHotels: {
      type: GraphQLInt,
      resolve: ({ numberOfHotels }: HotelCity): number => numberOfHotels,
    },
  },
});
