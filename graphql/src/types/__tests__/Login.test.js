// @flow

import Login from '../Login';

const fields = Login.getFields();

it('Field "token" should be non-null string', () => {
  expect(fields.token.type.toString()).toBe('String!');
});

it('Field "userId" should be non-null string', () => {
  expect(fields.userId.type.toString()).toBe('ID!');
});

it('Field "identity" should be Identity', () => {
  expect(fields.identity.type.toString()).toBe('Identity');
});
