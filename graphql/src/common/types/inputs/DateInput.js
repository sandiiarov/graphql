// @flow

import { GraphQLInputObjectType } from 'graphql';
import { GraphQLDate } from 'graphql-iso-date';

export default new GraphQLInputObjectType({
  name: 'DateInput',
  description: 'You always have to setup exact date OR range from-to.',
  fields: {
    exact: {
      type: GraphQLDate,
      description:
        'Exact date (cannot be used in combination with from-to fields).',
    },
    from: {
      type: GraphQLDate,
      description:
        'Start of the date range (cannot be used in combination with exact date).',
    },
    to: {
      type: GraphQLDate,
      description:
        'End of the date range (cannot be used in combination with exact date).',
    },
  },
});
