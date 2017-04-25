import config from '../application';

const baseUrl = 'https://api.skypicker.com/places';

describe('All places REST API endpoint', () => {
  it('should return URL without parameters', () => {
    expect(config.restApiEndpoint.allPlaces()).toBe(baseUrl);
  });

  it('should filter empty parameters', () => {
    expect(
      config.restApiEndpoint.allPlaces({
        a: undefined,
        b: null,
        c: 'text',
        d: '',
      }),
    ).toBe(`${baseUrl}?c=text`);
  });
});
