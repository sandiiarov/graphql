// @flow

import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLFloat,
} from 'graphql';
import { globalIdField, connectionDefinitions } from 'graphql-relay';

import { register } from '../../../node/typeStore';
import { nodeInterface } from '../../../node/node';

const currencyType = new GraphQLObjectType({
  name: 'CurrencyDetail',
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    code: {
      type: GraphQLString,
      description: 'The code of the currency as used on Kiwi.com frontend',
      resolve: payload => payload.id,
    },
    name: {
      type: GraphQLString,
      description: 'The name of the currency',
    },
    format: {
      type: GraphQLString,
      description: 'Format string of the currency',
    },
    uncertainFormat: {
      type: GraphQLBoolean,
      description: 'Whether the format of the currency is universally accepted',
    },
    round: {
      type: GraphQLInt,
      description:
        'Number of digits to round the currency to when doing conversion',
      resolve: payload => Number(payload.round),
    },
    enabledOnAffilId: {
      type: new GraphQLList(GraphQLString),
      description: 'List of affiliate IDs to enable the currency on',
      resolve: payload => payload.enabledOnAffilId || [],
    },
    fallback: {
      description: 'The code of the currency used as a fallback',
      type: GraphQLString,
    },
    rate: {
      description: 'Currency rate compared to Euro',
      type: GraphQLFloat,
    },
  }),
});

register('CurrencyDetail', currencyType);

export default currencyType;

export const {
  connectionType: currencyConnection,
  edgeType: currencyEdge,
} = connectionDefinitions({
  nodeType: currencyType,
});
