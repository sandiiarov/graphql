// @flow

/* eslint-disable global-require */
const mocksMap = {
  '/users/self/bookings': require('./data/bookings.json'),
  '/users/self/bookings/2707251': require('./data/booking-2707251.json'),
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
