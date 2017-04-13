// @flow

import { GraphQLObjectType, GraphQLNonNull } from 'graphql';
import Airport from './Airport';

import type { AirportType } from './Airport';

export type ArrivalType = {
  where: AirportType,
};

export default new GraphQLObjectType({
  name: 'Arrival',
  fields: {
    airport: {
      type: new GraphQLNonNull(Airport),
      resolve: ({ where }: ArrivalType): AirportType => where,
    },
  },
});
