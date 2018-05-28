// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';

type AncestorType = {|
  +whitelabelURL: string,
|};

export default new GraphQLObjectType({
  name: 'LoungeService',
  fields: {
    whitelabelURL: {
      type: GraphQLString,
      resolve: ({ whitelabelURL }: AncestorType): string => whitelabelURL,
    },
  },
});
