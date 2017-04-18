// @flow

import { GraphQLObjectType, GraphQLNonNull } from 'graphql';
import Airport from './Airport';

import type { AirportType } from './Airport';

export type DepartureType = {
  where: AirportType,
};

export default new GraphQLObjectType({
  name: 'Departure',
  fields() {
    return {
      airport: {
        type: new GraphQLNonNull(Airport),
        resolve: (departure: DepartureType): AirportType => departure.where,
      },
    };
  },
});
