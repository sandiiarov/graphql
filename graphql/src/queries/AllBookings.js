// @flow

import { GraphQLNonNull, GraphQLList } from 'graphql';
import GraphQLBooking from '../types/Booking';
import request from '../services/HttpRequest';
import config from '../../config/application';

import type { GraphqlContextType } from '../services/GraphqlContext';

export default {
  type: new GraphQLList(new GraphQLNonNull(GraphQLBooking)),
  resolve: (_: mixed, args: Object, context: GraphqlContextType) =>
    request(config.restApiEndpoint.allBookings, context.apiToken),
};
