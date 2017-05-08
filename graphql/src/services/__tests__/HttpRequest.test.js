// @flow

import request, { post } from '../HttpRequest';

jest.mock('node-fetch');

beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  jest.resetAllMocks();
  process.env.NODE_ENV = 'test';
});

describe('GET request', () => {
  it('should throw exception in test environment', async () => {
    let message;
    try {
      // waiting for Jest v20 to support async expect().toThrow()
      // https://github.com/facebook/jest/pull/3068
      await request('https://path/to/api');
    } catch (error) {
      message = error.message;
    }
    expect(message).toBe(
      'HttpRequest should never be called in test environment.',
    );
  });
});

describe('GET request in production', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'production';
  });

  it('resolves URL with token', async () => {
    expect(await request('https://path/to/api', 't/ok"en')).toMatchSnapshot();
  });

  it('resolves URL without token', async () => {
    expect(await request('https://path/to/api')).toMatchSnapshot();
  });

  it('throws exception during invalid return status code', async () => {
    let message;
    try {
      // waiting for Jest v20 to support async expect().toThrow()
      // https://github.com/facebook/jest/pull/3068
      await request('https://path/to/api?status=500');
    } catch (error) {
      message = error.message;
    }
    expect(message).toBe(
      'Proxied error 500: Status Text (https://path/to/api?status=500)',
    );
  });
});

describe('POST request', () => {
  it('should throw exception in test environment', async () => {
    let message;
    try {
      // waiting for Jest v20 to support async expect().toThrow()
      // https://github.com/facebook/jest/pull/3068
      await post('https://path/to/api', {});
    } catch (error) {
      message = error.message;
    }
    expect(message).toBe(
      'HttpRequest should never be called in test environment.',
    );
  });
});

describe('POST request in production', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'production';
  });

  it('throws exception during invalid return status code', async () => {
    let message;
    try {
      // waiting for Jest v20 to support async expect().toThrow()
      // https://github.com/facebook/jest/pull/3068
      await request('https://path/to/api?status=500');
    } catch (error) {
      message = error.message;
    }
    expect(message).toBe(
      'Proxied error 500: Status Text (https://path/to/api?status=500)',
    );
  });

  it('adds default content type header', async () => {
    expect(await post('https://path/to/api', {})).toMatchSnapshot();
  });

  it('supports custom content type header', async () => {
    expect(
      await post(
        'https://path/to/api',
        {},
        { 'Content-Type': 'application/soap+xml' },
      ),
    ).toMatchSnapshot();
  });

  it('supports custom headers', async () => {
    expect(
      await post(
        'https://path/to/api',
        {},
        {
          'Content-Type': 'application/soap+xml',
          'X-Custom-A': 'Value A',
          'X-Custom-B': 'Value B',
        },
      ),
    ).toMatchSnapshot();
  });

  it('stringify payload', async () => {
    expect(
      await post('https://path/to/api', {
        email: 'john@example.com',
        password: 123456,
      }),
    ).toMatchSnapshot();
  });
});
