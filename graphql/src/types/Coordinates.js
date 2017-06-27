// @flow

import { GraphQLObjectType, GraphQLFloat } from 'graphql';

import type { CoordinatesType } from '../Entities';

export default new GraphQLObjectType({
  name: 'Coordinates',
  fields: {
    lat: {
      type: GraphQLFloat,
      description: 'Latitude.',
      resolve: ({ lat }: CoordinatesType): number => lat,
    },

    lng: {
      type: GraphQLFloat,
      description: 'Longitude.',
      resolve: ({ lng }: CoordinatesType): number => lng,
    },
  },
});
