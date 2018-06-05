// @flow

import { GraphQLString, GraphQLNonNull } from 'graphql';
import { fromGlobalId } from 'graphql-relay';

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
    const idObject = fromGlobalId(id); // id is opaque
    if (idObject.type && idObject.type !== 'location') {
      throw new Error(
        `Provided id consist of "${idObject.type}" type instead of location.`,
      );
    }
    const locationId = idObject.type ? idObject.id : id;
    // Deprecated locale takes precedence to keep backward compatibility
    const selectedLocale = deprecatedLocale ? deprecatedLocale : locale;

    return dataLoader.location.loadById(locationId, selectedLocale);
  },
};
