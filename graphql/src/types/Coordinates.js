// @flow

import { GraphQLObjectType, GraphQLFloat } from 'graphql';

import type { CoordinatesType } from '../Entities';

export default new GraphQLObjectType({
  name: 'Coordinates',
  fields: {
    latitude: {
      type: GraphQLFloat,
      resolve: ({ latitude }: CoordinatesType): number => latitude,
    },

    longitude: {
      type: GraphQLFloat,
      resolve: ({ longitude }: CoordinatesType): number => longitude,
    },
  },
});
