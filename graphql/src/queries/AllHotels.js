// @flow

import { GraphQLNonNull, type GraphQLFieldConfig } from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
} from 'graphql-relay';

import GraphQLHotelsSearchInput from '../inputs/HotelsSearchInput';
import GraphQLHotel from '../outputs/Hotel';

import type { GraphqlContextType } from '../services/GraphqlContext';

const { connectionType: AllHotelsConnection } = connectionDefinitions({
  nodeType: GraphQLHotel,
});

export default ({
  type: AllHotelsConnection,
  description: 'Search for all hotels in one location.',
  args: {
    search: {
      type: new GraphQLNonNull(GraphQLHotelsSearchInput),
    },
    ...connectionArgs,
  },
  resolve: async (
    ancestor: mixed,
    args: Object,
    { dataLoader }: GraphqlContextType,
  ) => {
    return connectionFromPromisedArray(
      dataLoader.allHotels.load({
        latitude: args.search.latitude,
        longitude: args.search.longitude,
        checkin: args.search.checkin,
        checkout: args.search.checkout,
        roomsConfiguration: args.search.roomsConfiguration,
      }),
      args,
    );
  },
}: GraphQLFieldConfig<mixed, GraphqlContextType>);
