// @flow

import { GraphQLInputObjectType, GraphQLNonNull, GraphQLList } from 'graphql';
import GraphQLLocation from './LocationInput';
import PassengersInput from './PassengersInput';
import DateInput from './DateInput';

export default new GraphQLInputObjectType({
  name: 'FlightsSearchInput',
  fields: {
    from: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(GraphQLLocation)),
      ),
      description: 'From where you want to fly?',
    },
    to: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(GraphQLLocation)),
      ),
      description: 'To where you want to fly?',
    },
    date: {
      type: new GraphQLNonNull(DateInput),
      description: 'When do you want to leave?',
    },
    returnDate: {
      type: DateInput,
      description: 'When do you want to return?',
    },
    passengers: {
      type: PassengersInput,
    },
  },
});
