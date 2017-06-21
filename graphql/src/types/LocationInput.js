// @flow

import { GraphQLInputObjectType, GraphQLString } from 'graphql';
import GraphQLRadius from '../types/RadiusInput';

export default new GraphQLInputObjectType({
  name: 'LocationInput',
  fields: {
    location: {
      type: GraphQLString,
    },
    radius: {
      type: GraphQLRadius,
    },
  },
});
