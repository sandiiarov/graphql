// @flow

import { GraphQLInputObjectType, GraphQLFloat, GraphQLNonNull } from 'graphql';

export default new GraphQLInputObjectType({
  name: 'CoordinatesInput',
  fields: {
    lat: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: 'Latitude.',
    },

    lng: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: 'Longitude.',
    },
  },
});
