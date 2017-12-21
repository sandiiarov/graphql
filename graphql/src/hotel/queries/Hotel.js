// @flow

import { GraphQLID, GraphQLNonNull } from 'graphql';
import type { GraphQLFieldConfig } from 'graphql';
import { fromGlobalId } from 'graphql-relay';

import GraphQLHotel from '../types/outputs/Hotel';

import type { GraphqlContextType } from '../../common/services/GraphqlContext';

export default ({
  type: GraphQLHotel,
  description: 'Single hotel by ID.',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (
    ancestor: mixed,
    { id }: Object,
    { dataLoader }: GraphqlContextType,
  ) => {
    const idObject = fromGlobalId(id); // id is opaque
    if (idObject.type !== 'hotel') {
      throw new Error(
        `Hotel ID mishmash. You cannot query hotels with ID ` +
          `'${id}' because this ID is not ID of the hotel. ` +
          `Please use opaque ID of the hotel.`,
      );
    }
    return dataLoader.hotel.byId.load(idObject.id);
  },
}: GraphQLFieldConfig<mixed, GraphqlContextType>);
