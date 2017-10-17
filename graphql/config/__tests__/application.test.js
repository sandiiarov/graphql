// @flow

import config from '../application';

const baseUrl = 'https://locations.skypicker.com/';

describe('All places REST API endpoint', () => {
  it('should return URL without parameters', () => {
    expect(
      config.restApiEndpoint.allLocations({
        term: 'test',
      }),
    ).toBe(`${baseUrl}?term=test`);
  });

  it('should filter empty parameters', () => {
    expect(
      config.restApiEndpoint.allLocations({
        a: undefined,
        b: null,
        term: 'text',
        d: '',
      }),
    ).toBe(`${baseUrl}?term=text`);
  });

  it('trims white spaces', () => {
    expect(config.restApiEndpoint.allLocations({ term: 'BCN  ' })).toBe(
      `${baseUrl}?term=BCN`,
    );
    expect(config.restApiEndpoint.allLocations({ term: '  BCN' })).toBe(
      `${baseUrl}?term=BCN`,
    );
    expect(config.restApiEndpoint.allLocations({ term: '  BCN  ' })).toBe(
      `${baseUrl}?term=BCN`,
    );
    expect(config.restApiEndpoint.allLocations({ term: '  B C N  ' })).toBe(
      `${baseUrl}?term=B%20C%20N`,
    );
  });
});
