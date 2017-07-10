// @flow

import { GraphQLObjectType, GraphQLFloat } from 'graphql';

import type { Coordinates } from '../types/Location';

export default new GraphQLObjectType({
  name: 'Coordinates',
  fields: {
    lat: {
      type: GraphQLFloat,
      description: 'Latitude.',
      resolve: ({ lat }: Coordinates): number => lat,
    },

    lng: {
      type: GraphQLFloat,
      description: 'Longitude.',
      resolve: ({ lng }: Coordinates): number => lng,
    },
  },
});
