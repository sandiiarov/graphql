// @flow

import OptionsStorage from '../OptionsStorage';

describe('Options storage', () => {
  it('should add and read options from storage', () => {
    const key = 'allFlights';
    const path = {
      prev: {
        prev: {
          prev: {
            prev: {
              prev: {
                prev: undefined,
                key: key,
              },
              key: 'edges',
            },
            key: 4,
          },
          key: 'node',
        },
        key: 'arrival',
      },
      key: 'airport',
    };
    const options = {
      locale: 'cs_CZ',
    };

    const storage = new OptionsStorage();
    storage.setOptions(key, options);
    expect(storage.getOptions(path)).toBe(options);
  });

  it('should read no options for no path', () => {
    const storage = new OptionsStorage();
    expect(storage.getOptions(undefined)).toBe(undefined);
  });
});
