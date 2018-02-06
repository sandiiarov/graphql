// @flow

import { GraphQLNonNull } from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
} from 'graphql-relay';

import { processInputArguments } from '../services/ParametersFormatter';
import GraphQLHotelsSearchInput from '../types/inputs/AllAvailableHotelsSearchInput';
import GraphQLHotelsFilterInput from '../types/inputs/AllAvailableHotelsFilterInput';
import GraphQLAvailableHotelOptionsInput from '../types/inputs/AvailableHotelOptionsInput';
import GraphQLHotelAvailability from '../types/outputs/HotelAvailability';
import GraphQLHotelAvailabilityStats from '../types/outputs/HotelAvailabilityStats';

import type { GraphqlContextType } from '../../common/services/GraphqlContext';

const { connectionType: AllHotelsConnection } = connectionDefinitions({
  connectionFields: {
    stats: {
      type: GraphQLHotelAvailabilityStats,
      resolve: ancestor => ({ searchParams: ancestor.searchParams }),
    },
  },
  nodeType: GraphQLHotelAvailability,
});

export default {
  type: AllHotelsConnection,
  description:
    "Search for all available hotels in one location. It's necessary to " +
    'send checkin and checkout dates as well as rooms configuration to ' +
    'get availability info.',
  args: {
    search: {
      type: new GraphQLNonNull(GraphQLHotelsSearchInput),
    },
    filter: {
      type: GraphQLHotelsFilterInput,
    },
    options: {
      type: GraphQLAvailableHotelOptionsInput,
    },
    ...connectionArgs,
  },
  resolve: async (
    ancestor: mixed,
    args: Object,
    { dataLoader }: GraphqlContextType,
  ) => {
    const { search: searchArgs } = args;
    const searchParams = processInputArguments(args);

    const availableHotels = await dataLoader.hotel.availabilityByLocation.load(
      searchParams,
    );

    const connection = connectionFromArray(
      availableHotels.map(hotel => ({
        ...hotel,
        args: searchArgs, // pass search arguments down
      })),
      args,
    );

    return Object.assign(
      {},
      connection,
      { searchParams }, // pass search arguments down
    );
  },
};
