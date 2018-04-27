// @flow

import { maybeIP4 } from '../IP';

describe('#IP', () => {
  test('maybeIP4', () => {
    expect(maybeIP4('2.3.4.5')).toBe('2.3.4.5');
  });

  test('maybeIP4 error', () => {
    expect(() => maybeIP4('thunder')).toThrowError(
      'Value is not a valid IP address.',
    );
  });
});
