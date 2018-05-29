// @flow

import { GraphQLObjectType, GraphQLNonNull } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';

import LoungeService from './LoungeService';
import ParkingService from './ParkingService';
import ParkingServiceAvailability from './ParkingServiceAvailability';
import LoungeWhiteLabelURLResolver from '../../resolvers/LoungeWhitelabelURL';

type AncestorType = {|
  +iataCode: string,
|};

export default new GraphQLObjectType({
  name: 'WhitelabeledServices',
  fields: {
    lounge: {
      type: LoungeService,
      args: {
        departureTime: {
          type: GraphQLNonNull(GraphQLDateTime),
        },
      },
      resolve: async (ancestor: AncestorType, args) => {
        const whitelabelURL = await LoungeWhiteLabelURLResolver(
          ancestor.iataCode,
          args.departureTime,
        );

        return whitelabelURL === null ? null : { whitelabelURL };
      },
    },

    parking: {
      type: ParkingService,
      args: {
        fromDate: {
          type: GraphQLNonNull(GraphQLDateTime),
        },
        toDate: {
          type: GraphQLNonNull(GraphQLDateTime),
        },
      },
      resolve: (ancestor: AncestorType, args) => {
        if (ParkingServiceAvailability[ancestor.iataCode] === true) {
          return {
            iataCode: ancestor.iataCode,
            fromDate: args.fromDate,
            toDate: args.toDate,
          };
        }
        return null;
      },
    },
  },
});
