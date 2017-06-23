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
      description: 'Latitude of the center of the circle.',
    },
    lng: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: 'Longitude of the center of the circle.',
    },
    radius: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Distance in kilometers.',
    },
  },
});
