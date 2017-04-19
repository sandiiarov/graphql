// @flow

const mocksMap = {
  '/users/self/bookings': require('./data/bookings.json'), //eslint-disable-line global-require
};

export default function request(
  relativeApiUrl: string,
  token: ?string, // eslint-disable-line no-unused-vars
): Promise<string> {
  if (mocksMap[relativeApiUrl] !== undefined) {
    return new Promise(resolve => {
      resolve(mocksMap[relativeApiUrl]);
    });
  }
  throw new Error(`Data mock not found for path: ${relativeApiUrl}`);
}
