// @flow

import { GraphQLInputObjectType } from 'graphql';
import GraphQLLocale from '../../../common/types/enums/Locale';
import GraphQLLocationType from './LocationType';

export default new GraphQLInputObjectType({
  name: 'LocationsOptionsInput',
  fields: {
    locale: {
      type: GraphQLLocale,
      description: 'Language tag in the format of the RFC 5646.',
    },
    locationType: {
      type: GraphQLLocationType,
      description: 'Desired location type the response should only include.',
    },
  },
});
