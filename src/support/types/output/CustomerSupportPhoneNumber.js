// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'CustomerSupportPhoneNumber',
  fields: {
    // add locale (locale flag, locale name like English, Deutch, Czech)

    availabilityDescription: {
      type: GraphQLString,
    },

    number: {
      type: GraphQLString,
    },
  },
});
