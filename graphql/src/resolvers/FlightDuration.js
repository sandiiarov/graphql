// @flow

import _ from 'lodash';
import { DateTime } from 'luxon';

import type { DepartureArrival } from '../types/Flight';

export default function getFlightDurationInMinutes(
  departure: DepartureArrival,
  arrival: DepartureArrival,
): ?number {
  const departureTime = _.get(departure, 'when.utc');
  const arrivalTime = _.get(arrival, 'when.utc');
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
