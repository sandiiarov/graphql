import request from '../HttpRequest';

jest.mock('node-fetch');

afterEach(() => {
  process.env.NODE_ENV = 'test';
});

describe('network request', () => {
  it('should throw exception in test environment', async () => {
    try {
      await request('/path/to/api');
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
    expect(await request('/path/to/api', 't/ok"en')).toEqual({
      url: 'https://booking-api.skypicker.com/api/v0.1/path/to/api?token=t%2Fok%22en',
    });
  });

  it('resolves URL without token', async () => {
    process.env.NODE_ENV = 'production';
    expect(await request('/path/to/api')).toEqual({
      url: 'https://booking-api.skypicker.com/api/v0.1/path/to/api',
    });
  });

  it('throws exception during invalid return status code', async () => {
    process.env.NODE_ENV = 'production';
    try {
      await request('/path/to/api?status=500');
    } catch (error) {
      expect(error.message).toBe('500: Status Text');
    }
  });
});
