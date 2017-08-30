// @flow

import { GraphQLString } from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
} from 'graphql-relay';
import type { GraphQLResolveInfo, GraphQLFieldConfig } from 'graphql';

import GraphQLLocation from '../outputs/Location';
import GraphQLRadius from '../inputs/RadiusInput';
import GraphQLArea from '../inputs/AreaInput';
import LocationsOptionsInput from '../inputs/LocationsOptions';
import type { GraphqlContextType } from '../services/GraphqlContext';
import type { Rectangle } from '../types/Location';

const { connectionType: AllLocationsConnection } = connectionDefinitions({
  nodeType: GraphQLLocation,
});

export default ({
  type: AllLocationsConnection,
  description: 'Search for airports, cities, countries.',
  args: {
    search: {
      type: GraphQLString,
      description: 'Search location by name.',
    },
    radius: {
      type: GraphQLRadius,
      description: 'Search location by radius.',
    },
    area: {
      type: GraphQLArea,
      description: 'Search location by area.',
    },
    options: {
      type: LocationsOptionsInput,
    },
    ...connectionArgs,
  },
  resolve: async (
    ancestor: mixed,
    args: Object,
    context: GraphqlContextType,
    { path }: GraphQLResolveInfo,
  ) => {
    if (path) {
      context.options.setOptions(path.key, args.options);
    }

    let response;
    if (args.search) {
      response = await context.dataLoader.locationSuggestions.load(
        args.search,
        args.options,
      );
    } else if (args.radius) {
      response = await context.dataLoader.locationSuggestions.loadByRadius(
        args.radius,
        args.options,
      );
    } else if (args.area) {
      validateArea(args.area);
      response = await context.dataLoader.locationSuggestions.loadByArea(
        args.area,
        args.options,
      );
    } else {
      throw new Error(
        `You must specify 'search', 'radius' or 'area' argument to find locations.`,
      );
    }
    return connectionFromArray(response, args);
  },
}: GraphQLFieldConfig<mixed, GraphqlContextType>);

function validateArea({ topLeft, bottomRight }: Rectangle) {
  if (topLeft.lat <= bottomRight.lat) {
    throw new Error(
      `Top left latitude of the area should be greater than bottom right latitude.`,
    );
  }
  if (topLeft.lng >= bottomRight.lng) {
    throw new Error(
      `Top left longitude of the area should be lower than bottom right longitude.`,
    );
  }
}
