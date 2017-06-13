// @flow

import config from '../../../config/application';
import request from '../../services/HttpRequest';

/**
 * When AllFlights returns no value due to wrong from-to arguments
 * (v3 allows to use codes ony) fetch locations with from-to values
 * and use first location in new AllFlights request.
 */
export function fetchLocationsIds(from: string, to: string) {
  return Promise.all([fetchLocation(from), fetchLocation(to)]);
}

function fetchLocation(location: string): Promise<string> {
  return request(
    config.restApiEndpoint.allLocations({
      term: location,
    }),
    // eslint-disable-next-line promise/prefer-await-to-then
  ).then(locations => {
    if (locations.locations.length === 0) {
      throw new Error(`Location '${location}' has not been found.`);
    }
    return locations.locations[0].id;
  });
}
