// @flow

import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import Location from '../../../../location/types/outputs/Location';
import LoungeWhiteLabelURLResolver from '../../../resolvers/LoungeWhitelabelURL';
import type { GraphqlContextType } from '../../../../common/services/GraphqlContext';

type LoungeServiceInput = {|
  +iataCodes: Set<string>,
  +departureTime: Date,
|};

type LoungeServiceOutput = {|
  +iataCode: string,
  +departureTime: Date,
|};

export default new GraphQLObjectType({
  name: 'LoungeService',
  fields: {
    relevantAirports: {
      type: GraphQLList(
        new GraphQLObjectType({
          name: 'LoungeServiceRelevantAirports',
          fields: {
            whitelabelURL: {
              type: GraphQLString,
              resolve: async ({
                iataCode,
                departureTime,
              }: LoungeServiceOutput) => {
                return LoungeWhiteLabelURLResolver(iataCode, departureTime);
              },
            },

            location: {
              type: Location,
              resolve: (
                { iataCode }: LoungeServiceOutput,
                args: void,
                context: GraphqlContextType,
              ) => {
                return context.dataLoader.location.load(iataCode);
              },
            },
          },
        }),
      ),
      resolve: ({
        iataCodes,
        departureTime,
      }: LoungeServiceInput): $ReadOnlyArray<LoungeServiceOutput> => {
        return Array.from(iataCodes).map(iataCode => ({
          iataCode,
          departureTime,
        }));
      },
    },
  },
});
