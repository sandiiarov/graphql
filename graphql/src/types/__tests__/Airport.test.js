import Airport from '../Airport';

describe('code field', () => {
  const code = Airport.getFields().code;
  it('should be non-null string', () => {
    expect(code.type.toString()).toBe('String!');
  });
});

describe('name field', () => {
  const name = Airport.getFields().name;
  it('should be non-null string', () => {
    expect(name.type.toString()).toBe('String!');
  });
});
