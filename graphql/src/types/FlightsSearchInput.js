// @flow

import { GraphQLInputObjectType, GraphQLNonNull, GraphQLList } from 'graphql';

import GraphQLLocation from './LocationInput';
import GraphQLDateFrom from './DateFromInput';
import GraphQLDateTo from './DateToInput';
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
      type: new GraphQLNonNull(GraphQLDateFrom),
    },
    dateTo: {
      type: new GraphQLNonNull(GraphQLDateTo),
    },
    passengers: {
      type: PassengersInput,
    },
  },
});
