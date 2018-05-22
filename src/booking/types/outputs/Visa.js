// @flow

import { GraphQLObjectType, GraphQLList } from 'graphql';

import GraphQLLocation from '../../../location/types/outputs/Location';
import type { GraphqlContextType } from '../../../common/services/GraphqlContext';

export default new GraphQLObjectType({
  name: 'Visa',
  description: 'Visa information for passenger',
  fields: {
    requiredIn: {
      type: new GraphQLList(GraphQLLocation),
      description: 'Countries where visa is required',
      resolve: async (
        { critical }: {| critical: string[] |},
        args: Object,
        { dataLoader }: GraphqlContextType,
      ) => {
        return await dataLoader.location.loadMany(critical);
      },
    },
    warningIn: {
      type: new GraphQLList(GraphQLLocation),
      description: 'Countries where visa might be required',
      resolve: async (
        { notice }: {| notice: string[] |},
        args: Object,
        { dataLoader }: GraphqlContextType,
      ) => {
        return await dataLoader.location.loadMany(notice);
      },
    },
    okIn: {
      type: new GraphQLList(GraphQLLocation),
      description: 'Countries where visa is not required',
      resolve: async (
        { ok }: {| ok: string[] |},
        args: Object,
        { dataLoader }: GraphqlContextType,
      ) => {
        return await dataLoader.location.loadMany(ok);
      },
    },
  },
});
