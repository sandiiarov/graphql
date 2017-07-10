// @flow

import { GraphQLInputObjectType, GraphQLNonNull, GraphQLInt } from 'graphql';

export default new GraphQLInputObjectType({
  name: 'PassengerInput',
  fields: {
    adults: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
});
