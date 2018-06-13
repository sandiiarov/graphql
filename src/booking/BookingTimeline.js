// @flow

import type { DepartureArrival } from '../flight/Flight';

export type BookingTimelineEvent =
  | BookedFlight
  | BookingConfirmed
  | PaymentConfirmed
  | DownloadReceipt
  | DownloadETicket
  | DownloadBoardingPass
  | LeaveForAirport
  | AirportArrival
  | Boarding
  | Departure
  | Arrival
  | TransportFromAirport;

export type BookingTimelineData = {|
  events: $ReadOnlyArray<BookingTimelineEvent>,
|};

export type BookedFlight = {|
  +timestamp: Date,
  +type: 'BookedFlight',
|};

export type BookingConfirmed = {|
  +timestamp: Date,
  +type: 'BookingConfirmed',
|};

export type PaymentConfirmed = {|
  +timestamp: Date,
  +type: 'PaymentConfirmed',
|};

export type DownloadReceipt = {|
  +timestamp: Date,
  +type: 'DownloadReceipt',
  +receiptUrl: string,
|};

export type DownloadETicket = {|
  +timestamp: Date,
  +type: 'DownloadETicket',
  +ticketUrl: string,
|};

export type DownloadBoardingPass = {|
  +timestamp: Date,
  +type: 'DownloadBoardingPass',
|};

export type LeaveForAirport = {|
  +timestamp: Date,
  +type: 'LeaveForAirport',
|};

export type AirportArrival = {|
  +timestamp: Date,
  +type: 'AirportArrival',
  +departure: DepartureArrival,
|};

export type Boarding = {|
  +timestamp: Date,
  +type: 'Boarding',
  +gate: string,
|};

export type Departure = {|
  +timestamp: Date,
  +type: 'Departure',
  +departure: DepartureArrival,
|};

export type Arrival = {|
  +timestamp: Date,
  +type: 'Arrival',
  +arrival: DepartureArrival,
|};

export type TransportFromAirport = {|
  +timestamp: Date,
  +type: 'TransportFromAirport',
|};
