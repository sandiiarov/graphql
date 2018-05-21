// @flow

import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from 'graphql';
import { globalIdField } from 'graphql-relay';
import type { Airline } from '../../../flight/Flight';

export type CarrierData = {|
  code: string,
  name: string,
  isLowCost: boolean,
|};

export default new GraphQLObjectType({
  name: 'Carrier',
  fields: {
    id: globalIdField('Carrier', ({ code }: CarrierData) => code),

    name: {
      type: GraphQLString,
      resolve: ({ name }: CarrierData): string => name,
    },

    code: {
      type: GraphQLString,
      description: 'Unique code of the carrier, IATA code for airlines.',
      resolve: ({ code }: CarrierData): string => code,
    },

    isLowCost: {
      type: GraphQLBoolean,
      description: 'Indicates whether it is low cost carrier.',
      resolve: ({ isLowCost }: CarrierData): boolean => isLowCost,
    },
  },
});

export const getUniqueCarriers = (
  carrierData: $ReadOnlyArray<?Airline | ?CarrierData>,
): Iterator<CarrierData> => {
  const carriers = carrierData.reduce((acc, carrier) => {
    if (!carrier || !carrier.code) {
      return acc;
    }

    return acc.set(carrier.code, {
      code: carrier.code,
      name: carrier.name,
      isLowCost: carrier.isLowCost,
    });
  }, new Map());

  return carriers.values();
};
