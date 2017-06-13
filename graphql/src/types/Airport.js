// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';

import type { AirportType, CityType } from '../Entities';
import GraphQLCity from './City';

export default new GraphQLObjectType({
  name: 'Airport',
  fields: {
    city: {
      type: GraphQLCity,
      resolve: ({ cityName }: AirportType): CityType => ({
        name: cityName,
      }),
    },

    code: {
      type: GraphQLString,
      resolve: ({ code }: AirportType): string => code,
    },
  },
});
