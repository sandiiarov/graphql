// @flow

import { GraphQLString, GraphQLNonNull } from 'graphql';
import { connectionArgs, connectionFromArray } from 'graphql-relay';

import GraphQLLocationConnection from '../types/outputs/LocationConnection';
import LocationsOptionsInput from '../types/inputs/LocationsOptions';

import type { GraphqlContextType } from '../../common/services/GraphqlContext';

export default {
  type: GraphQLLocationConnection,
  description:
    'All locations in certain location. For example all airports in London',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Location ID',
    },
    options: {
      type: LocationsOptionsInput,
    },
    ...connectionArgs,
  },
  resolve: async (
    ancestor: mixed,
    { id, options, ...pagination }: Object,
    { dataLoader }: GraphqlContextType,
  ) => {
    const locations = await dataLoader.locationSuggestions.loadSubLocations(
      id,
      options,
    );
    return connectionFromArray(locations, pagination);
  },
};
