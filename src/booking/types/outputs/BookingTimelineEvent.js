// @flow

import { GraphQLString, GraphQLObjectType, GraphQLUnionType } from 'graphql';

import { GraphQLDateTime } from 'graphql-iso-date';

import RouteStop from '../../../flight/types/outputs/RouteStop';
import type { DepartureArrival } from '../../../flight/Flight';

export default new GraphQLUnionType({
  name: 'TimelineEvent',
  types: () => [
    BookedFlight,
    BookingConfirmed,
    PaymentConfirmed,
    DownloadReceipt,
    DownloadETicket,
    DownloadBoardingPass,
    LeaveForAirport,
    AirportArrival,
    Boarding,
    Departure,
    Arrival,
    TransportFromAirport,
  ],
});

export const BookedFlight = new GraphQLObjectType({
  name: 'BookedFlight',
  fields: {
    timestamp: {
      type: GraphQLDateTime,
      description: 'Time of booking creation',
    },
  },
  isTypeOf: value => value.type === 'BookedFlight',
});

export const BookingConfirmed = new GraphQLObjectType({
  name: 'BookingConfirmed',
  fields: {
    timestamp: {
      type: GraphQLDateTime,
    },
  },
  isTypeOf: value => value.type === 'BookingConfirmed',
});

export const PaymentConfirmed = new GraphQLObjectType({
  name: 'PaymentConfirmed',
  fields: {
    timestamp: {
      type: GraphQLDateTime,
    },
  },
  isTypeOf: value => value.type === 'PaymentConfirmed',
});

export const DownloadReceipt = new GraphQLObjectType({
  name: 'DownloadReceipt',
  fields: {
    timestamp: {
      type: GraphQLDateTime,
    },
    receiptUrl: {
      type: GraphQLString,
      description: 'URL of the receipt/invoice',
    },
  },
  isTypeOf: value => value.type === 'DownloadReceipt',
});

export const DownloadETicket = new GraphQLObjectType({
  name: 'DownloadETicket',
  fields: {
    timestamp: {
      type: GraphQLDateTime,
    },
    ticketUrl: {
      type: GraphQLString,
      description: 'URL of the eTicket',
    },
  },
  isTypeOf: value => value.type === 'DownloadETicket',
});

export const DownloadBoardingPass = new GraphQLObjectType({
  name: 'DownloadBoardingPass',
  fields: {
    timestamp: {
      type: GraphQLDateTime,
    },
  },
  isTypeOf: value => value.type === 'DownloadBoardingPass',
});

export const LeaveForAirport = new GraphQLObjectType({
  name: 'LeaveForAirport',
  fields: {
    timestamp: {
      type: GraphQLDateTime,
    },
  },
  isTypeOf: value => value.type === 'LeaveForAirport',
});

export const AirportArrival = new GraphQLObjectType({
  name: 'AirportArrival',
  fields: {
    timestamp: {
      type: GraphQLDateTime,
    },
    location: {
      type: RouteStop,
      description: 'Location of departure',
      resolve: ({ departure }: AirportArrival): DepartureArrival => departure,
    },
  },
  isTypeOf: value => value.type === 'AirportArrival',
});

export const Boarding = new GraphQLObjectType({
  name: 'Boarding',
  fields: {
    timestamp: {
      type: GraphQLDateTime,
    },
    gate: {
      type: GraphQLString,
      description: 'Gate at which boarding is done',
    },
  },
  isTypeOf: value => value.type === 'Boarding',
});

export const Departure = new GraphQLObjectType({
  name: 'Departure',
  fields: {
    timestamp: {
      type: GraphQLDateTime,
    },
    location: {
      type: RouteStop,
      description: 'Location of departure',
      resolve: ({ departure }: Departure): DepartureArrival => departure,
    },
  },
  isTypeOf: value => value.type === 'Departure',
});

export const Arrival = new GraphQLObjectType({
  name: 'Arrival',
  fields: {
    timestamp: {
      type: GraphQLDateTime,
    },
    location: {
      type: RouteStop,
      description: 'Location of arrival',
      resolve: ({ arrival }: Arrival): DepartureArrival => arrival,
    },
  },
  isTypeOf: value => value.type === 'Arrival',
});

export const TransportFromAirport = new GraphQLObjectType({
  name: 'TransportFromAirport',
  fields: {
    timestamp: {
      type: GraphQLDateTime,
    },
  },
  isTypeOf: value => value.type === 'TransportFromAirport',
});
