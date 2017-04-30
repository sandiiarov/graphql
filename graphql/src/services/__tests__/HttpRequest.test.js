// @flow

import request, { post } from '../HttpRequest';

jest.mock('node-fetch');

afterEach(() => {
  process.env.NODE_ENV = 'test';
});

describe('network request', () => {
  it('should throw exception in test environment', async () => {
    try {
      await request('https://path/to/api');
    } catch (error) {
      expect(error.message).toBe(
        'HttpRequest should never be called in test environment.',
      );
    }
  });
});

describe('network request in production', () => {
  it('resolves URL with token', async () => {
    process.env.NODE_ENV = 'production';
    expect(await request('https://path/to/api', 't/ok"en')).toEqual({
      url: 'https://path/to/api?token=t%2Fok%22en',
    });
  });

  it('resolves URL without token', async () => {
    process.env.NODE_ENV = 'production';
    expect(await request('https://path/to/api')).toEqual({
      url: 'https://path/to/api',
    });
  });

  it('throws exception during invalid return status code', async () => {
    process.env.NODE_ENV = 'production';
    try {
      await request('https://path/to/api?status=500');
    } catch (error) {
      expect(error.message).toBe(
        'Proxied error 500: Status Text (https://path/to/api?status=500)',
      );
    }
  });
});

describe('POST request', () => {
  it('should throw exception in test environment', async () => {
    // waiting for Jest v20 to support async expect().toThrow()
    // https://github.com/facebook/jest/pull/3068
    let message;
    try {
      await post('https://path/to/api', {});
    } catch (error) {
      message = error.message;
    }
    expect(message).toBe(
      'HttpRequest should never be called in test environment.',
    );
  });
});
