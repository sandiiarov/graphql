// @flow

import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

export type AirportType = {
  code: string,
  name: string,
};

export default new GraphQLObjectType({
  name: 'Airport',
  fields: {
    city: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ name }: AirportType): string => name,
    },

    code: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ code }: AirportType): string => code,
    },
  },
});
