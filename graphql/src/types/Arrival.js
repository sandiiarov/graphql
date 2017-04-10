// @flow

import { GraphQLObjectType, GraphQLNonNull, GraphQLID } from 'graphql';

export type ArrivalType = {
  departure: string,
};

export default new GraphQLObjectType({
  name: 'Arrival',
  fields() {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        resolve: (arrival: ArrivalType): string => JSON.stringify(arrival), // FIXME: vrátit skutečná data
      },
    };
  },
});
