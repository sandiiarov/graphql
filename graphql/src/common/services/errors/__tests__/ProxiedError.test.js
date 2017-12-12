// @flow

import { ProxiedError } from '../ProxiedError';

let error;

beforeEach(() => {
  error = new ProxiedError('custom message', '123', 'http://a.b');
});

it('is throwable', () => {
  expect(() => {
    throw error;
  }).toThrow('custom message');
});

it('works with origin status code', () => {
  expect(error).toHaveProperty('originStatusCode', 123);
});

it('works with origin URL', () => {
  expect(error).toHaveProperty('originUrl', 'http://a.b');
});
