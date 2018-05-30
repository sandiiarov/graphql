// @flow

import { GraphQLObjectType, GraphQLNonNull } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';

import LoungeService from './LoungeService';
import ParkingService from './ParkingService';
import ParkingServiceAvailability from './ParkingServiceAvailability';
import AvailableLoungesDataloader from '../../../dataloaders/AvailableLounges';
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

        // let's try to load all lounges by IATA codes to see where is the
        // lounge actually available
        const loungesByIata = await AvailableLoungesDataloader.loadMany(
          Array.from(iataSet).map(iataCode => ({
            iataCode,
            departureTime: args.departureTime,
          })),
        );

        const relevantLounges = loungesByIata.filter(Boolean);
        if (relevantLounges.length === 0) {
          return null;
        }
        return relevantLounges;
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
