// @flow

import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

export type AirportType = {
  code: string,
  name: string,
};

export default new GraphQLObjectType({
  name: 'Airport',
  fields: {
    code: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (airport: AirportType): string => airport.code,
    },

    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (airport: AirportType): string => airport.name,
    },
  },
});
