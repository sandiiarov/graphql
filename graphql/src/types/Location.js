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
      description: '3-letter IATA code of airport or internal city code.',
      resolve: ({ locationId }: LocationType): string => locationId,
    },

    name: {
      type: GraphQLString,
      resolve: ({ name }: LocationType): string => name,
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
      description: 'Airport, city or country.',
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
