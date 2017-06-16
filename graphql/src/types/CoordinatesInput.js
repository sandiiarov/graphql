// @flow

import { GraphQLInputObjectType, GraphQLFloat, GraphQLNonNull } from 'graphql';

export default new GraphQLInputObjectType({
  name: 'CoordinatesInput',
  fields: {
    lat: {
      type: new GraphQLNonNull(GraphQLFloat),
    },

    lng: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
  },
});
