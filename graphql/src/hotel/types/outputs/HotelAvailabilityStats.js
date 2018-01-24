// @flow

import { GraphQLObjectType, GraphQLFloat } from 'graphql';
import type { GraphqlContextType } from '../../../common/services/GraphqlContext';

export default new GraphQLObjectType({
  name: 'HotelAvailabilityStats',
  description:
    'Overall statistics related to all hotels matching search & filter criteria',
  fields: {
    priceMax: {
      type: GraphQLFloat,
      resolve: (ancestor, args: Object, { dataLoader }: GraphqlContextType) => {
        return dataLoader.hotel.priceStats.load({
          searchParams: ancestor.searchParams,
          boundary: 'MAX',
        });
      },
    },
    priceMin: {
      type: GraphQLFloat,
      resolve: (ancestor, args: Object, { dataLoader }: GraphqlContextType) => {
        return dataLoader.hotel.priceStats.load({
          searchParams: ancestor.searchParams,
          boundary: 'MIN',
        });
      },
    },
  },
});
