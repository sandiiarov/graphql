// @flow

import { GraphQLObjectType, GraphQLList } from 'graphql';

import GraphQLLocation from '../../../location/types/outputs/Location';
import type { GraphqlContextType } from '../../../common/services/GraphqlContext';

type VisaType = {|
  requiredIn: string[],
  warningIn: string[],
  okIn: string[],
|};

export default new GraphQLObjectType({
  name: 'Visa',
  description: 'Visa information for passenger',
  fields: {
    requiredIn: {
      type: new GraphQLList(GraphQLLocation),
      description: 'Countries where visa is required',
      resolve: async (
        { requiredIn }: VisaType,
        args: Object,
        { dataLoader }: GraphqlContextType,
      ) => {
        return await dataLoader.location.loadMany(requiredIn);
      },
    },
    warningIn: {
      type: new GraphQLList(GraphQLLocation),
      description: 'Countries where visa might be required',
      resolve: async (
        { warningIn }: VisaType,
        args: Object,
        { dataLoader }: GraphqlContextType,
      ) => {
        return await dataLoader.location.loadMany(warningIn);
      },
    },
    okIn: {
      type: new GraphQLList(GraphQLLocation),
      description: 'Countries where visa is not required',
      resolve: async (
        { okIn }: VisaType,
        args: Object,
        { dataLoader }: GraphqlContextType,
      ) => {
        return await dataLoader.location.loadMany(okIn);
      },
    },
  },
});
