// @flow

import { GraphQLObjectType, GraphQLFloat } from 'graphql';

import type { CoordinatesType } from '../Entities';

export default new GraphQLObjectType({
  name: 'Coordinates',
  fields: {
    lat: {
      type: GraphQLFloat,
      resolve: ({ latitude }: CoordinatesType): number => latitude,
    },

    lng: {
      type: GraphQLFloat,
      resolve: ({ longitude }: CoordinatesType): number => longitude,
    },
  },
});
