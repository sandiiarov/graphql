// @flow

import { GraphQLObjectType, GraphQLFloat } from 'graphql';

import type { CoordinatesType } from '../Entities';

export default new GraphQLObjectType({
  name: 'Coordinates',
  fields: {
    lat: {
      type: GraphQLFloat,
      resolve: ({ lat }: CoordinatesType): number => lat,
    },

    lng: {
      type: GraphQLFloat,
      resolve: ({ lng }: CoordinatesType): number => lng,
    },
  },
});
