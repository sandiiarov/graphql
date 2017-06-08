// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';

import type { CityType } from '../Entities';

export default new GraphQLObjectType({
  name: 'City',
  fields: {
    name: {
      type: GraphQLString,
      resolve: ({ name }: CityType): string => name,
    },
  },
});
