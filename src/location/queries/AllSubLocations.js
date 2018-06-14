// @flow

import { GraphQLString, GraphQLNonNull } from 'graphql';
import { connectionArgs } from 'graphql-relay';

import GraphQLLocationConnection from '../types/outputs/LocationConnection';
import LocationsOptionsInput from '../types/inputs/LocationsOptions';
import { connectionFromArray } from '../../common/services/ArrayConnection';

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
    { dataLoader, locale }: GraphqlContextType,
  ) => {
    const locationOptions = {
      locale: locale.format.underscored,
      ...(options || {}),
    };
    const locations = await dataLoader.locations.loadSubLocations(
      id,
      locationOptions,
    );
    return connectionFromArray(locations, pagination);
  },
};
