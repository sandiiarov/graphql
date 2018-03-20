// @flow

import idx from 'idx';
import { DateTime } from 'luxon';

import type { DepartureArrival } from '../Flight';

export default function getFlightDurationInMinutes(
  departure: DepartureArrival,
  arrival: DepartureArrival,
): ?number {
  const departureTime = idx(departure, _ => _.when.utc);
  const arrivalTime = idx(arrival, _ => _.when.utc);
  return getDurationInMinutes(departureTime, arrivalTime);
}

function getDurationInMinutes(departure: ?Date, arrival: ?Date) {
  if (!departure || !arrival || departure > arrival) {
    return null;
  }

  return DateTime.fromJSDate(arrival)
    .diff(DateTime.fromJSDate(departure), 'minutes')
    .toObject().minutes;
}
