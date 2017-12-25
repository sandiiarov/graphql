// @flow

import {
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLList,
} from 'graphql';
import { GraphQLDate } from 'graphql-iso-date';

import HotelRoomsConfiguration from './HotelRoomsConfiguration';

export default new GraphQLInputObjectType({
  name: 'HotelsSearchInput',
  fields: {
    latitude: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: 'Latitude in float format (example: 45.4654).',
    },

    longitude: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: 'Longitude in float format (example: 9.1859).',
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
