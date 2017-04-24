// @flow

import _ from 'lodash';
import { GraphQLObjectType, GraphQLNonNull, GraphQLList } from 'graphql';
import GraphQLBaggage from './Baggage';

import type { AllowedBaggageType, BaggageType } from '../Entities';

export default new GraphQLObjectType({
  name: 'AllowedBaggage',
  fields: {
    cabin: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLBaggage)), // carry-on
      resolve: ({ cabin }: AllowedBaggageType): Array<BaggageType> => {
        return cabin.filter(bag => isNotCompletelyNullable(bag));
      },
    },

    checked: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLBaggage)),
      resolve: ({ checked }: AllowedBaggageType): Array<BaggageType> => {
        return checked.filter(bag => isNotCompletelyNullable(bag));
      },
    },
  },
});

function isNotCompletelyNullable(object): boolean {
  return !_.isEmpty(_.omitBy(object, _.isNull));
}
