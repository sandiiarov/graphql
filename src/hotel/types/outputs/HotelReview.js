// @flow

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
} from 'graphql';

export type HotelReviewType = {|
  score: number,
  count: number,
  description?: string,
|};

export default new GraphQLObjectType({
  name: 'HotelReview',
  fields: {
    score: {
      description:
        'The review score of the hotel, in the range 1-10 inclusive.',
      type: GraphQLFloat,
      resolve: ({ score }: HotelReviewType): number => score,
    },

    description: {
      description: 'The review score of the hotel in words.',
      type: GraphQLString,
      resolve: ({ description }: HotelReviewType): string | null =>
        description ? description : null,
    },

    count: {
      description: 'The number of reviews of the hotel.',
      type: GraphQLInt,
      resolve: ({ count }: HotelReviewType): number => count,
    },
  },
});
