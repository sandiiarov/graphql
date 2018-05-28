// @flow

import { GraphQLString, GraphQLNonNull } from 'graphql';

import WhitelabeledServices from '../types/output/WhitelabeledServices';

export default {
  type: WhitelabeledServices,
  args: {
    iataCode: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (_: Object, args: {| +iataCode: string |}) => ({
    iataCode: args.iataCode,
  }),
};
