// @flow

import { GraphQLObjectType, GraphQLNonNull } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';

import LoungeService from './LoungeService';
import ParkingService from './ParkingService';
import ParkingServiceAvailability from './ParkingServiceAvailability';
import LoungesDataloader from '../../../dataloaders/Lounges';
import type { BookingsItem } from '../../../Booking';

type AncestorType = {|
  +booking: BookingsItem,
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
      resolve: async ({ booking }: AncestorType, args) => {
        // we are interested in every unique IATA of the airport
        const iataSet = new Set();
        booking.legs.map(({ departure, arrival }) => {
          iataSet.add(departure.where.code);
          iataSet.add(arrival.where.code);
        });

        // let's try to load all lounges by IATA codes to see where is the lounge actually available
        const iataCodes = Array.from(iataSet);
        let loungesByIata = await LoungesDataloader.loadMany(iataCodes);
        loungesByIata = loungesByIata.filter(lounges => lounges.length > 0);

        // no relevant airports - lounges are not available on this trip
        if (loungesByIata.length === 0) {
          return null;
        }

        const relevantIataCodes = new Set();
        loungesByIata.map(lounges =>
          lounges.map(lounge => relevantIataCodes.add(lounge.iata)),
        );

        return {
          iataCodes: Array.from(relevantIataCodes),
          departureTime: args.departureTime,
        };
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
      resolve: ({ booking }: AncestorType, args) => {
        // we are interested only in the IATA of the departure (you are leaving your car there)
        const iataCode = booking.departure.where.code;

        if (ParkingServiceAvailability[iataCode] === true) {
          return {
            iataCode: iataCode,
            fromDate: args.fromDate,
            toDate: args.toDate,
          };
        }
        return null;
      },
    },
  },
});
