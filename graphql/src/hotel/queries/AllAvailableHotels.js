// @flow

import { GraphQLNonNull } from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
} from 'graphql-relay';

import GraphQLHotelsSearchInput from '../types/inputs/AllAvailableHotelsSearchInput';
import GraphQLHotelsFilterInput from '../types/inputs/AllAvailableHotelsFilterInput';
import GraphQLHotelAvailability from '../types/outputs/HotelAvailability';

import type { GraphqlContextType } from '../../common/services/GraphqlContext';

const { connectionType: AllHotelsConnection } = connectionDefinitions({
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
    ...connectionArgs,
  },
  resolve: async (
    ancestor: mixed,
    args: Object,
    { dataLoader }: GraphqlContextType,
  ) => {
    const { search: searchArgs, filter: filterArgs } = args;

    let searchParams: Object = {
      checkin: searchArgs.checkin,
      checkout: searchArgs.checkout,
      roomsConfiguration: searchArgs.roomsConfiguration,
      ...(filterArgs && {
        stars: filterArgs.starsRating,
        minPrice: filterArgs.minPrice,
        maxPrice: filterArgs.maxPrice,
      }),
    };

    const cityId = searchArgs.cityId;
    if (cityId) {
      const idObject = fromGlobalId(cityId); // id is opaque
      if (idObject.type !== 'hotelCity') {
        throw new Error(
          `Hotel city ID mishmash. You cannot search hotels with city ID ` +
            `'${cityId}' because this ID is not ID of the hotel city. ` +
            `Please use opaque ID.`,
        );
      }
      searchParams.cityId = idObject.id;
    } else {
      searchParams.latitude = searchArgs.latitude;
      searchParams.longitude = searchArgs.longitude;
    }

    const availableHotels = await dataLoader.hotel.availabilityByLocation.load(
      searchParams,
    );

    return connectionFromArray(
      availableHotels.map(hotel => ({
        ...hotel,
        args: searchArgs, // pass search arguments down
      })),
      args,
    );
  },
};
