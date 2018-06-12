// @flow

import { GraphQLString, GraphQLEnumType, GraphQLObjectType } from 'graphql';

import { GraphQLDateTime } from 'graphql-iso-date';

const TimelineEventTypeEnum = {
  BOOKED_FLIGHT: { value: 'BookedFlight' },
  BOOKING_CONFIRMED: { value: 'BookingConfirmed' },
  PAYMENT_CONFIRMED: { value: 'PaymentConfirmed' },
  DOWNLOAD_RECEIPT: { value: 'DownloadReceipt' },
  DOWNLOAD_ETICKET: { value: 'DownloadETicket' },
  DOWNLOAD_BOARDING_PASS: { value: 'DownloadBoardingPass' },
  LEAVE_FOR_AIRPORT: { value: 'LeaveForAirport' },
  AIRPORT_ARRIVAL: { value: 'AirportArrival' },
  BOARDING: { value: 'Boarding' },
  DEPARTURE: { value: 'Departure' },
  ARRIVAL: { value: 'Arrival' },
  TRANSPORT_FROM_AIRPORT: { value: 'TransportFromAirport' },
};

const GraphQLEventTypeEnum = new GraphQLEnumType({
  name: 'TimelineEventTypeEnum',
  values: TimelineEventTypeEnum,
});

export default new GraphQLObjectType({
  name: 'TimelineEvent',
  fields: {
    timestamp: {
      type: GraphQLDateTime,
    },
    type: {
      type: GraphQLEventTypeEnum,
    },
    data: {
      type: GraphQLString,
    },
  },
});
