// @flow

import {
  GraphQLNonNull,
  GraphQLString,
  type GraphQLFieldConfig,
} from 'graphql';
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

export default ({
  type: HotelCitiesConnection,
  description:
    'All cities where you can find the hotels. This query can be used for ' +
    'suggestions of relevant cities (search for example).',
  args: {
    prefix: {
      type: new GraphQLNonNull(GraphQLString),
      description:
        "First few letters. Note that search doesn't work with prefix shorter " +
        'than 3 characters.',
    },
    ...connectionArgs,
  },
  resolve: async (
    ancestor: mixed,
    args: Object,
    { dataLoader }: GraphqlContextType,
  ) => {
    if (args.prefix.length < 3) {
      return Error(
        'City prefix is too short. It must be at least 3 characters long.',
      );
    }

    return connectionFromPromisedArray(
      dataLoader.hotel.cities.load(args.prefix),
      args,
    );
  },
}: GraphQLFieldConfig<mixed, GraphqlContextType>);
