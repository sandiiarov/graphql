// @flow

import { GraphQLString } from 'graphql';
import { connectionArgs } from 'graphql-relay';

import { connectionFromArray } from '../../common/services/ArrayConnection';
import GraphQLRadius from '../types/inputs/RadiusInput';
import GraphQLArea from '../types/inputs/AreaInput';
import LocationsOptionsInput from '../types/inputs/LocationsOptions';
import GraphQLLocationConnection from '../types/outputs/LocationConnection';
import { getLocations } from './AllLocationsResolver';

import type { GraphqlContextType } from '../../common/services/GraphqlContext';

export default {
  type: GraphQLLocationConnection,
  description:
    'Search for airports, cities, countries. You can search by location name,' +
    ' radius on the map or rectangle on the map. If you do not specify one of' +
    ' these search inputs then the alphabetical dump of all locations is returned.',
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
    slugRadius: {
      type: GraphQLString,
      description:
        'Combination of slug and radius. e.g. bratislava-slovakia-169km',
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
  ) => {
    const locations = await getLocations(ancestor, args, context);

    return connectionFromArray(locations, args);
  },
};
