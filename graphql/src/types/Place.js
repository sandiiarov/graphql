// @flow

import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import { toGlobalId } from '../services/OpaqueIdentifier';
import GraphQLLocation from './Location';

import type { LocationType } from './Location';

export type PlaceType = {
  id: string,
  lat: number,
  lng: number,
  numberOfAirports: number,
  population: number,
  value: string,
};

export default new GraphQLObjectType({
  name: 'Place',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: ({ id }: PlaceType): string => toGlobalId('place', id),
    },

    location: {
      type: new GraphQLNonNull(GraphQLLocation),
      resolve: (place: PlaceType): LocationType => ({
        latitude: place.lat,
        longitude: place.lng,
      }),
    },

    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ value }: PlaceType): string => value,
    },

    numberOfAirports: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: ({ numberOfAirports }: PlaceType): number => numberOfAirports,
    },

    population: {
      type: GraphQLInt,
      resolve: ({ population }: PlaceType): number => population,
    },
  },
});
