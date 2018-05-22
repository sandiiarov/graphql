// @flow

import { GraphQLEnumType } from 'graphql';

export const CoveredBy = {
  KIWICOM: 'KIWICOM',
  CARRIER: 'CARRIER',
};

export const GraphQLCoveredBy = new GraphQLEnumType({
  name: 'CoveredBy',
  values: {
    KIWICOM: { value: 'KIWICOM' },
    CARRIER: { value: 'CARRIER' },
  },
});
