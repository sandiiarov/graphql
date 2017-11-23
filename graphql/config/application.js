// @flow

import url from 'url';

export default {
  restApiEndpoint: {
    allBookings:
      'https://booking-api.skypicker.com/api/v0.1/users/self/bookings',
    singleBooking: (bookingId: number, simpleToken: string) =>
      queryWithParameters(
        `https://booking-api.skypicker.com/api/v0.1/users/self/bookings/${bookingId}`,
        {
          simple_token: simpleToken,
        },
      ),
    allFlights: (queryParameters: ?Object = null) =>
      queryWithParameters('https://api.skypicker.com/flights', {
        ...queryParameters,
        v: 3,
      }),
    login: 'https://auth.skypicker.com/v1/user.login',
    identity: 'https://auth.skypicker.com/v1/user.get',
    airlines: 'https://api.skypicker.com/airlines?v=2',
    allLocations: (queryParameters: Object) =>
      queryWithParameters('https://locations.skypicker.com', queryParameters),
    rates: 'https://api.skypicker.com/rates',
    hotels: {
      all: (queryParameters: Object) =>
        queryWithParameters(
          'https://hotels-api.skypicker.com/api/hotels',
          queryParameters,
        ),
      single: (hotelIds: number[]) =>
        queryWithParameters(
          'https://hotels-api.skypicker.com/api/hotelDetails',
          {
            hotel_ids: hotelIds.join(','),
          },
        ),
    },
  },
  auth: {
    basicToken: '***REMOVED***',
    digest: '***REMOVED***',
  },
};

function queryWithParameters(
  absoluteUrl: string,
  queryParameters: ?Object = null,
) {
  const urlObject = url.parse(absoluteUrl, true);
  // intentional ==, can be null or undefined
  if (queryParameters != null) {
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
      return;
    }

    if (Array.isArray(val)) {
      filteredParameters[key] = val.toString();
    }

    if (typeof val === 'string') {
      filteredParameters[key] = val.trim();
    }
  });
  return filteredParameters;
}
