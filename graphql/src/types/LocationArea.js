// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';

import type { LocationAreaType } from '../Entities';

export default new GraphQLObjectType({
  name: 'LocationArea',
  fields: {
    locationId: {
      type: GraphQLString,
      resolve: ({ locationId }: LocationAreaType): string => locationId,
    },
    name: {
      type: GraphQLString,
      resolve: ({ name }: LocationAreaType): string => name,
    },
    slug: {
      type: GraphQLString,
      resolve: ({ slug }: LocationAreaType): string => slug,
    },
  },
});
