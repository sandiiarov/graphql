// @flow

import type { DepartureArrival } from '../flight/Flight';

export type BookingTimelineEvent =
  | BookedFlightTimelineEvent
  | BookingConfirmedTimelineEvent
  | PaymentConfirmedTimelineEvent
  | DownloadReceiptTimelineEvent
  | DownloadETicketTimelineEvent
  | DownloadBoardingPassTimelineEvent
  | LeaveForAirportTimelineEvent
  | AirportArrivalTimelineEvent
  | BoardingTimelineEvent
  | DepartureTimelineEvent
  | ArrivalTimelineEvent
  | TransportFromAirportTimelineEvent;

export type BookingTimelineData = {|
  events: $ReadOnlyArray<BookingTimelineEvent>,
|};

export type BookedFlightTimelineEvent = {|
  +timestamp: Date,
  +type: 'BookedFlightTimelineEvent',
|};

export type BookingConfirmedTimelineEvent = {|
  +timestamp: Date,
  +type: 'BookingConfirmedTimelineEvent',
|};

export type PaymentConfirmedTimelineEvent = {|
  +timestamp: Date,
  +type: 'PaymentConfirmedTimelineEvent',
|};

export type DownloadReceiptTimelineEvent = {|
  +timestamp: Date,
  +type: 'DownloadReceiptTimelineEvent',
  +receiptUrl: ?string,
|};

export type DownloadETicketTimelineEvent = {|
  +timestamp: Date,
  +type: 'DownloadETicketTimelineEvent',
  +ticketUrl: ?string,
|};

export type DownloadBoardingPassTimelineEvent = {|
  +timestamp: Date,
  +type: 'DownloadBoardingPassTimelineEvent',
|};

export type LeaveForAirportTimelineEvent = {|
  +timestamp: Date,
  +type: 'LeaveForAirportTimelineEvent',
|};

export type AirportArrivalTimelineEvent = {|
  +timestamp: Date,
  +type: 'AirportArrivalTimelineEvent',
  +departure: DepartureArrival,
|};

export type BoardingTimelineEvent = {|
  +timestamp: Date,
  +type: 'BoardingTimelineEvent',
  +gate: ?string,
|};

export type DepartureTimelineEvent = {|
  +timestamp: Date,
  +type: 'DepartureTimelineEvent',
  +departure: DepartureArrival,
|};

export type ArrivalTimelineEvent = {|
  +timestamp: Date,
  +type: 'ArrivalTimelineEvent',
  +arrival: DepartureArrival,
|};

export type TransportFromAirportTimelineEvent = {|
  +timestamp: Date,
  +type: 'TransportFromAirportTimelineEvent',
|};
