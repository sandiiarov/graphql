// @flow

import { GraphQLInputObjectType, GraphQLNonNull } from 'graphql';
import GraphQLCoordinates from './CoordinatesInput';

export default new GraphQLInputObjectType({
  name: 'AreaInput',
  fields: {
    topLeft: {
      type: new GraphQLNonNull(GraphQLCoordinates),
    },
    bottomRight: {
      type: new GraphQLNonNull(GraphQLCoordinates),
    },
  },
});
