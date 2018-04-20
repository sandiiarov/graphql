// @flow

import { GraphQLNonNull, GraphQLInt } from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
  cursorToOffset,
  toGlobalId,
} from 'graphql-relay';

import { processInputArguments } from '../services/ParametersFormatter';
import GraphQLHotelsSearchInput from '../types/inputs/AllAvailableHotelsSearchInput';
import GraphQLHotelsFilterInput from '../types/inputs/AllAvailableHotelsFilterInput';
import GraphQLAvailableHotelOptionsInput from '../types/inputs/AvailableHotelOptionsInput';
import GraphQLHotelAvailability from '../types/outputs/HotelAvailability';
import GraphQLHotelAvailabilityStats from '../types/outputs/HotelAvailabilityStats';
import { connectionFromArray } from '../../common/services/ArrayConnection';

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
    first: {
      type: GraphQLInt,
      defaultValue: 50,
    },
  },
  resolve: async (
    ancestor: mixed,
    args: Object,
    { dataLoader }: GraphqlContextType,
  ) => {
    if (args.last) {
      throw new Error(
        'Booking.com API does not support querying last, use first query paramter instead.',
      );
    }

    const { search: searchArgs } = args;
    const offset = args.after ? cursorToOffset(args.after) + 1 : 0;
    const searchParams = processInputArguments({ ...args, offset });
    const availableHotels = await dataLoader.hotel.availabilityByLocation.load(
      searchParams,
    );

    const connection = connectionFromArray(
      availableHotels.map(hotel => ({
        ...hotel,
        args: searchArgs, // pass search arguments down
      })),
      {
        ...args,
        after: offset,
      },
    );

    return Object.assign(
      {},
      connection,
      { searchParams }, // pass search arguments down
      // creating page info since booking.com does not provide needed data
      {
        pageInfo: {
          startCursor: toGlobalId('arrayconnection', offset.toString()),
          endCursor: toGlobalId(
            'arrayconnection',
            (offset + args.first - 1).toString(),
          ),
          hasPreviousPage: offset > 0,
          // if we get the count we ask for, there is most likely another page
          // if we get less than we asked for, there should not be more data to load
          hasNextPage: connection.edges.length === args.first,
        },
      },
    );
  },
};
