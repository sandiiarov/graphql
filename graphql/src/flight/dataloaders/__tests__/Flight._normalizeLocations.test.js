// @flow

import Flight from '../Flight';
import LocationDataloader from '../../../location/dataloaders/Location';
import LocationSuggestionsDataloader from '../../../location/dataloaders/LocationSuggestions';

jest.mock('../../../location/dataloaders/Location');
jest.mock('../../../location/dataloaders/LocationSuggestions');

let dataloader;

beforeEach(() => {
  dataloader = new Flight(
    new LocationDataloader(new LocationSuggestionsDataloader()),
  );
});

describe('normalize locations', () => {
  test('empty array', async () => {
    expect(dataloader._normalizeLocations([])).toEqual([]);
  });

  test('only exact locations', async () => {
    expect(
      dataloader._normalizeLocations([
        { location: 'PRG' },
        { location: 'BRQ' },
      ]),
    ).toEqual(['PRG', 'BRQ']);
  });

  test('only radius locations', async () => {
    expect(
      dataloader._normalizeLocations([
        {
          radius: {
            lat: 10.2,
            lng: 14.9,
            radius: 105,
          },
        },
        {
          radius: {
            lat: 10.2572,
            lng: 14.988,
            radius: 105.56,
          },
        },
      ]),
    ).toEqual(['10.2-14.9-105km', '10.26-14.99-106km']);
  });

  test('exact and radius locations', async () => {
    expect(
      dataloader._normalizeLocations([
        {
          radius: {
            lat: 10.2,
            lng: 14.9,
            radius: 105,
          },
        },
        { location: 'PRG' },
        {
          radius: {
            lat: 10.2572,
            lng: 14.988,
            radius: 105.56,
          },
        },
        { location: 'BRQ' },
      ]),
    ).toEqual(['10.2-14.9-105km', 'PRG', '10.26-14.99-106km', 'BRQ']);
  });
});
