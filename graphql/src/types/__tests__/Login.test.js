// @flow

import Login from '../Login';

describe('token field', () => {
  const token = Login.getFields().token;
  it('should be non-null string', () => {
    expect(token.type.toString()).toBe('String!');
  });
});

describe('userId field', () => {
  const userId = Login.getFields().userId;
  it('should be non-null string', () => {
    expect(userId.type.toString()).toBe('String!');
  });
});
