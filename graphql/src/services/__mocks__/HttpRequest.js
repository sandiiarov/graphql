// @flow

import config from '../../../config/application';

/* eslint-disable */
const mocksMap = {
  [config.restApiEndpoint.allBookings]: require('./data/bookings.json'),
  [config.restApiEndpoint.allBookings + '/2707251']: require('./data/booking-2707251.json'),
  [config.restApiEndpoint.allPlaces()]: require('./data/AllPlaces.json'),
  [config.restApiEndpoint.allPlaces({ term: 'nyt' })]: require('./data/AllPlaces.search.json'),
  [config.restApiEndpoint.allPlaces({ term: 'cc' })]: [], // empty array
};
/* eslint-enable */

export default function request(relativeApiUrl: string): Promise<string> {
  if (mocksMap[relativeApiUrl] !== undefined) {
    return new Promise(resolve => {
      resolve(mocksMap[relativeApiUrl]);
    });
  }
  throw new Error(`Data mock not found for path: ${relativeApiUrl}`);
}
