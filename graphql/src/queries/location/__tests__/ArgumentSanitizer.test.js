// @flow

import { formatString } from '../ArgumentSanitizer';

describe('Stringify location input', () => {
  it('should stringify location', async () => {
    expect(formatString({ location: 'Prague' })).toBe('Prague');
  });

  it('should stringify radius', async () => {
    expect(
      formatString({
        radius: {
          lat: 10.2,
          lng: 14.9,
          radius: 105,
        },
      }),
    ).toBe('10.2-14.9-105km');
  });

  it('should stringify radius and format to 2 decimals', async () => {
    expect(
      formatString({
        radius: {
          lat: 10.2572,
          lng: 14.988,
          radius: 105.56,
        },
      }),
    ).toBe('10.26-14.99-106km');
  });
});
