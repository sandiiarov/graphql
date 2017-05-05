// @flow

import Login from '../Login';

const fields = Login.getFields();

it('Field "token" should be non-null string', () => {
  expect(fields.token.type.toString()).toBe('String!');
});

describe('Field "userId"', () => {
  it('should be non-null string', () => {
    expect(fields.userId.type.toString()).toBe('ID!');
  });

  it('should use opaque ID', () => {
    expect(fields.userId.resolve({ userId: 1 })).toBe('dXNlcjox'); // user:1
  });
});
