// @flow

import { GraphQLInputObjectType, GraphQLNonNull, GraphQLList } from 'graphql';
import { GraphQLDate } from 'graphql-iso-date';
import GraphQLLocation from './LocationInput';
import PassengersInput from './PassengersInput';

export default new GraphQLInputObjectType({
  name: 'FlightsSearchInput',
  fields: {
    from: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(GraphQLLocation)),
      ),
    },
    to: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(GraphQLLocation)),
      ),
    },
    dateFrom: {
      type: new GraphQLNonNull(GraphQLDate),
    },
    dateTo: {
      type: new GraphQLNonNull(GraphQLDate),
    },
    passengers: {
      type: PassengersInput,
    },
  },
});
