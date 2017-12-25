// @flow

import { GraphQLNonNull } from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
} from 'graphql-relay';

import GraphQLHotelsSearchInput from '../types/inputs/HotelsSearchInput';
import GraphQLHotelAvailability from '../types/outputs/HotelAvailability';

import type { GraphqlContextType } from '../../common/services/GraphqlContext';

const { connectionType: AllHotelsConnection } = connectionDefinitions({
  nodeType: GraphQLHotelAvailability,
});

export default {
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
    const availableHotels = await dataLoader.hotel.byLocation.load({
      latitude: args.search.latitude,
      longitude: args.search.longitude,
      checkin: args.search.checkin,
      checkout: args.search.checkout,
      roomsConfiguration: args.search.roomsConfiguration,
    });

    return connectionFromArray(
      availableHotels.map(hotel => ({
        ...hotel,
        args: args.search, // pass search arguments down
      })),
      args,
    );
  },
};
