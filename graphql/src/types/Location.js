// @flow

import { GraphQLObjectType, GraphQLFloat } from 'graphql';

export type LocationType = {
  latitude: number,
  longitude: number,
};

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
