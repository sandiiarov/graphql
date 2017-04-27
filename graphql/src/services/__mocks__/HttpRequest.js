// @flow

import config from '../../../config/application';

/* eslint-disable */
const mocksMap = {
  [config.restApiEndpoint.allBookings]: require('./data/bookings.json'),
  [config.restApiEndpoint.allBookings + '/2707251']: require('./data/booking-2707251.json'),
  [config.restApiEndpoint.allPlaces()]: require('./data/AllPlaces.json'),
  [config.restApiEndpoint.allPlaces({ term: 'nyt' })]: require('./data/AllPlaces.search.json'),
  [config.restApiEndpoint.allPlaces({ term: 'unknown place' })]: [], // empty array
  [config.restApiEndpoint.allFlights({
    flyFrom: 'PRG',
    to: 'MEX',
    dateFrom: '08/08/2017',
    dateTo: '08/09/2017',
  })]: require('./data/AllFlights.json'),
};
/* eslint-enable */

export default function request(absoluteApiUrl: string): Promise<string> {
  if (mocksMap[absoluteApiUrl] !== undefined) {
    return new Promise(resolve => {
      resolve(mocksMap[absoluteApiUrl]);
    });
  }
  throw new Error(`Data mock not found for path: ${absoluteApiUrl}`);
}
