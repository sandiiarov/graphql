// @flow

import { GraphQLInt, GraphQLInputObjectType, GraphQLList } from 'graphql';

export default new GraphQLInputObjectType({
  name: 'HotelsFilterInput',
  fields: {
    starsRating: {
      type: new GraphQLList(GraphQLInt),
      description: 'List of hotels classes (stars) you want to filter.',
    },
  },
});
