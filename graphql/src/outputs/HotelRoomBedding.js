// @flow

import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

export default new GraphQLObjectType({
  name: 'HotelRoomBedding',
  fields: {
    type: {
      type: GraphQLString,
      resolve: ({ type }) => type,
    },

    amount: {
      type: GraphQLInt,
      resolve: ({ amount }) => amount,
    },
  },
});
