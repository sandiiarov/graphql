// @flow

import { GraphQLInputObjectType, GraphQLFloat, GraphQLInt } from 'graphql';

export default new GraphQLInputObjectType({
  name: 'RadiusInput',
  fields: {
    lat: {
      type: GraphQLFloat,
    },
    lng: {
      type: GraphQLFloat,
    },
    radius: {
      type: GraphQLInt,
      description: 'Distance in kilometers',
    },
  },
});
