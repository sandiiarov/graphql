// @flow

import url from 'url';

export default {
  restApiEndpoint: {
    allBookings: 'https://booking-api.skypicker.com/api/v0.1/users/self/bookings',
    allFlights: (queryParameters: null | Object = null) =>
      queryWithParameters('https://api.skypicker.com/flights', queryParameters),
    allPlaces: (queryParameters: null | Object = null) =>
      queryWithParameters('https://api.skypicker.com/places', queryParameters),
    login: 'https://auth.skypicker.com/v1/user.login',
  },
};

function queryWithParameters(
  absoluteUrl: string,
  queryParameters: null | Object = null,
) {
  const urlObject = url.parse(absoluteUrl, true);
  if (queryParameters !== null) {
    urlObject.query = filterParameters(queryParameters);
  }
  return url.format(urlObject);
}

function filterParameters(parameters: Object) {
  const filteredParameters = parameters;
  Object.keys(parameters).forEach(key => {
    const val = parameters[key];
    if (val === null || val === undefined || val === '') {
      delete filteredParameters[key];
    }
  });
  return filteredParameters;
}
