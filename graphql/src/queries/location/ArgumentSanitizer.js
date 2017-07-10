// @flow

import _ from 'lodash';

import type { LocationVariants } from '../../types/Location';

/**
 * Format location object into string that is accepted by flights REST API
 * @see http://docs.skypickerpublicapi.apiary.io/#reference/flights/flights/get
 */
export function formatString(location: LocationVariants): string {
  if (typeof location.location === 'string') {
    return location.location;
  } else {
    const radius = (location: Object).radius;
    const lat = _.round(radius.lat, 2);
    const lng = _.round(radius.lng, 2);
    const distance = _.round(radius.radius, 0);
    return `${lat}-${lng}-${distance}km`;
  }
}
