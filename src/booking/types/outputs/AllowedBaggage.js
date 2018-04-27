// @flow

import * as R from 'ramda';
import { GraphQLObjectType, GraphQLList } from 'graphql';
import GraphQLBaggage from './Baggage';
import GraphQLAdditionalBaggage from './AdditionalBaggage';

import type {
  AdditionalBaggageInfo,
  Baggage,
  AllowedBaggage,
} from '../../Baggage';

export default new GraphQLObjectType({
  name: 'AllowedBaggage',
  fields: {
    additionalBaggage: {
      type: new GraphQLList(GraphQLAdditionalBaggage),
      description: 'Extra and overweight baggage.',
      resolve: ({
        additionalBaggage,
      }: AllowedBaggage): AdditionalBaggageInfo[] => additionalBaggage,
    },

    cabin: {
      type: new GraphQLList(GraphQLBaggage), // carry-on
      description: 'Small carry-on luggage.',
      resolve: ({ cabin }: AllowedBaggage): Array<Baggage> => {
        return cabin.filter(isNotCompletelyNullable);
      },
    },

    checked: {
      type: new GraphQLList(GraphQLBaggage),
      description: 'Baggage checked online.',
      resolve: ({ checked }: AllowedBaggage): Array<Baggage> => {
        return checked.filter(isNotCompletelyNullable);
      },
    },
  },
});

const isNotCompletelyNullable = R.compose(
  R.not,
  R.isEmpty,
  R.reject(R.equals(null)),
);
