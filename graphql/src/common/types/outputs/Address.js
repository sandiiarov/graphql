// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';

export type Address = {|
  street: string,
  city: string,
  zip: string,
|};

/**
 * @see: https://en.wikipedia.org/wiki/Address_(geography)#Current_addressing_schemes
 */
export default new GraphQLObjectType({
  name: 'Address',
  fields: {
    street: {
      type: GraphQLString,
      description: 'Contains street and number.',
      resolve: ({ street }: Address) => street,
    },

    city: {
      type: GraphQLString,
      resolve: ({ city }: Address) => city,
    },

    zip: {
      type: GraphQLString,
      resolve: ({ zip }: Address) => zip,
    },
  },
});
