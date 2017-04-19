// @flow

import { GraphQLNonNull, GraphQLID } from 'graphql';
import GraphQLBooking from '../types/Booking';
import request from '../services/HttpRequest';
import config from '../../config/application';

import type { GraphqlContextType } from '../services/GraphqlContext';

export default {
  type: GraphQLBooking, // may be null (doesn't exist)
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: (_: mixed, args: Object, context: GraphqlContextType) =>
    request(
      `${config.restApiEndpoint.allBookings}/${args.id}`,
      context.apiToken,
    ),
};
