// @flow

import { GraphQLObjectType, GraphQLList } from 'graphql';

import GraphQLPassenger from '../Passenger';

export default new GraphQLObjectType({
  name: 'InsuranceService',
  fields: {
    passengers: {
      type: GraphQLList(GraphQLPassenger),
      description: 'Returns passengers allowed to buy a travel insurance.',
    },
  },
});
