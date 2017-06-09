// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';

import GraphQLCoordinates from '../types/Coordinates';
import GraphQLLocationArea from '../types/LocationArea';
import type {
  CoordinatesType,
  LocationType,
  LocationAreaType,
} from '../Entities';

export default new GraphQLObjectType({
  name: 'Location',
  fields: {
    locationId: {
      type: GraphQLString,
      resolve: ({ locationId }: LocationType): string => locationId,
    },

    name: {
      type: GraphQLString,
      resolve: ({ name }: LocationType): string => name,
    },

    code: {
      type: GraphQLString,
      resolve: ({ code }: LocationType): string => code,
    },

    slug: {
      type: GraphQLString,
      resolve: ({ slug }: LocationType): string => slug,
    },

    timezone: {
      type: GraphQLString,
      resolve: ({ timezone }: LocationType): string => timezone,
    },

    location: {
      type: GraphQLCoordinates,
      resolve: ({ location }: LocationType): CoordinatesType => location,
    },

    type: {
      type: GraphQLString,
      resolve: ({ type }: LocationType): string => type,
    },

    city: {
      type: GraphQLLocationArea,
      resolve: ({ city }: LocationType): ?LocationAreaType => city,
    },

    subdivision: {
      type: GraphQLLocationArea,
      resolve: ({ subdivision }: LocationType): ?LocationAreaType =>
        subdivision,
    },

    country: {
      type: GraphQLLocationArea,
      resolve: ({ country }: LocationType): ?LocationAreaType => country,
    },
  },
});
