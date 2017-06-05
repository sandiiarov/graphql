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

import type { LocationType, PlaceType } from '../Entities';

export default new GraphQLObjectType({
  name: 'Place',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: ({ id }: PlaceType): string => toGlobalId('place', id),
    },

    location: {
      type: new GraphQLNonNull(GraphQLLocation),
      resolve: ({ location }: PlaceType): LocationType => location,
    },

    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ name }: PlaceType): string => name,
    },

    numberOfAirports: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: ({ numberOfAirports }: PlaceType): number => numberOfAirports,
    },

    population: {
      type: GraphQLInt,
      resolve: ({ population }: PlaceType): ?number => population,
    },
  },
});
