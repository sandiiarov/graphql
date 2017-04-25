// @flow

import Airport from '../Airport';

describe('city field', () => {
  const city = Airport.getFields().city;
  it('should be non-null string', () => {
    expect(city.type.toString()).toBe('String!');
  });
});

describe('code field', () => {
  const code = Airport.getFields().code;
  it('should be non-null string', () => {
    expect(code.type.toString()).toBe('String!');
  });
});
