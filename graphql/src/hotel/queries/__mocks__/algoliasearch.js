// @flow

let mockResponses = {};

module.exports = () => ({
  initIndex: () => ({
    search: (prefix?: string) => {
      const key = prefix || 'undefined';
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
