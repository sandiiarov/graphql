// @flow

import {
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLFloat,
} from 'graphql';

export default new GraphQLInputObjectType({
  name: 'HotelsFilterInput',
  fields: {
    starsRating: {
      type: new GraphQLList(GraphQLInt),
      description: 'List of hotels classes (stars) you want to filter.',
    },

    minPrice: {
      type: GraphQLFloat,
      description:
        'Show only hotels having minimum total price lower than or equal to this value.',
    },

    maxPrice: {
      type: GraphQLFloat,
      description:
        'Show only hotels having minimum total price higher than or equal to this value.',
    },
  },
});
