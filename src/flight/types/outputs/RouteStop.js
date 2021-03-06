// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';
import Location from '../../../location/types/outputs/Location';

import type { DepartureArrival } from '../../Flight';
import type { Location as LocationType } from '../../../location/Location';
import type { GraphqlContextType } from '../../../common/services/GraphqlContext';

export default new GraphQLObjectType({
  name: 'RouteStop',
  fields: {
    airport: {
      type: Location,
      resolve: (
        { where }: DepartureArrival,
        args: Object,
        { dataLoader, options, locale }: GraphqlContextType,
        { path }: GraphQLResolveInfo,
      ): Promise<LocationType> => {
        const queryOptions = options.getOptions(path) || {};
        const selectedLocale = queryOptions.locale || locale.format.dashed;
        return dataLoader.location.loadById(where.code, selectedLocale);
      },
    },

    time: {
      type: GraphQLDateTime,
      resolve: ({ when }: DepartureArrival): ?Date =>
        when == null ? null : when.utc, // intentional ==, can be null or undefined
    },

    localTime: {
      type: GraphQLDateTime,
      resolve: ({ when }: DepartureArrival): ?Date =>
        when == null ? null : when.local, // intentional ==, can be null or undefined
    },
    cityId: {
      type: GraphQLString,
      description: 'City id of the route stop',
      resolve: ({ where }: DepartureArrival): string => where.cityId,
    },
  },
});
