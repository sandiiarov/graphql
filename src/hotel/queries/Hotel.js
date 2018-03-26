// @flow

import { GraphQLID, GraphQLNonNull } from 'graphql';
import { fromGlobalId } from 'graphql-relay';

import GraphQLHotel from '../types/outputs/Hotel';
import LanguageInput from '../../common/types/inputs/LanguageInput';

import type { GraphqlContextType } from '../../common/services/GraphqlContext';

export default {
  type: GraphQLHotel,
  description: 'Single hotel by ID.',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    language: {
      type: LanguageInput,
    },
  },
  resolve: async (
    ancestor: mixed,
    { id, language }: Object,
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
    return dataLoader.hotel.byID.load({ hotelId: idObject.id, language });
  },
};
