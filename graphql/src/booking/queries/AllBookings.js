// @flow

import type { GraphQLFieldConfig } from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
} from 'graphql-relay';

import GraphQLBooking from '../types/outputs/Booking';

import type { GraphqlContextType } from '../../common/services/GraphqlContext';

const { connectionType: AllBookingsConnection } = connectionDefinitions({
  nodeType: GraphQLBooking,
});

export default ({
  type: AllBookingsConnection,
  description: 'Search for your flight bookings.',
  args: connectionArgs,
  resolve: async (
    ancestor: mixed,
    args: Object,
    { dataLoader }: GraphqlContextType,
  ) => connectionFromPromisedArray(dataLoader.bookings.load(), args),
}: GraphQLFieldConfig<mixed, GraphqlContextType>);
