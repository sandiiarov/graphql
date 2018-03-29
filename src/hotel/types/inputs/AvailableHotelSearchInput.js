// @flow

import {
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLID,
} from 'graphql';
import { GraphQLDate } from 'graphql-iso-date';

import HotelRoomsConfiguration from './HotelRoomsConfiguration';
import LanguageInput from './../../../common/types/inputs/LanguageInput';

export default new GraphQLInputObjectType({
  name: 'AvailableHotelSearchInput',
  fields: {
    hotelId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Opaque hotel ID.',
    },

    checkin: {
      type: new GraphQLNonNull(GraphQLDate),
    },

    checkout: {
      type: new GraphQLNonNull(GraphQLDate),
    },

    roomsConfiguration: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(HotelRoomsConfiguration)),
      ),
    },
    language: {
      type: LanguageInput,
    },
  },
});
