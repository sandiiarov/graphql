// @flow

import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import { GraphQLDate } from 'graphql-iso-date';

import PassengersInput from '../../../flight/types/inputs/PassengersInput';

export default new GraphQLInputObjectType({
  name: 'DynamicPackagesSimpleSearchInput',
  fields: {
    fromAirport: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Valid airport code according the IATA standard',
    },
    toAirport: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Valid airport code according the IATA standard',
    },
    outboundFlights: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(GraphQLString)),
      ),
      description: 'List of outbound flight numbers (e.g. OK123)',
    },
    inboundFlights: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(GraphQLString)),
      ),
      description: 'List of inbound flight numbers (e.g. OK123)',
    },
    date: {
      type: new GraphQLNonNull(GraphQLDate),
      description: 'Departure date',
    },
    returnDate: {
      type: new GraphQLNonNull(GraphQLDate),
      description: 'Return date',
    },
    passengers: {
      type: new GraphQLNonNull(PassengersInput),
    },
  },
});
