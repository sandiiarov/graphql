// @flow

export type BookingTimelineEventType =
  | 'BookedFlight'
  | 'BookingConfirmed'
  | 'PaymentConfirmed'
  | 'DownloadReceipt'
  | 'DownloadETicket'
  | 'DownloadBoardingPass'
  | 'LeaveForAirport'
  | 'AirportArrival'
  | 'Boarding'
  | 'Departure'
  | 'Arrival'
  | 'TransportFromAirport';

export type BookingTimelineEvent = {
  +timestamp: Date,
  +type: BookingTimelineEventType,
  data?: string,
};

export type BookingTimelineData = {|
  events: $ReadOnlyArray<BookingTimelineEvent>,
|};
