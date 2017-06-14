// @flow

import config from '../../../config/application';
import request from '../../services/HttpRequest';

export function fetchLocation(location: string): Promise<Object> {
  return request(
    config.restApiEndpoint.allLocations({
      term: location,
    }),
    // eslint-disable-next-line promise/prefer-await-to-then
  ).then(locations => {
    if (locations.locations.length === 0) {
      throw new Error(`Location '${location}' has not been found.`);
    }
    return locations.locations[0];
  });
}
