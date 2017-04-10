// @flow

import { GraphQLObjectType, GraphQLNonNull, GraphQLID } from 'graphql';

export type DepartureType = {
  departure: string,
};

export default new GraphQLObjectType({
  name: 'Departure',
  fields() {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        resolve(departure: DepartureType): string {
          return JSON.stringify(departure); // FIXME: vrátit skutečná data
        },
      },
    };
  },
});
