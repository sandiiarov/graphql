// @flow

import { GraphQLString } from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
} from 'graphql-relay';

import GraphQLHotelCity from '../types/outputs/HotelCity';

import type { GraphqlContextType } from '../../common/services/GraphqlContext';

const { connectionType: HotelCitiesConnection } = connectionDefinitions({
  nodeType: GraphQLHotelCity,
});

export default {
  type: HotelCitiesConnection,
  description: `
    All cities where you can find the hotels. This query can be used for
    suggestions of relevant cities (search for example). Cities can be filtered
    by prefix with typo tolerance. Items are sorted by prefix matching and a
    number of hotels (desc). When the prefix is omitted top cities are returned.`,
  args: {
    prefix: {
      type: GraphQLString,
      description: 'First few letters.',
    },
    ...connectionArgs,
  },
  resolve: async (
    ancestor: mixed,
    args: Object,
    { dataLoader }: GraphqlContextType,
  ) => {
    return connectionFromPromisedArray(
      dataLoader.hotel.cities.load(args.prefix || ''),
      args,
    );
  },
};
