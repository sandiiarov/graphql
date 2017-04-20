// @flow

import { GraphQLObjectType, GraphQLNonNull } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';
import Airport from './Airport';

import type { AirportType } from './Airport';

export type ArrivalType = {
  when: 0 | Object, // zero if doesn't exist
  where: AirportType,
};

export default new GraphQLObjectType({
  name: 'Arrival',
  fields: {
    airport: {
      type: new GraphQLNonNull(Airport),
      resolve: ({ where }: ArrivalType): AirportType => where,
    },

    time: {
      type: GraphQLDateTime,
      resolve: ({ when }: ArrivalType): ?Date =>
        when === 0 ? null : new Date(when.utc * 1000),
    },

    localTime: {
      type: GraphQLDateTime,
      resolve: ({ when }: ArrivalType): ?Date =>
        when === 0 ? null : new Date(when.local * 1000),
    },
  },
});
