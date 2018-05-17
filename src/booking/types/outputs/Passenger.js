// @flow

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLEnumType,
  GraphQLInt,
} from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';

import type { Passenger } from '../../Booking';

const InsuranceTypeEnum = new GraphQLEnumType({
  name: 'InsuranceType',
  description: 'The possible insurance type values',
  values: {
    NONE: { value: 'none' },
    TRAVEL_BASIC: { value: 'travel_basic' },
    TRAVEL_PLUS: { value: 'travel_plus' },
  },
});

const TravelDocumentType = new GraphQLObjectType({
  name: 'TravelDocument',
  description: 'Travel document info',
  fields: {
    idNumber: {
      type: GraphQLString,
    },
    expiration: {
      type: GraphQLDateTime,
      resolve: ({ expiration }): ?Date =>
        expiration ? new Date(expiration * 1000) : null,
    },
  },
});

export default new GraphQLObjectType({
  name: 'Passenger',
  description: 'The passengers associated with the booking',
  fields: {
    databaseId: {
      type: GraphQLInt,
      resolve: ({ id }: Passenger) => id,
    },
    firstname: {
      type: GraphQLString,
    },
    lastname: {
      type: GraphQLString,
    },
    fullName: {
      type: GraphQLString,
      resolve: ({ firstname, lastname }: Passenger) =>
        [firstname, lastname].filter(word => word != null).join(' '),
    },
    insuranceType: {
      type: InsuranceTypeEnum,
      resolve: ({ insuranceType }: Passenger) => {
        switch (insuranceType) {
          case 'skysilver': // Skysilver is deprecated, the same as travel basic
            return 'travel_basic';
          case 'skygold': // Skygold is deprecated, the same as travel plus
            return 'travel_plus';
          default:
            return insuranceType;
        }
      },
    },
    title: {
      type: GraphQLString,
    },
    birthday: {
      type: GraphQLDateTime,
      resolve: ({ birthday }: Passenger): Date => new Date(birthday),
    },
    nationality: {
      type: GraphQLString,
    },
    travelDocument: {
      type: TravelDocumentType,
    },
  },
});
