// @flow

import stringify from 'json-stable-stringify';

let mockResponses = {};

module.exports = () => ({
  initIndex: () => ({
    search: (prefix?: string | Object) => {
      const key =
        typeof prefix === 'object' ? stringify(prefix) : prefix || 'undefined';
      return {
        hits: mockResponses[key],
      };
    },
  }),
});

module.exports.setMatchedCities = (cities: Object[], prefix?: string) => {
  const key = prefix || 'undefined';
  mockResponses[key] = cities;
};

module.exports.setNearbyCities = (
  cities: Object[],
  lat: number,
  lng: number,
) => {
  const key = {
    aroundLatLng: `${lat}, ${lng}`,
  };
  mockResponses[stringify(key)] = cities;
};
