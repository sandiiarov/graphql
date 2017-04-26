// @flow

import url from 'url';

export default {
  restApiEndpoint: {
    allBookings: 'https://booking-api.skypicker.com/api/v0.1/users/self/bookings',
    allPlaces: (query: null | Object = null) => {
      const urlObject = url.parse('https://api.skypicker.com/places', true);
      if (query !== null) {
        urlObject.query = filterParameters(query);
      }
      return url.format(urlObject);
    },
  },
};

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
