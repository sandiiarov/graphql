// @flow

import { GraphQLString, GraphQLNonNull } from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
} from 'graphql-relay';
import GraphQLLocation from '../types/Location';

import type { GraphqlContextType } from '../services/GraphqlContext';

const { connectionType: AllLocationsConnection } = connectionDefinitions({
  nodeType: GraphQLLocation,
});

export default {
  type: AllLocationsConnection,
  args: {
    search: {
      type: new GraphQLNonNull(GraphQLString),
    },
    ...connectionArgs,
  },
  resolve: async (
    ancestor: mixed,
    args: Object,
    context: GraphqlContextType,
  ) => {
    const response = await context.dataLoader.locationSuggestions.load(
      args.search,
    );
    return connectionFromArray(response, args);
  },
};
