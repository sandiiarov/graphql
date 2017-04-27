// @flow

import { GraphQLObjectType, GraphQLNonNull } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';
import Airport from './Airport';

import type { AirportType, ArrivalType } from '../Entities';

export default new GraphQLObjectType({
  name: 'Arrival',
  fields: {
    airport: {
      type: new GraphQLNonNull(Airport),
      resolve: ({ where }: ArrivalType): AirportType => where,
    },

    time: {
      type: GraphQLDateTime,
      resolve: ({ when }: ArrivalType): null | Date =>
        when === null ? null : when.utc,
    },

    localTime: {
      type: GraphQLDateTime,
      resolve: ({ when }: ArrivalType): null | Date =>
        when === null ? null : when.local,
    },
  },
});
