// @flow

import type { LocationInputType, RadiusInputType } from '../../Entities';
import { formatString } from './ArgumentSanitizer';
import LocationDataLoader from '../../dataLoaders/Location';

export async function sanitizeLocationsForRequest(
  from: Array<LocationInputType | RadiusInputType>,
  to: Array<LocationInputType | RadiusInputType>,
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
  location: LocationInputType | RadiusInputType,
  locationDataLoader: LocationDataLoader,
) {
  return typeof location.location === 'string'
    ? locationDataLoader
        .load(location.location)
        // eslint-disable-next-line promise/prefer-await-to-then
        .then(location => location.locationId)
    : formatString(location);
}
