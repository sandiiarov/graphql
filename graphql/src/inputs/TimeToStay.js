// @flow

import { GraphQLInputObjectType, GraphQLNonNull, GraphQLInt } from 'graphql';

export default new GraphQLInputObjectType({
  name: 'TimeToStay',
  fields: {
    from: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Number of minimum nights to stay in destination.',
    },
    to: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Number of maximum nights to stay in destination.',
    },
  },
});
