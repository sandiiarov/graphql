// @flow

import { GraphQLObjectType, GraphQLNonNull } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';

import LoungeService from './LoungeService';
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
  },
});
