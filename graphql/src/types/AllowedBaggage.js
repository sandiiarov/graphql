// @flow

import _ from 'lodash';
import { GraphQLObjectType, GraphQLList } from 'graphql';
import GraphQLBaggage from './Baggage';
import GraphQLAdditionalBaggage from './AdditionalBaggage';

import type {
  AllowedBaggageType,
  BaggageType,
  AdditionalBaggageInfoType,
} from '../Entities';

export default new GraphQLObjectType({
  name: 'AllowedBaggage',
  fields: {
    additionalBaggage: {
      type: new GraphQLList(GraphQLAdditionalBaggage),
      description: 'Extra and overweight baggage.',
      resolve: ({
        additionalBaggage,
      }: AllowedBaggageType): Array<AdditionalBaggageInfoType> =>
        additionalBaggage,
    },

    cabin: {
      type: new GraphQLList(GraphQLBaggage), // carry-on
      description: 'Small carry-on luggage.',
      resolve: ({ cabin }: AllowedBaggageType): Array<BaggageType> => {
        return cabin.filter(bag => isNotCompletelyNullable(bag));
      },
    },

    checked: {
      type: new GraphQLList(GraphQLBaggage),
      description: 'Baggage checked online.',
      resolve: ({ checked }: AllowedBaggageType): Array<BaggageType> => {
        return checked.filter(bag => isNotCompletelyNullable(bag));
      },
    },
  },
});

function isNotCompletelyNullable(object): boolean {
  return !_.isEmpty(_.omitBy(object, _.isNull));
}
