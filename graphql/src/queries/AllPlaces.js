// @flow

import { GraphQLNonNull, GraphQLList, GraphQLString } from 'graphql';
import GraphQLPlace from '../types/Place';
import request from '../services/HttpRequest';
import config from '../../config/application';

export default {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLPlace))),
  args: {
    search: {
      type: GraphQLString,
    },
  },
  resolve: (_: mixed, args: Object) =>
    request(
      config.restApiEndpoint.allPlaces({
        term: args.search,
      }),
    ),
};
