// @flow

import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

export default new GraphQLObjectType({
  name: 'HotelReview',
  fields: {
    score: {
      description:
        'The review score of the hotel, in the range 1-10 inclusive.',
      type: GraphQLInt,
      resolve: () => null, // we currently do not get all the necessary data
    },

    description: {
      description: 'The review score of the hotel in words.',
      type: GraphQLString,
      resolve: () => null, // we currently do not get all the necessary data
    },

    count: {
      description: 'The number of reviews of the hotel.',
      type: GraphQLInt,
      resolve: () => null, // we currently do not get all the necessary data
    },
  },
});
