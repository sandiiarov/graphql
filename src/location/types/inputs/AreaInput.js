// @flow

import { GraphQLInputObjectType, GraphQLNonNull } from 'graphql';
import GraphQLCoordinates from '../../../common/types/inputs/CoordinatesInput';

export default new GraphQLInputObjectType({
  name: 'AreaInput',
  fields: {
    topLeft: {
      type: new GraphQLNonNull(GraphQLCoordinates),
      description: 'Top left coordinates of the area.',
    },
    bottomRight: {
      type: new GraphQLNonNull(GraphQLCoordinates),
      description: 'Bottom right coordinates of the area.',
    },
  },
});
