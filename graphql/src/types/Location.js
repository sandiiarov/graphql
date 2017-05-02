// @flow

import { GraphQLObjectType, GraphQLFloat } from 'graphql';

import type { LocationType } from '../Entities';

export default new GraphQLObjectType({
  name: 'Location',
  fields: {
    latitude: {
      type: GraphQLFloat,
      resolve: ({ latitude }: LocationType): number => latitude,
    },

    longitude: {
      type: GraphQLFloat,
      resolve: ({ longitude }: LocationType): number => longitude,
    },
  },
});
