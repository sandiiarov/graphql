// @flow

import {
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLInt,
} from 'graphql';

export default new GraphQLInputObjectType({
  name: 'RoomsConfiguration',
  fields: {
    adultsCount: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    children: {
      type: new GraphQLList(
        new GraphQLInputObjectType({
          name: 'RoomsChildrenConfiguration',
          fields: {
            age: {
              type: GraphQLInt,
            },
          },
        }),
      ),
    },
  },
});
