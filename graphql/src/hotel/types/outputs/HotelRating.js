// @flow

import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

export default new GraphQLObjectType({
  name: 'HotelRating',
  fields: {
    stars: {
      description: 'Star rating is always in the interval 1-5 inclusive.',
      type: GraphQLInt,
      resolve: (stars: number) => {
        return stars === 0 ? null : stars;
      },
    },

    categoryName: {
      description: 'Name of the stars category.',
      type: GraphQLString,
      resolve: (stars: number) => {
        // see: https://en.wikipedia.org/wiki/Hotel_rating#European_Hotelstars_Union
        switch (stars) {
          case 1:
            return 'Tourist';
          case 2:
            return 'Standard';
          case 3:
            return 'Comfort';
          case 4:
            return 'First Class';
          case 5:
            return 'Luxury';
          default:
            return null;
        }
      },
    },
  },
});
