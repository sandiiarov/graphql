// @flow

import { formatString } from './ArgumentSanitizer';
import LocationDataLoader from '../../dataLoaders/Location';

import type { LocationVariants } from '../../types/Location';

export async function sanitizeLocationsForRequest(
  from: Array<LocationVariants>,
  to: Array<LocationVariants>,
  locationDataLoader: LocationDataLoader,
) {
  const locations = [];
  from
    .concat(to)
    .forEach(location =>
      locations.push(sanitizeForRequest(location, locationDataLoader)),
    );

  let sanitizedLocations = await Promise.all(locations);

  return [
    sanitizedLocations.slice(0, from.length),
    sanitizedLocations.slice(from.length),
  ];
}

function sanitizeForRequest(
  location: LocationVariants,
  locationDataLoader: LocationDataLoader,
) {
  return typeof location.location === 'string'
    ? locationDataLoader
        .load(location.location)
        // eslint-disable-next-line promise/prefer-await-to-then
        .then(location => location.locationId)
    : formatString(location);
}
