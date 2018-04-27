// @flow

import { GraphQLString, GraphQLNonNull } from 'graphql';

import GraphQLLocation from '../types/outputs/Location';
import GraphQLLocale from '../../common/types/enums/Locale';

import type { GraphqlContextType } from '../../common/services/GraphqlContext';

export default {
  type: GraphQLLocation,
  description: 'Single location by ID.',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    locale: {
      type: GraphQLLocale,
      description:
        'DEPRECATED - use "Accept-Language" HTTP header to specify locale.' +
        'Language tag in the format of the RFC 5646.',
    },
  },
  resolve: async (
    ancestor: mixed,
    { id, locale: deprecatedLocale }: Object,
    { dataLoader, locale }: GraphqlContextType,
  ) => {
    // Deprecated locale takes precedence to keep backward compatibility
    const useLocale = deprecatedLocale ? deprecatedLocale : locale;

    return dataLoader.location.loadById(id, useLocale);
  },
};
