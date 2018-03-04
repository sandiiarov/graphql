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
    },
  },
  resolve: async (
    ancestor: mixed,
    { id, locale }: Object,
    { dataLoader }: GraphqlContextType,
  ) => {
    return dataLoader.location.loadById(id, locale);
  },
};
