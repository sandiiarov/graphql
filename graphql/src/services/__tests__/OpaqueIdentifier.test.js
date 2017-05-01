// @flow

import { toGlobalId, fromGlobalId } from '../OpaqueIdentifier';

describe('Function toGlobalId', () => {
  it('throws exception if called without parameters', () => {
    const expectedError = 'Missing required parameter.';
    expect(() => toGlobalId()).toThrow(expectedError);
    expect(() => toGlobalId('just type')).toThrow(expectedError);
  });

  it('returns correct base64 string', () => {
    expect(toGlobalId('type', 21)).toBe('dHlwZToyMQ==');
  });
});

describe('Function fromGlobalId', () => {
  it('throws exception if called without parameters', () => {
    expect(() => fromGlobalId()).toThrow('Missing required parameter.');
  });

  it('returns correct value object from base64 string', () => {
    expect(fromGlobalId('dHlwZToyMQ==')).toEqual({
      id: '21',
      type: 'type',
    });
  });
});
