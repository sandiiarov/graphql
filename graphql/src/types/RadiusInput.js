// @flow

import {
  GraphQLInputObjectType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';

export default new GraphQLInputObjectType({
  name: 'RadiusInput',
  fields: {
    lat: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    lng: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    radius: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Distance in kilometers',
    },
  },
});
