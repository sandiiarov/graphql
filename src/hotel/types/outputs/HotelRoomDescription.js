// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'HotelRoomDescription',
  fields: {
    title: {
      type: GraphQLString,
    },

    text: {
      type: GraphQLString,
    },
  },
});
