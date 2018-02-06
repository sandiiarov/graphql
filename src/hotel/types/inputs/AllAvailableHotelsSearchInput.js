// @flow

import {
  GraphQLFloat,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLList,
} from 'graphql';
import { GraphQLDate } from 'graphql-iso-date';

import HotelRoomsConfiguration from './HotelRoomsConfiguration';

export default new GraphQLInputObjectType({
  name: 'HotelsSearchInput',
  description: 'You must provide lat/lng combination OR city ID.',
  fields: {
    latitude: {
      type: GraphQLFloat,
      description: 'Latitude in float format (example: 45.4654).',
    },

    longitude: {
      type: GraphQLFloat,
      description: 'Longitude in float format (example: 9.1859).',
    },

    cityId: {
      type: GraphQLString,
      description: 'Opaque ID of the city.',
    },

    checkin: {
      type: new GraphQLNonNull(GraphQLDate),
    },

    checkout: {
      type: new GraphQLNonNull(GraphQLDate),
    },

    roomsConfiguration: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(HotelRoomsConfiguration)),
      ),
    },
  },
});
