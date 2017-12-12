// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';

import GraphQLCoordinates from './Coordinates';
import GraphQLLocationArea from './LocationArea';

import type { LocationArea, Location, Coordinates } from '../../Location';

export default new GraphQLObjectType({
  name: 'Location',
  fields: {
    locationId: {
      type: GraphQLString,
      description: '3-letter IATA code of airport or internal city code.',
      resolve: ({ locationId }: Location): string => locationId,
    },

    name: {
      type: GraphQLString,
      resolve: ({ name }: Location): string => name,
    },

    slug: {
      type: GraphQLString,
      resolve: ({ slug }: Location): string => slug,
    },

    timezone: {
      type: GraphQLString,
      resolve: ({ timezone }: Location): string => timezone,
    },

    location: {
      type: GraphQLCoordinates,
      resolve: ({ location }: Location): Coordinates => location,
    },

    type: {
      type: GraphQLString,
      description: 'Airport, city or country.',
      resolve: ({ type }: Location): string => type,
    },

    city: {
      type: GraphQLLocationArea,
      resolve: ({ city }: Location): ?LocationArea => city,
    },

    subdivision: {
      type: GraphQLLocationArea,
      resolve: ({ subdivision }: Location): ?LocationArea => subdivision,
    },

    country: {
      type: GraphQLLocationArea,
      resolve: ({ country }: Location): ?LocationArea => country,
    },
  },
});
