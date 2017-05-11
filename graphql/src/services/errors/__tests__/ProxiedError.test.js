// @flow

import { ProxiedError } from '../ProxiedError';

const error = new ProxiedError('custom message', 123, 'http://a.b');

it('is throwable', () => {
  expect(() => {
    throw error;
  }).toThrow('custom message');
});

it('works with origin status code', () => {
  expect(error.originStatusCode).toBe(123);
});

it('works with origin URL', () => {
  expect(error.originUrl).toBe('http://a.b');
});
