// @flow

import {
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
} from '../BookingTimelineEvent';

[
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
].forEach(TimelineEvent => {
  it(`${TimelineEvent.name} type should have valid fields`, () => {
    expect(TimelineEvent.getFields()).toMatchSnapshot();
  });
});
