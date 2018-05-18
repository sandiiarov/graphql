// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'BookingContactDetails',
  description: 'Contact details related to the booking',
  fields: {
    phone: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
  },
});
