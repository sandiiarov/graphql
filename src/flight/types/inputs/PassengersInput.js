// @flow

import { GraphQLInputObjectType, GraphQLNonNull, GraphQLInt } from 'graphql';

export default new GraphQLInputObjectType({
  name: 'PassengersInput',
  fields: {
    adults: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    infants: {
      type: GraphQLInt,
    },
  },
});
