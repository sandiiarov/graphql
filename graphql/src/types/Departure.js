// @flow

import { GraphQLObjectType, GraphQLNonNull } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';
import Airport from './Airport';

import type { AirportType } from './Airport';

export type DepartureType = {
  where: AirportType,
};

export default new GraphQLObjectType({
  name: 'Departure',
  fields: {
    airport: {
      type: new GraphQLNonNull(Airport),
      resolve: ({ where }: DepartureType): AirportType => where,
    },

    time: {
      type: GraphQLDateTime,
      resolve: ({ when }: DepartureType): ?Date =>
        when === 0 ? null : new Date(when.utc * 1000),
    },

    localTime: {
      type: GraphQLDateTime,
      resolve: ({ when }: DepartureType): ?Date =>
        when === 0 ? null : new Date(when.local * 1000),
    },
  },
});
