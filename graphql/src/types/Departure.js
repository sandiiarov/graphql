// @flow

import { GraphQLObjectType, GraphQLNonNull } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';
import Airport from './Airport';

import type { AirportType, DepartureType } from '../Entities';

export default new GraphQLObjectType({
  name: 'Departure',
  fields: {
    airport: {
      type: new GraphQLNonNull(Airport),
      resolve: ({ where }: DepartureType): AirportType => where,
    },

    time: {
      type: GraphQLDateTime,
      resolve: ({ when }: DepartureType): null | Date =>
        when === null ? null : when.utc,
    },

    localTime: {
      type: GraphQLDateTime,
      resolve: ({ when }: DepartureType): null | Date =>
        when === null ? null : when.local,
    },
  },
});
