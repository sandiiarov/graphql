// @flow

import { GraphQLString } from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
} from 'graphql-relay';
import GraphQLLocation from '../types/Location';
import GraphQLRadius from '../types/RadiusInput';

import type { GraphqlContextType } from '../services/GraphqlContext';

const { connectionType: AllLocationsConnection } = connectionDefinitions({
  nodeType: GraphQLLocation,
});

export default {
  type: AllLocationsConnection,
  args: {
    search: {
      type: GraphQLString,
    },
    radius: {
      type: GraphQLRadius,
    },
    ...connectionArgs,
  },
  resolve: async (
    ancestor: mixed,
    args: Object,
    context: GraphqlContextType,
  ) => {
    let response;
    if (args.search) {
      response = await context.dataLoader.locationSuggestions.load(args.search);
    } else if (args.radius) {
      response = await context.dataLoader.locationSuggestions.loadByRadius(
        args.radius,
      );
    } else {
      throw new Error(
        `You must specify 'search' or 'radius' argument to find locations.`,
      );
    }
    return connectionFromArray(response, args);
  },
};
